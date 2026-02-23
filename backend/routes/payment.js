const express = require('express');
const router = express.Router();
const Cashfree = require('../config/cashfree');
const db = require('../config/db');

// Helper to get socket.io from app context
const emitUpdate = (req, event, data) => {
    const io = req.app.get('socketio');
    if (io) io.emit(event, data);
};

// Helper to process a successful donation
const processSuccessfulDonation = async (req, order_id, cf_payment_id) => {
    const client = await db.pool.connect();
    try {
        await client.query('BEGIN');

        const checkRes = await client.query(
            'SELECT status, amount, donor_name, city, is_anonymous FROM donations WHERE order_id = $1 FOR UPDATE',
            [order_id]
        );

        if (checkRes.rows.length > 0 && checkRes.rows[0].status !== 'success') {
            const donation = checkRes.rows[0];

            await client.query(
                'UPDATE donations SET status = $1, payment_id = $2, verified_at = NOW() WHERE order_id = $3',
                ['success', cf_payment_id, order_id]
            );

            const isWebsitePurchase = donation.amount === 10000;
            const statsRes = await client.query(
                `UPDATE stats SET 
                    total_raised = total_raised + $1, 
                    total_donors = total_donors + 1, 
                    websites_sold = websites_sold + $2,
                    last_updated = NOW() 
                WHERE id = 1 RETURNING *`,
                [donation.amount, isWebsitePurchase ? 1 : 0]
            );

            await client.query('COMMIT');

            emitUpdate(req, 'new_donation', {
                donor_name: donation.is_anonymous ? 'Anonymous' : donation.donor_name,
                amount: donation.amount,
                city: donation.city,
                created_at: new Date()
            });

            emitUpdate(req, 'stats_update', statsRes.rows[0]);
            return true;
        }
        await client.query('ROLLBACK');
        return false;
    } catch (error) {
        if (client) await client.query('ROLLBACK');
        console.error("Donation processing error:", error);
        throw error;
    } finally {
        client.release();
    }
};

// Create Order
router.post('/create-order', async (req, res) => {
    try {
        const { amount, donorInfo } = req.body;
        if (amount < 1) return res.status(400).json({ error: "Invalid amount" });

        const order_id = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        const request = {
            order_amount: amount,
            order_currency: "INR",
            order_id: order_id,
            customer_details: {
                customer_id: `CUST_${Date.now()}`,
                customer_name: donorInfo.name || "Anonymous",
                customer_email: donorInfo.email,
                customer_phone: donorInfo.phone || "9999999999"
            }
        };

        // Cashfree PRODUCTION mode requires return_url and notify_url to be HTTPS.
        // If testing on localhost (HTTP), we omit them from order creation
        // to prevent "order_meta.return_url_invalid" error.
        const frontendUrl = process.env.FRONTEND_URL || '';
        const backendUrl = process.env.BACKEND_URL || '';

        if (frontendUrl.startsWith('https://') || backendUrl.startsWith('https://')) {
            request.order_meta = {};
            if (frontendUrl.startsWith('https://')) {
                request.order_meta.return_url = `${frontendUrl}/thank-you?order_id=${order_id}`;
            }
            if (backendUrl.startsWith('https://')) {
                request.order_meta.notify_url = `${backendUrl}/api/payments/webhook`;
            }
        }

        const response = await Cashfree.PGCreateOrder(request);
        console.log("=== CASHFREE DEBUG ===");
        console.log("Full response keys:", Object.keys(response));
        console.log("response.data:", JSON.stringify(response.data, null, 2));
        console.log("payment_session_id:", response.data?.payment_session_id);
        console.log("=== END DEBUG ===");

        await db.query(
            'INSERT INTO donations (order_id, donor_name, email, phone, city, amount, is_anonymous, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [order_id, donorInfo.name, donorInfo.email, donorInfo.phone, donorInfo.city, amount, donorInfo.isAnonymous || false, 'pending']
        );

        res.json(response.data);
    } catch (error) {
        console.error("Cashfree Order Error Details:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to initialize payment", details: error.response ? error.response.data : error.message });
    }
});

// ===== DEBUG: Test Cashfree order creation (open in browser) =====
router.get('/test-order', async (req, res) => {
    try {
        const order_id = `TEST_${Date.now()}`;
        const request = {
            order_amount: 1,
            order_currency: "INR",
            order_id: order_id,
            customer_details: {
                customer_id: "TEST_CUST_1",
                customer_name: "Test User",
                customer_email: "test@example.com",
                customer_phone: "9999999999"
            }
        };

        const response = await Cashfree.PGCreateOrder(request);
        res.json({
            success: true,
            has_payment_session_id: !!response.data?.payment_session_id,
            payment_session_id_preview: response.data?.payment_session_id?.substring(0, 30) + '...',
            order_id: response.data?.order_id,
            order_status: response.data?.order_status,
            full_response_keys: Object.keys(response.data || {}),
            full_response: response.data
        });
    } catch (error) {
        res.json({
            success: false,
            error: error.message,
            cashfree_error: error.response?.data || null,
            status_code: error.response?.status || null
        });
    }
});

// Manual Verification Fallback
router.get('/verify/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const response = await Cashfree.PGFetchOrder(orderId);
        const orderData = response.data;

        if (orderData.order_status === "PAID") {
            const paymentsResponse = await Cashfree.PGOrderFetchPayments(orderId);
            const successPayment = paymentsResponse.data.find(p => p.payment_status === "SUCCESS");

            if (successPayment) {
                await processSuccessfulDonation(req, orderId, successPayment.cf_payment_id);
                return res.json({ status: "PAID", message: "Order verified and updated" });
            }
        }

        res.json({ status: orderData.order_status });
    } catch (error) {
        console.error("Manual Verify Error:", error.message);
        res.status(500).json({ error: "Verification failed" });
    }
});

// Webhook for Cashfree
router.post('/webhook', async (req, res) => {
    try {
        const signature = req.headers["x-webhook-signature"];
        const timestamp = req.headers["x-webhook-timestamp"];
        const rawBody = JSON.stringify(req.body);

        const event = Cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);

        if (event && event.type === "PAYMENT_SUCCESS_WEBHOOK") {
            const { order, payment } = event.data;
            await processSuccessfulDonation(req, order.order_id, payment.cf_payment_id);
        }
        res.status(200).send("OK");
    } catch (error) {
        console.error("Webhook Error:", error.message);
        res.status(500).send("Internal Error");
    }
});

module.exports = router;

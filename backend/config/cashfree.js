const https = require('https');

const IS_PROD = process.env.NODE_ENV === 'production';
const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const API_HOST = IS_PROD ? 'api.cashfree.com' : 'sandbox.cashfree.com';
const API_VERSION = '2023-08-01';

console.log(`Cashfree Initialized: ${IS_PROD ? 'PRODUCTION' : 'SANDBOX'} (${API_HOST})`);

// Direct HTTPS helper — bypasses the SDK entirely
function cashfreeRequest(method, path, body) {
    return new Promise((resolve, reject) => {
        const bodyStr = body ? JSON.stringify(body) : null;

        const options = {
            hostname: API_HOST,
            port: 443,
            path: path,
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'x-client-id': APP_ID,
                'x-client-secret': SECRET_KEY,
                'x-api-version': API_VERSION,
            }
        };

        if (bodyStr) {
            options.headers['Content-Length'] = Buffer.byteLength(bodyStr);
        }

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(data);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        resolve({ data: parsed, status: res.statusCode });
                    } else {
                        const err = new Error(parsed.message || 'Cashfree API error');
                        err.response = { data: parsed, status: res.statusCode };
                        reject(err);
                    }
                } catch (e) {
                    reject(new Error(`Invalid JSON from Cashfree: ${data.substring(0, 200)}`));
                }
            });
        });

        req.on('error', reject);
        if (bodyStr) req.write(bodyStr);
        req.end();
    });
}

// Mimic the SDK interface
module.exports = {
    PGCreateOrder: (orderRequest) => cashfreeRequest('POST', '/pg/orders', orderRequest),
    PGFetchOrder: (orderId) => cashfreeRequest('GET', `/pg/orders/${orderId}`),
    PGOrderFetchPayments: (orderId) => cashfreeRequest('GET', `/pg/orders/${orderId}/payments`),
    PGVerifyWebhookSignature: (signature, rawBody, timestamp) => {
        // For webhook verification, we'll use the SDK if needed, or skip for now
        // This is a simplified version — webhook verification should use HMAC
        const crypto = require('crypto');
        const expectedSignature = crypto
            .createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
            .update(timestamp + rawBody)
            .digest('base64');
        if (signature !== expectedSignature) {
            throw new Error('Invalid webhook signature');
        }
        return JSON.parse(rawBody);
    }
};

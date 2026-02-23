// Direct Cashfree API test — bypasses the SDK entirely
require('dotenv').config();
const https = require('https');

const APP_ID = process.env.CASHFREE_APP_ID;
const SECRET = process.env.CASHFREE_SECRET_KEY;
const IS_PROD = process.env.NODE_ENV === 'production';

const hostname = IS_PROD ? 'api.cashfree.com' : 'sandbox.cashfree.com';
const order_id = `TEST_${Date.now()}`;

console.log(`\n=== Cashfree Direct API Test ===`);
console.log(`Environment: ${IS_PROD ? 'PRODUCTION' : 'SANDBOX'}`);
console.log(`Hostname: ${hostname}`);
console.log(`APP_ID: ${APP_ID}`);
console.log(`SECRET: ${SECRET ? SECRET.substring(0, 15) + '...' : 'MISSING'}`);
console.log(`Order ID: ${order_id}\n`);

const body = JSON.stringify({
    order_amount: 1,
    order_currency: "INR",
    order_id: order_id,
    customer_details: {
        customer_id: "TEST_CUST_1",
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "9999999999"
    }
});

const options = {
    hostname: hostname,
    port: 443,
    path: '/pg/orders',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-client-id': APP_ID,
        'x-client-secret': SECRET,
        'x-api-version': '2023-08-01',
        'Content-Length': Buffer.byteLength(body)
    }
};

const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        try {
            const parsed = JSON.parse(data);
            console.log(`Response:`, JSON.stringify(parsed, null, 2));
            console.log(`\n=== KEY FIELDS ===`);
            console.log(`payment_session_id: ${parsed.payment_session_id || 'MISSING!'}`);
            console.log(`order_status: ${parsed.order_status}`);
            console.log(`cf_order_id: ${parsed.cf_order_id}`);
        } catch (e) {
            console.log('Raw response:', data);
        }
    });
});

req.on('error', (e) => {
    console.error('Request failed:', e.message);
});

req.write(body);
req.end();

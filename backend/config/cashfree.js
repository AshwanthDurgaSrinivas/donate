const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashfree = new Cashfree(
    process.env.NODE_ENV === "production" ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);

// Optional: Set API version if needed, though default is 2025-01-01
cashfree.XApiVersion = "2023-08-01";

module.exports = cashfree;

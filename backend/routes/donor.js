const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Public Feed
router.get('/feed', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT donor_name, city, amount, created_at, is_anonymous FROM donations WHERE status = $1 ORDER BY created_at DESC LIMIT 50',
            ['success']
        );

        const sanitized = result.rows.map(d => ({
            ...d,
            donor_name: d.is_anonymous ? "Anonymous" : d.donor_name
        }));

        res.json(sanitized);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Live Stats (Calculated from real DB records for 100% accuracy)
router.get('/stats', async (req, res) => {
    try {
        const result = await db.query(`
            SELECT 
                COALESCE(SUM(amount), 0) as total_raised,
                COUNT(id) as total_donors,
                (SELECT target_amount FROM stats WHERE id = 1) as target_amount,
                (SELECT websites_sold FROM stats WHERE id = 1) as websites_sold
            FROM donations 
            WHERE status = 'success'
        `);

        const stats = result.rows[0];
        // Ensure we always have a target amount (default 16Cr)
        if (!stats.target_amount) stats.target_amount = 160000000;

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Daily Donation Chart Data (Guaranteed to be from DB)
router.get('/daily-stats', async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;
        const interval = `${days - 1} days`;

        const result = await db.query(`
            WITH days AS (
                SELECT generate_series(
                    CURRENT_DATE - INTERVAL '${interval}',
                    CURRENT_DATE,
                    '1 day'::interval
                )::date AS day_date
            )
            SELECT 
                TO_CHAR(d.day_date, 'DD Mon') as day,
                COALESCE(SUM(dn.amount), 0) as total
            FROM days d
            LEFT JOIN donations dn ON DATE(dn.created_at) = d.day_date AND dn.status = 'success'
            GROUP BY d.day_date
            ORDER BY d.day_date ASC
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Public Reports for Transparency Hub
router.get('/reports', async (req, res) => {
    try {
        const result = await db.query('SELECT title, file_url, created_at FROM reports ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit Website Development Lead
router.post('/website-lead', async (req, res) => {
    try {
        const { name, mobile, email, message } = req.body;
        if (!name || !mobile || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        await db.query(
            'INSERT INTO website_leads (name, mobile, email, message) VALUES ($1, $2, $3, $4)',
            [name, mobile, email, message]
        );
        res.json({ message: "Lead submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `REPORT_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Middleware
const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Auth required' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

// Admin login
router.post('/login', (req, res) => {
    const { password } = req.body;
    if (password === (process.env.ADMIN_PASSWORD || 'punarvika_admin_2024')) {
        const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Stats dashboard data
router.get('/dashboard-stats', auth, async (req, res) => {
    try {
        const statsRes = await db.query(`
            SELECT 
                COALESCE(SUM(amount), 0) as total_raised,
                COUNT(id) as total_donors,
                (SELECT target_amount FROM stats WHERE id = 1) as target_amount,
                (SELECT websites_sold FROM stats WHERE id = 1) as websites_sold
            FROM donations 
            WHERE status = 'success'
        `);
        const donationsRes = await db.query(
            'SELECT * FROM donations ORDER BY created_at DESC LIMIT 20'
        );
        const reportsRes = await db.query(
            'SELECT * FROM reports ORDER BY created_at DESC'
        );
        const leadsRes = await db.query('SELECT * FROM website_leads ORDER BY created_at DESC');
        res.json({
            stats: statsRes.rows[0],
            recent: donationsRes.rows,
            reports: reportsRes.rows,
            leads: leadsRes.rows
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

// Mark Lead as Completed
router.patch('/leads/:id/complete', auth, async (req, res) => {
    try {
        const { id } = req.params;

        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // 1. Update Lead status
            const leadUpdate = await client.query(
                "UPDATE website_leads SET status = 'completed' WHERE id = $1 AND status != 'completed' RETURNING id",
                [id]
            );

            if (leadUpdate.rows.length > 0) {
                // 2. Increment websites_sold in stats
                await client.query("UPDATE stats SET websites_sold = websites_sold + 1 WHERE id = 1");

                await client.query('COMMIT');

                // Emit stats update
                const io = req.app.get('socketio');
                if (io) {
                    const finalStats = await db.query(`
                        SELECT 
                            COALESCE(SUM(amount), 0) as total_raised,
                            COUNT(id) as total_donors,
                            (SELECT target_amount FROM stats WHERE id = 1) as target_amount,
                            (SELECT websites_sold FROM stats WHERE id = 1) as websites_sold
                        FROM donations 
                        WHERE status = 'success'
                    `);
                    io.emit('stats_update', finalStats.rows[0]);
                }

                res.json({ message: "Lead marked as completed" });
            } else {
                await client.query('ROLLBACK');
                res.status(400).json({ error: "Lead already completed or not found" });
            }
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Report Upload (Admin)
// ... remains as is ...

// Upload Report
router.post('/upload-report', auth, upload.single('report'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const { title } = req.body;
        const fileUrl = `/uploads/${req.file.filename}`;

        const result = await db.query(
            'INSERT INTO reports (title, file_url) VALUES ($1, $2) RETURNING *',
            [title || req.file.originalname, fileUrl]
        );

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ error: "Upload failed" });
    }
});

// Delete Report
router.delete('/reports/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const findRes = await db.query('SELECT file_url FROM reports WHERE id = $1', [id]);

        if (findRes.rows.length > 0) {
            const filePath = path.join(__dirname, '..', findRes.rows[0].file_url);
            if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

            await db.query('DELETE FROM reports WHERE id = $1', [id]);
            res.json({ message: "Deleted successfully" });
        } else {
            res.status(404).json({ error: "Report not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
});

module.exports = router;

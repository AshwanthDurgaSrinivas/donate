const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Get all successful donations
router.get('/public-feed', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('donations')
            .select('id, donor_name, city, amount, created_at, package_id')
            .eq('status', 'success')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get overall stats
router.get('/stats', async (req, res) => {
    try {
        const { data: donations, error } = await supabase
            .from('donations')
            .select('amount')
            .eq('status', 'success');

        if (error) throw error;

        const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
        const websitesSold = donations.filter(d => d.package_id !== 'NONE').length;

        res.json({
            total_raised: totalRaised,
            websites_sold: websitesSold,
            target_amount: 160000000, // 16 Crore
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

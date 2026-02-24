import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LiveDashboard from '../components/LiveDashboard';
import ProgressStats from '../components/ProgressStats';
import { useRealtimeStats } from '../hooks/useRealtimeStats';
import axios from 'axios';

const Dashboard = () => {
    const stats = useRealtimeStats();
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [range, setRange] = useState(7); // Default to 7 days

    const fetchDailyStats = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/donors/daily-stats?days=${range}`);
            setDailyData(res.data);
        } catch (error) {
            console.error("Error fetching daily stats:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDailyStats();
        // Refresh chart every 5 minutes
        const interval = setInterval(fetchDailyStats, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [range]);

    const chartData = dailyData;
    const maxVal = Math.max(...chartData.map(d => Number(d.total)), 1);

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Public Transparency Dashboard</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium">
                        Real-time tracking of every donation received toward Aryansh's Zolgensma fund.
                        Our community's progress is updated instantly.
                    </p>
                </div>

                <ProgressStats
                    totalRaised={Number(stats.total_raised)}
                    target={Number(stats.target_amount)}
                    websitesSold={Number(stats.websites_sold || 0)}
                />

                <div className="mt-12 glass-strong p-8 md:p-12 rounded-[2.5rem] border border-white/10 overflow-hidden relative">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="stars opacity-30" />
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                        <div>
                            <div className="badge mb-3">Analytics</div>
                            <h3 className="text-3xl font-black text-white tracking-tight">Donation <span className="gradient-text">Momentum</span></h3>
                            <p className="text-white/50 font-medium">Tracking community impact over time</p>
                        </div>
                        <div className="flex items-center glass p-1.5 rounded-2xl border border-white/10">
                            {[7, 15, 30].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRange(r)}
                                    className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all uppercase tracking-widest ${range === r ? 'bg-primary text-white shadow-lg glow-blue' : 'text-white/40 hover:text-white/60'
                                        }`}
                                >
                                    {r} Days
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-80 flex items-end justify-between px-4 md:px-10 border-b border-white/5 pb-6">
                        {chartData.map((d, i) => {
                            // Give more weight to non-zero values so they are visible even if small
                            const rawHeight = (Number(d.total) / maxVal) * 100;
                            const displayHeight = Number(d.total) > 0 ? Math.max(rawHeight, 15) : 5;

                            return (
                                <div key={i} className="flex flex-col items-center space-y-6 group w-full px-2">
                                    <div className="relative w-full flex justify-center items-end h-full">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${displayHeight}%` }}
                                            transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                                            className={`w-full max-w-[44px] transition-all duration-500 rounded-t-2xl relative group-hover:scale-x-110 ${Number(d.total) > 0
                                                ? 'bg-gradient-to-t from-primary/20 via-primary/40 to-primary border-t-2 border-primary glow-blue shadow-[0_0_20px_rgba(211,47,47,0.2)]'
                                                : 'bg-white/5 border-t border-white/10'
                                                }`}
                                        >
                                            <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-[11px] font-black py-2.5 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-2xl z-20 border border-white/20">
                                                ₹{Number(d.total).toLocaleString()}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-white"></div>
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-widest truncate w-full text-center group-hover:text-white/60 transition-colors">{d.day}</span>
                                </div>
                            );
                        })}
                    </div>
                    {dailyData.length === 0 && (
                        <p className="text-center text-xs font-black text-white/20 mt-8 tracking-widest uppercase italic">Awaiting more community contributions...</p>
                    )}
                </div>

                <div className="mt-12">
                    <LiveDashboard />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import LiveDashboard from '../components/LiveDashboard';
import ProgressStats from '../components/ProgressStats';
import { useRealtimeStats } from '../hooks/useRealtimeStats';
import axios from 'axios';

const Dashboard = () => {
    const stats = useRealtimeStats();
    const [dailyData, setDailyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDailyStats = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/donors/daily-stats`);
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
    }, []);

    const chartData = dailyData;
    const maxVal = Math.max(...chartData.map(d => Number(d.total)), 1);

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Public Transparency Dashboard</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto font-medium">
                        Real-time tracking of every donation received toward Punarvika's Zolgensma fund.
                        Our community's progress is updated instantly.
                    </p>
                </div>

                <ProgressStats
                    totalRaised={Number(stats.total_raised)}
                    target={Number(stats.target_amount)}
                    websitesSold={Number(stats.websites_sold || 0)}
                />

                <div className="mt-12 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Donation Momentum</h3>
                            <p className="text-gray-500 font-medium">Last 7 days performance</p>
                        </div>
                        <div className="flex items-center space-x-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                            <span className="flex items-center"><div className="w-3 h-3 bg-primary rounded-full mr-2"></div> Success</span>
                        </div>
                    </div>

                    <div className="h-80 flex items-end justify-between px-4 md:px-10 border-b border-gray-50 pb-4">
                        {chartData.map((d, i) => {
                            const height = (Number(d.total) / maxVal) * 100;
                            return (
                                <div key={i} className="flex flex-col items-center space-y-4 group w-full px-2">
                                    <div className="relative w-full flex justify-center">
                                        <div
                                            className="w-full max-w-[40px] bg-primary/10 group-hover:bg-primary transition-all duration-500 rounded-t-xl relative border-t-2 border-primary"
                                            style={{ height: `${Math.max(height, 5)}%`, minHeight: '10px' }}
                                        >
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-black py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-xl z-20">
                                                ₹{Number(d.total).toLocaleString()}
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter truncate w-full text-center">{d.day}</span>
                                </div>
                            );
                        })}
                    </div>
                    {dailyData.length === 0 && (
                        <p className="text-center text-[10px] text-gray-400 mt-4 italic">Showing sample data until more donations arrive.</p>
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

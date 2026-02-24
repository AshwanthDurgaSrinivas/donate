import React from 'react';
import { motion } from 'framer-motion';

const ProgressStats = ({ totalRaised = 4500000, target = 16000000, websitesSold = 45 }) => {
    const percentage = (totalRaised / target) * 100;

    return (
        <section className="page-bg relative py-12">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-indigo absolute w-64 h-64 top-0 right-0 opacity-10" />
                <div className="noise-overlay" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                    <div className="glass p-6 rounded-2xl shadow-sm border border-white/5">
                        <h3 className="text-white/60 text-xs font-black uppercase tracking-widest">Total Raised</h3>
                        <p className="text-4xl font-black text-primary mt-2">₹{(totalRaised / 10000000).toFixed(2)} Cr</p>
                    </div>
                    <div className="glass p-6 rounded-2xl shadow-sm border border-white/5">
                        <h3 className="text-white/60 text-xs font-black uppercase tracking-widest">Websites Sold</h3>
                        <p className="text-4xl font-black text-white mt-2">{websitesSold} <span className="text-xl text-white/30">/ 500</span></p>
                    </div>
                    <div className="glass p-6 rounded-2xl shadow-sm border border-white/5">
                        <h3 className="text-white/60 text-xs font-black uppercase tracking-widest">Remaining</h3>
                        <p className="text-4xl font-black text-accent mt-2">₹{((target - totalRaised) / 10000000).toFixed(2)} Cr</p>
                    </div>
                </div>

                <div className="glass-strong p-8 rounded-3xl border border-white/10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Fundraising Progress</p>
                            <h2 className="text-2xl font-black text-white">₹{totalRaised.toLocaleString()} raised of ₹{target.toLocaleString()}</h2>
                        </div>
                        <p className="text-primary font-black text-2xl tracking-tighter">{percentage.toFixed(1)}%</p>
                    </div>

                    <div className="progress-track h-4 rounded-xl">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="progress-fill"
                        />
                    </div>

                    <div className="mt-4 flex justify-between text-[11px] text-white/40 font-black uppercase tracking-widest">
                        <span>Started: Jan 2026</span>
                        <span>Target: ₹1,60,00,000</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgressStats;

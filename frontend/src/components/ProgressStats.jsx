import React from 'react';
import { motion } from 'framer-motion';

const ProgressStats = ({ totalRaised = 4500000, target = 16000000, websitesSold = 45 }) => {
    const percentage = (totalRaised / target) * 100;
    // when the fundraiser has just begun the raw value is extremely small;
    // toFixed(1) will render 0.0 which confused users. compute a display
    // string that shows "<0.1" instead of a misleading 0.0, and make sure
    // the bar still gets a tiny minimum width so you can see progress.
    const displayPct = percentage > 0 && percentage < 0.1 ? '<0.1' : percentage.toFixed(2);
    // clamp width so the fill div isn't entirely hidden when percentage is
    // non‑zero but very small
    const barWidth = percentage > 0 && percentage < 0.1 ? '0.1%' : `${percentage}%`;

    return (
        <section className="page-bg relative py-12">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-indigo absolute w-64 h-64 top-0 right-0 opacity-10" />
                <div className="noise-overlay" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                    {/* <div className="glass p-6 rounded-2xl shadow-sm border border-white/5">
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
                    </div> */}
                </div>

                <div className="glass-strong p-8 rounded-3xl border border-white/10">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-1">Fundraising Progress</p>
                            <h2 className="text-2xl font-black text-white">₹{totalRaised.toLocaleString('en-IN')} raised of ₹{target.toLocaleString('en-IN')}</h2>
                        </div>
                        <p className="text-primary font-black text-2xl tracking-tighter">{displayPct}%</p>
                    </div>

                    <div className="progress-track h-4 rounded-xl">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: barWidth }}
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

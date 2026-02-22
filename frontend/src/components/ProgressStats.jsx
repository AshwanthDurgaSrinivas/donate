import React from 'react';
import { motion } from 'framer-motion';

const ProgressStats = ({ totalRaised = 4500000, target = 160000000, websitesSold = 45 }) => {
    const percentage = (totalRaised / target) * 100;

    return (
        <section className="bg-primary-light/30 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 text-center">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Raised</h3>
                        <p className="text-4xl font-bold text-primary mt-2">₹{(totalRaised / 10000000).toFixed(2)} Cr</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Websites Sold</h3>
                        <p className="text-4xl font-bold text-gray-800 mt-2">{websitesSold} <span className="text-xl text-gray-400">/ 500</span></p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
                        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Remaining</h3>
                        <p className="text-4xl font-bold text-accent mt-2">₹{((target - totalRaised) / 10000000).toFixed(2)} Cr</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-lg border border-blue-100">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-gray-600 font-medium">Fundraising Progress</p>
                            <h2 className="text-2xl font-bold text-gray-800">₹{totalRaised.toLocaleString()} raised of ₹{target.toLocaleString()}</h2>
                        </div>
                        <p className="text-primary font-bold text-xl">{percentage.toFixed(1)}%</p>
                    </div>

                    <div className="w-full bg-gray-100 h-6 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-primary h-full rounded-full relative"
                        >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </motion.div>
                    </div>

                    <div className="mt-4 flex justify-between text-sm text-gray-500 font-medium">
                        <span>Started: Jan 2026</span>
                        <span>Target: ₹16,00,00,000</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgressStats;

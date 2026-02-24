import React from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.png';

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
            <div className="section-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="z-10"
                    >
                        <span className="inline-block px-4 py-1 rounded-full bg-primary-light text-primary-dark font-semibold text-sm mb-6 uppercase tracking-wider">
                            Project: 500 Websites for Life
                        </span>
                        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            Help Save <span className="text-primary italic">Aryansh</span>
                            <br />From SMA Type 1
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            We are building 500 premium business websites for ₹10,000 each.
                            100% of your payment goes directly to the treatment of Aryansh,
                            who needs a ₹1.6 Crore life-saving medicine.
                        </p>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="btn-primary flex items-center justify-center">
                                Get a Website for ₹10,000
                            </button>
                            <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary-light transition-all">
                                Learn Her Story
                            </button>
                        </div>

                        <div className="mt-10 flex items-center space-x-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-medium">
                                Joined by <span className="text-gray-900 font-bold">45+</span> business donors this month
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-60"></div>
                        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
                            <img
                                src={heroImg}
                                alt="Aryansh"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Animated card overlay */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-blue-50 max-w-[200px]"
                        >
                            <div className="flex items-center space-x-2 text-primary mb-2">
                                <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                <span className="text-xs font-bold uppercase">Live Donation</span>
                            </div>
                            <p className="text-sm font-medium text-gray-700">Abhishek from Mumbai donated ₹10,000</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;

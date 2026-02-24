import React from 'react';
import { motion } from 'framer-motion';
const smaImg = new URL('../assets/sma.png', import.meta.url).href;
const babyImg = new URL('../assets/aryansh-1.jpeg', import.meta.url).href;

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };
const fadeRight = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } };

const StoryAndSMA = () => {
    return (
        <div className="page-bg">
            {/* SMA Explanation */}
            <section className="section-container relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="orb orb-blue absolute w-96 h-96 -top-32 -right-32 opacity-15" />
                    <div className="noise-overlay" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* SMA Image */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeLeft} className="relative group">
                        <div className="absolute -inset-3 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-60 transition-all duration-700"
                            style={{ background: 'radial-gradient(ellipse, rgba(211,47,47,0.3) 0%, transparent 70%)' }} />
                        <motion.img
                            src={smaImg}
                            alt="Zolgensma SMA Gene Therapy"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.4 }}
                            className="relative rounded-[2.5rem] shadow-card border border-white/10 w-full"
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
                        <motion.span variants={fadeUp} className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">The Disease</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl font-black text-white mb-6 leading-tight">
                            What is <span className="gradient-text">SMA Type 1?</span>
                        </motion.h2>
                        <motion.div variants={fadeUp} className="space-y-4 text-white/55 leading-relaxed text-lg">
                            <p>Spinal Muscular Atrophy (SMA) Type 1 is a rare, fatal genetic disease that destroys motor nerve cells. Babies with SMA <strong className="text-white/80">cannot sit, crawl, or swallow</strong> as their muscles waste away.</p>
                            <p>Without treatment, <strong className="text-white/80">most children do not survive beyond age 2</strong>. It is a race against time.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }}
                            className="glass glass-hover border border-primary/20 p-6 rounded-2xl mt-8">
                            <div className="flex items-center space-x-2 mb-3">
                                <span className="text-xl">💊</span>
                                <h4 className="font-black text-white">The Only Cure: Zolgensma</h4>
                            </div>
                            <p className="text-white/55 text-base">A one-time gene replacement therapy — the <strong className="text-white/80">world's most expensive medicine</strong> at approx <strong className="gradient-text text-lg">₹16 Crore</strong> ($2.1 million).</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Divider */}
            <div className="divider mx-8" />

            {/* Journey */}
            <section className="section-container relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="orb orb-indigo absolute w-80 h-80 -bottom-20 -left-20 opacity-15" />
                </div>
                <div className="text-center mb-16 relative z-10">
                    <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-[10px] font-black uppercase tracking-widest text-accent block mb-3">Our Story</motion.span>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl font-black text-white">Aryansh's <span className="gradient-text-warm">Journey</span></motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* Polaroid card */}
                    <motion.div
                        initial={{ opacity: 0, rotate: -4, y: 40 }}
                        whileInView={{ opacity: 1, rotate: -2, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ rotate: 0, scale: 1.03 }}
                        className="glass-strong border border-white/10 p-4 pb-12 rounded-2xl shadow-card mx-auto max-w-xs cursor-pointer relative"
                    >
                        <img src={babyImg} alt="Aryansh" className="w-full rounded-xl object-cover aspect-square" />
                        <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-bold text-white/60 italic">Our little star 🌟</p>
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-white/20 shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #d32f2f, #ff1744)' }} />
                    </motion.div>

                    {/* Story quotes */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="space-y-6">
                        <motion.blockquote variants={fadeRight}
                            className="relative text-lg text-white/60 leading-relaxed italic border-l-4 border-primary/60 pl-6">
                            <span className="absolute -left-1 -top-2 text-primary/20 text-6xl font-serif leading-none">"</span>
                            Aryansh was born as a ray of light. At 4 months, we noticed he wasn't moving his legs. After multiple tests, our world shattered — SMA Type 1.
                        </motion.blockquote>
                        <motion.blockquote variants={fadeRight}
                            className="relative text-lg text-white/60 leading-relaxed italic border-l-4 border-accent/60 pl-6">
                            As middle-class parents, ₹16 Crore is a number we can't even dream of. But we <strong className="not-italic text-white/80">can't give up</strong>. Every contribution brings us closer.
                        </motion.blockquote>
                        <motion.a variants={fadeRight}
                            href="#donate-box"
                            onClick={(e) => { e.preventDefault(); document.getElementById('donate-box')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="inline-flex items-center space-x-2 text-primary font-bold hover:text-primary-light transition cursor-pointer group">
                            <span>Join the Mission</span>
                            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default StoryAndSMA;

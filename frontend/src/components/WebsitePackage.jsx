import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Globe, Zap, Code, Smartphone, TrendingUp, Send, User, Phone, Mail, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useSound } from '../hooks/useSound';
import { fireConfetti } from './ConfettiEffect';

const features = [
    { icon: Smartphone, label: '5-Page Responsive Website' },
    { icon: Globe, label: 'Custom Domain & Hosting' },
    { icon: Code, label: 'Modern Premium Design' },
    { icon: TrendingUp, label: 'Basic SEO Optimization' },
    { icon: Zap, label: '1 Year Free Maintenance' },
    { icon: Check, label: '100% Proceeds to SMA Treatment' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const WebsitePackage = () => {
    const [formData, setFormData] = useState({ name: '', mobile: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const { playSuccess, playClick } = useSound();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/donors/website-lead`, formData);
            if (res.status === 200) {
                setSubmitted(true);
                playSuccess();
                fireConfetti('lead');
                setFormData({ name: '', mobile: '', email: '', message: '' });
            }
        } catch (err) {
            console.error(err);
            alert('Submission failed. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="how-it-works" className="page-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-cyan absolute w-[500px] h-[500px] top-0 right-0 opacity-10" />
                <div className="orb orb-blue absolute w-96 h-96 bottom-0 left-0 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="section-container relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="badge mb-4 inline-flex">500 Websites Initiative</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mt-3 leading-tight">
                        Book a Website.<br /><span className="gradient-text-warm">Save a Life.</span>
                    </h2>
                    <p className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
                        Get a <span className="text-white/70 font-semibold">premium 5-page business website</span> for just ₹10,000.
                        100% of proceeds go directly to Aryansh's Zolgensma treatment.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Package card */}
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="relative group">
                        <div className="absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700"
                            style={{ background: 'linear-gradient(135deg, rgba(239,83,80,0.4), rgba(211,47,47,0.3))' }} />
                        <div className="relative glass-strong border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                            <div className="flex items-end space-x-2 mb-8">
                                <span className="text-5xl font-black text-white">₹10,000</span>
                                <span className="text-white/30 font-medium mb-1">/ website</span>
                            </div>
                            <div className="divider mb-7" />
                            <div className="grid grid-cols-1 gap-4 mb-8">
                                {features.map((f, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                        transition={{ delay: i * 0.08 }}
                                        className="flex items-center space-x-3 group/item">
                                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/item:scale-110"
                                            style={{ background: 'linear-gradient(135deg, rgba(239,83,80,0.2), rgba(211,47,47,0.2))', border: '1px solid rgba(239,83,80,0.2)' }}>
                                            <f.icon className="w-4 h-4 text-accent-cyan" />
                                        </div>
                                        <span className="text-white/70 font-medium">{f.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="glass-dark border border-accent-cyan/20 rounded-2xl p-5 text-center">
                                <p className="text-accent-cyan font-black text-sm uppercase tracking-widest mb-1">💡 Impact</p>
                                <p className="text-white/60 text-sm">Selling 500 websites = ₹50 Lakh towards the ₹16 Crore goal</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact form */}
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="relative group">
                        <div className="absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-700"
                            style={{ background: 'linear-gradient(135deg, rgba(211,47,47,0.4), rgba(239,83,80,0.3))' }} />
                        <div className="relative glass-strong border border-white/10 rounded-[2.5rem] p-8 md:p-10">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                        <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
                                            style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>✓</motion.div>
                                        <h3 className="text-2xl font-black text-white">Request Received! 🎉</h3>
                                        <p className="text-white/50">Our team will contact you within 24 hours to discuss your website requirements.</p>
                                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => setSubmitted(false)} className="btn-ghost text-sm px-5 py-2">Submit Another</motion.button>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
                                        <h3 className="text-xl font-black text-white mb-6">Book Your Website</h3>
                                        {[
                                            { icon: User, placeholder: 'Full Name', key: 'name', type: 'text' },
                                            { icon: Phone, placeholder: 'Mobile Number', key: 'mobile', type: 'tel' },
                                            { icon: Mail, placeholder: 'Email Address', key: 'email', type: 'email' },
                                        ].map(f => (
                                            <div key={f.key} className="relative">
                                                <f.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                                <input type={f.type} required placeholder={f.placeholder}
                                                    className="input-glass pl-10"
                                                    value={formData[f.key]}
                                                    onChange={e => setFormData({ ...formData, [f.key]: e.target.value })} />
                                            </div>
                                        ))}
                                        <div className="relative">
                                            <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-white/25" />
                                            <textarea placeholder="Tell us about your business..." rows={3}
                                                className="input-glass pl-10 resize-none"
                                                value={formData.message}
                                                onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                        </div>
                                        <motion.button type="submit" disabled={submitting}
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(34,211,238,0.4)' }}
                                            whileTap={{ scale: 0.97 }}
                                            className="w-full py-4 rounded-2xl font-black text-white text-lg flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
                                            style={{ background: 'linear-gradient(135deg, #ef5350, #d32f2f)', boxShadow: '0 8px 30px rgba(239,83,80,0.25)' }}>
                                            {submitting
                                                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                : <><Send className="w-5 h-5" /><span>Book Now — Save a Life</span></>
                                            }
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WebsitePackage;

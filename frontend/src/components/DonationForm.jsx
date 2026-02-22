import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ShieldCheck, Heart, User, Mail } from 'lucide-react';
import donorImg from '../assets/images (5).jpeg';
import { useSound } from '../hooks/useSound';
import { fireConfetti } from './ConfettiEffect';

const PRESETS = [1, 10, 100, 1000, 5000, 10000];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const DonationForm = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '', amount: '', isAnonymous: false });
    const { playClick, playDonate } = useSound();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const amt = parseFloat(formData.amount);
        if (!amt || amt < 1) { alert('Please enter a valid amount (min ₹1)'); return; }
        setLoading(true);
        playDonate();
        fireConfetti('donate');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
                amount: amt,
                donorInfo: { name: formData.name, email: formData.email, phone: formData.phone, city: formData.city, isAnonymous: formData.isAnonymous }
            });
            const cashfree = window.Cashfree({ mode: import.meta.env.VITE_CASHFREE_MODE || 'sandbox' });
            cashfree.checkout({
                paymentSessionId: res.data.payment_session_id,
                returnUrl: `${window.location.origin}/thank-you?order_id=${res.data.order_id}`,
            });
        } catch (err) {
            console.error(err);
            alert('Error initializing payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="donate-box" className="page-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-blue absolute w-[500px] h-[500px] -top-32 -left-32 opacity-12" />
                <div className="orb orb-indigo absolute w-96 h-96 -bottom-24 -right-24 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left — info + image */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="space-y-7">
                        <motion.span variants={fadeUp} className="badge">Make a Difference</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl font-black text-white leading-tight">
                            Your Contribution<br />Can <span className="gradient-text">Save Punarvika</span>
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-white/50 text-lg leading-relaxed">
                            Each rupee counts towards the ₹16 Crore Zolgensma treatment. When thousands come together, impossible becomes possible.
                        </motion.p>
                        <motion.ul variants={fadeUp} className="space-y-3">
                            {['Minimum donation as low as ₹1', '100% Secure via Cashfree', 'Instant email donation receipt', 'Real-time financial transparency'].map((item, i) => (
                                <motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.2 }}
                                    className="flex items-center space-x-3 text-white/60 font-medium">
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                                        style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>✓</div>
                                    <span>{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="relative rounded-[2rem] overflow-hidden shadow-card border border-white/10 max-w-xs">
                            <img src={donorImg} alt="Donate for Punarvika" className="w-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <p className="text-white font-black text-lg">Save Punarvika 💙</p>
                                <p className="text-white/60 text-xs">Every rupee brings her closer to life</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative group">
                        <div className="absolute -inset-1 rounded-[2.5rem] blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-700"
                            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(99,102,241,0.3))' }} />
                        <div className="relative glass-strong border border-white/10 p-8 md:p-10 rounded-[2.5rem]">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                            <input type="text" required={!formData.isAnonymous} placeholder="Full Name"
                                                className="input-glass pl-10" value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="col-span-2 md:col-span-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                            <input type="email" required placeholder="email@example.com"
                                                className="input-glass pl-10" value={formData.email}
                                                onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2.5">
                                    <input type="checkbox" id="anon" className="w-4 h-4 accent-primary rounded" checked={formData.isAnonymous}
                                        onChange={e => setFormData({ ...formData, isAnonymous: e.target.checked })} />
                                    <label htmlFor="anon" className="text-sm text-white/50 cursor-pointer font-medium">Donate Anonymously</label>
                                </div>

                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-3">Select Amount</label>
                                    <div className="grid grid-cols-3 gap-2.5 mb-4">
                                        {PRESETS.map(p => (
                                            <motion.button key={p} type="button"
                                                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                                                onClick={() => { playClick(); setFormData({ ...formData, amount: p.toString() }); }}
                                                className={`py-2.5 rounded-xl text-sm font-bold transition-all border ${formData.amount === p.toString()
                                                        ? 'border-primary bg-primary/20 text-primary glow-blue'
                                                        : 'glass border-white/08 text-white/50 hover:border-primary/40 hover:text-white/80'
                                                    }`}>
                                                ₹{p >= 1000 ? `${p / 1000}K` : p}
                                            </motion.button>
                                        ))}
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-white/30 text-lg">₹</span>
                                        <input type="number" required min="1" placeholder="Custom Amount"
                                            className="input-glass pl-10 text-2xl font-black" value={formData.amount}
                                            onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                                    </div>
                                </div>

                                <motion.button type="submit" disabled={loading}
                                    whileHover={{ scale: 1.03, boxShadow: '0 0 50px rgba(59,130,246,0.6)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-primary w-full py-5 text-xl disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading
                                        ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        : <><motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>❤️</motion.span><span className="ml-2">DONATE NOW</span></>
                                    }
                                </motion.button>

                                <div className="flex items-center justify-center space-x-2 text-white/25">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Secured by Cashfree Payments</span>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DonationForm;

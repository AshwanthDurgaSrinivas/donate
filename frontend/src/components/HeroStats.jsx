import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ShieldCheck, Heart, User, Mail, Crown } from 'lucide-react';
import { useRealtimeStats } from '../hooks/useRealtimeStats';
import { useSound } from '../hooks/useSound';
import { fireConfetti } from './ConfettiEffect';


const PRESETS = [100, 500, 1000, 5000, 10000, 50000];

const AnimatedCounter = ({ value, prefix = '' }) => {
    const [display, setDisplay] = useState(0);
    useEffect(() => {
        const end = parseInt(value) || 0;
        let start = 0;
        const steps = 60;
        const inc = end / steps;
        let count = 0;
        const t = setInterval(() => {
            count++;
            start = Math.min(start + inc, end);
            setDisplay(Math.floor(start));
            if (count >= steps) clearInterval(t);
        }, 18);
        return () => clearInterval(t);
    }, [value]);
    return <>{prefix}{display.toLocaleString('en-IN')}</>;
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };
const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

const HeroStats = () => {
    const stats = useRealtimeStats();
    const { playClick, playDonate } = useSound();
    const pct = Math.min((stats.total_raised / stats.target_amount) * 100, 100);

    // Donation form state
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [anon, setAnon] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDonate = async (e) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        if (!amt || amt < 1) { alert('Please enter a valid amount (min ₹1)'); return; }
        setLoading(true);
        playDonate();
        fireConfetti('donate');
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/payments/create-order`, {
                amount: amt,
                donorInfo: { name: anon ? 'Anonymous' : name, email, isAnonymous: anon }
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
        <section className="relative min-h-screen page-bg flex items-start overflow-hidden pt-16">
            {/* Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="stars" />
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 10, repeat: Infinity }}
                    className="orb orb-blue absolute w-[600px] h-[600px] -top-48 -left-48 opacity-25" />
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 13, repeat: Infinity, delay: 3 }}
                    className="orb orb-indigo absolute w-[400px] h-[400px] -bottom-24 -right-24 opacity-20" />
                <div className="noise-overlay" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16 items-start">

                    {/* ── LEFT — Hero copy ─────────────────────── */}
                    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
                        <motion.div variants={fadeUp}>
                            <span className="badge">
                                <span className="live-dot" />
                                <span>Live Fundraiser — Save Punarvika</span>
                            </span>
                        </motion.div>

                        <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.07] tracking-tight">
                            Every{' '}
                            <span className="gradient-text">Rupee</span>
                            {' '}Counts.<br />
                            Every{' '}
                            <span className="gradient-text-warm">Heart</span>
                            {' '}Matters.
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-base sm:text-lg text-white/50 leading-relaxed max-w-lg">
                            Punarvika is fighting SMA Type 1. Help us reach the{' '}
                            <span className="text-primary font-bold">₹16 Crore</span> Zolgensma goal.
                            Donations start from just <span className="text-emerald-400 font-bold">₹1</span>.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                            {[
                                { label: 'Raised', value: <><span className="text-primary">₹</span><AnimatedCounter value={stats.total_raised} /></>, color: 'text-white' },
                                { label: 'Donors', value: <AnimatedCounter value={stats.total_donors} />, color: 'text-accent' },
                                { label: 'Target', value: '₹16 Cr', color: 'text-accent-cyan' },
                            ].map((s, i) => (
                                <motion.div key={i} whileHover={{ y: -3 }} className="glass glass-hover rounded-2xl px-4 py-3 text-center min-w-[110px]">
                                    <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-0.5">{s.label}</p>
                                    <p className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.value}</p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Progress */}
                        <motion.div variants={fadeUp} className="glass rounded-2xl p-4 max-w-lg">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">Progress to Goal</span>
                                <span className="text-primary text-xs font-black">{pct.toFixed(2)}%</span>
                            </div>
                            <div className="progress-track">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 2.5, ease: 'easeOut', delay: 0.5 }} className="progress-fill" />
                            </div>
                        </motion.div>

                    </motion.div>

                    {/* ── RIGHT — Compact Donate Form ───────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        id="donate-box"
                        className="relative group w-full"
                    >
                        {/* Glow halo */}
                        <div className="absolute -inset-2 rounded-[2.5rem] blur-3xl opacity-20 group-hover:opacity-35 transition-all duration-700 pointer-events-none"
                            style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(99,102,241,0.4))' }} />

                        <div className="relative glass-strong border border-white/10 rounded-[2.5rem] p-6 sm:p-8">
                            {/* Card header */}
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                                    <Heart className="w-5 h-5 text-white" fill="currentColor" />
                                </div>
                                <div>
                                    <h2 className="font-black text-white text-lg leading-tight">Donate Now</h2>
                                    <p className="text-white/35 text-xs">100% goes to Punarvika's treatment</p>
                                </div>
                            </div>

                            <form onSubmit={handleDonate} className="space-y-4">
                                {/* Preset amounts */}
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Quick Select</p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {PRESETS.map(p => (
                                            <motion.button key={p} type="button"
                                                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.93 }}
                                                onClick={() => { playClick(); setAmount(p.toString()); }}
                                                className={`py-2.5 rounded-xl text-sm font-bold border transition-all ${amount === p.toString()
                                                    ? 'border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                                                    : 'glass border-white/08 text-white/50 hover:border-primary/40 hover:text-white/80'
                                                    }`}>
                                                ₹{p >= 1000 ? `${p / 1000}K` : p}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom amount */}
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-white/30 text-xl pointer-events-none">₹</span>
                                    <input type="number" min="1" required placeholder="Enter amount"
                                        className="input-glass pl-10 text-xl font-black h-14"
                                        value={amount} onChange={e => setAmount(e.target.value)} />
                                </div>

                                {/* Anonymous toggle */}
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="hero-anon" checked={anon} onChange={e => setAnon(e.target.checked)}
                                        className="w-4 h-4 accent-primary rounded" />
                                    <label htmlFor="hero-anon" className="text-sm text-white/45 cursor-pointer font-medium">Donate Anonymously</label>
                                </div>

                                {/* Name + Email (hidden if anon) */}
                                <AnimatePresence>
                                    {!anon && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }} className="overflow-hidden space-y-3">
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                                <input type="text" placeholder="Your Name" required={!anon}
                                                    className="input-glass pl-10" value={name} onChange={e => setName(e.target.value)} />
                                            </div>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                                                <input type="email" placeholder="Email (for receipt)" required={!anon}
                                                    className="input-glass pl-10" value={email} onChange={e => setEmail(e.target.value)} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Submit */}
                                <motion.button type="submit" disabled={loading}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 50px rgba(59,130,246,0.6)' }}
                                    whileTap={{ scale: 0.97 }}
                                    className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                                    {loading
                                        ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        : <>
                                            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>❤️</motion.span>
                                            <span className="ml-2">DONATE {amount ? `₹${Number(amount).toLocaleString()}` : 'NOW'}</span>
                                        </>
                                    }
                                </motion.button>

                                {/* Trust line */}
                                <div className="flex items-center justify-center space-x-2 text-white/25">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Secured by Cashfree · 100% Transparent</span>
                                </div>
                            </form>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default HeroStats;

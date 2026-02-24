import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Crown, Gem, Medal, Star, Heart, Leaf,
    TrendingUp, Users, Clock, IndianRupee, ArrowUpRight
} from 'lucide-react';
import io from 'socket.io-client';
import axios from 'axios';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// Tier system — Lucide icons only, no emojis
const getTier = (amount) => {
    if (amount >= 100000) return {
        label: 'LEGENDARY', Icon: Crown,
        gradient: 'from-yellow-400 via-amber-400 to-orange-500',
        glow: 'rgba(251,191,36,0.35)',
        ring: 'border-yellow-400/40',
        badge: 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
        amount_color: 'text-yellow-300',
    };
    if (amount >= 10000) return {
        label: 'DIAMOND', Icon: Gem,
        gradient: 'from-orange-400 via-red-400 to-red-500',
        glow: 'rgba(34,211,238,0.35)',
        ring: 'border-cyan-400/40',
        badge: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/30',
        amount_color: 'text-cyan-300',
    };
    if (amount >= 5000) return {
        label: 'GOLD', Icon: Medal,
        gradient: 'from-orange-400 via-amber-400 to-yellow-500',
        glow: 'rgba(251,146,60,0.35)',
        ring: 'border-orange-400/40',
        badge: 'bg-orange-400/15 text-orange-300 border-orange-400/30',
        amount_color: 'text-orange-300',
    };
    if (amount >= 1000) return {
        label: 'SILVER', Icon: Star,
        gradient: 'from-slate-300 via-gray-300 to-slate-400',
        glow: 'rgba(148,163,184,0.3)',
        ring: 'border-slate-300/40',
        badge: 'bg-slate-400/15 text-slate-300 border-slate-300/30',
        amount_color: 'text-slate-300',
    };
    if (amount >= 100) return {
        label: 'SUPPORTER', Icon: Heart,
        gradient: 'from-red-400 via-rose-400 to-pink-500',
        glow: 'rgba(99,102,241,0.35)',
        ring: 'border-rose-400/40',
        badge: 'bg-rose-400/15 text-rose-300 border-rose-400/30',
        amount_color: 'text-rose-300',
    };
    return {
        label: 'BACKER', Icon: Leaf,
        gradient: 'from-emerald-400 via-green-400 to-teal-500',
        glow: 'rgba(52,211,153,0.3)',
        ring: 'border-emerald-400/40',
        badge: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
        amount_color: 'text-emerald-300',
    };
};

const DonationCard = ({ donation, isNew }) => {
    const tier = getTier(Number(donation.amount));
    const { Icon } = tier;
    const name = donation.is_anonymous ? 'Anonymous Donor' : (donation.donor_name || 'Donor');
    const initials = name.slice(0, 2).toUpperCase();
    const time = new Date(donation.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <motion.div
            layout
            initial={isNew ? { opacity: 0, y: -40, scale: 0.9 } : { opacity: 1, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className={`relative glass border ${tier.ring} rounded-2xl overflow-hidden flex-shrink-0 group cursor-default`}
            style={{
                boxShadow: isNew ? `0 0 30px ${tier.glow}, 0 4px 20px rgba(0,0,0,0.4)` : '0 4px 20px rgba(0,0,0,0.3)',
            }}
        >
            {/* Top gradient stripe */}
            <div className={`h-1 w-full bg-gradient-to-r ${tier.gradient}`} />

            <div className="p-4 flex items-center space-x-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white text-sm bg-gradient-to-br ${tier.gradient} shadow-lg`}>
                        {initials}
                    </div>
                    <motion.div
                        animate={isNew ? { scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 0.5 }}
                        className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center bg-navy-900 border ${tier.ring}`}
                    >
                        <Icon className="w-2.5 h-2.5" style={{ color: tier.amount_color.replace('text-', '').replace('-300', '') === 'yellow' ? '#fde047' : undefined }} />
                    </motion.div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                    <p className="font-black text-white text-sm truncate">{name}</p>
                    <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${tier.badge}`}>
                        <Icon className="w-2.5 h-2.5" />
                        <span>{tier.label}</span>
                    </span>
                </div>

                {/* Amount + time */}
                <div className="text-right flex-shrink-0">
                    <motion.p
                        initial={isNew ? { scale: 1.4 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className={`font-black text-lg ${tier.amount_color}`}
                    >
                        ₹{Number(donation.amount).toLocaleString()}
                    </motion.p>
                    <div className="flex items-center justify-end space-x-1 text-white/30 text-[10px]">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{time}</span>
                    </div>
                </div>
            </div>

            {/* Shimmer on new */}
            {isNew && (
                <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/08 to-transparent pointer-events-none"
                />
            )}
        </motion.div>
    );
};

// Tier legend item — icon only
const TierBadge = ({ Icon, label, color }) => (
    <div className={`glass border ${color} flex items-center space-x-1.5 px-3 py-1.5 rounded-xl flex-shrink-0`}>
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{label}</span>
    </div>
);

const LiveDashboard = () => {
    const [donations, setDonations] = useState([]);
    const [newIds, setNewIds] = useState(new Set());
    const scrollRef = useRef(null);
    const isPaused = useRef(false);

    const addDonation = (donation) => {
        setDonations(prev => [{ ...donation, _uid: `${donation.id}_${Date.now()}` }, ...prev].slice(0, 30));
        setNewIds(prev => new Set([...prev, donation.id]));
        setTimeout(() => setNewIds(prev => { const n = new Set(prev); n.delete(donation.id); return n; }), 4000);
    };

    useEffect(() => {
        axios.get(`${SOCKET_URL}/api/donors/feed`)
            .then(res => { if (res.data) setDonations(res.data.slice(0, 30).map(d => ({ ...d, _uid: `${d.id}_init` }))); })
            .catch(console.error);

        const socket = io(SOCKET_URL);
        socket.on('new_donation', addDonation);
        return () => socket.disconnect();
    }, []);

    // Slow auto-scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const id = setInterval(() => {
            if (isPaused.current || !container) return;
            container.scrollTop += 0.5;
            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 2) container.scrollTop = 0;
        }, 24);
        return () => clearInterval(id);
    }, [donations.length]);

    const totalToday = donations.filter(d => new Date(d.created_at).toDateString() === new Date().toDateString()).reduce((s, d) => s + Number(d.amount), 0);

    const tiers = [
        { Icon: Crown, label: '₹1L+', color: 'border-yellow-400/30' },
        { Icon: Gem, label: '₹10K+', color: 'border-cyan-400/30' },
        { Icon: Medal, label: '₹5K+', color: 'border-orange-400/30' },
        { Icon: Star, label: '₹1K+', color: 'border-slate-300/30' },
        { Icon: Heart, label: '₹100+', color: 'border-rose-400/30' },
        { Icon: Leaf, label: '₹1+', color: 'border-emerald-400/30' },
    ];

    return (
        <section className="page-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-blue absolute w-64 h-64 top-0 left-0 opacity-10" />
                <div className="orb orb-indigo absolute w-64 h-64 bottom-0 right-0 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="section-container relative z-10">
                {/* Section header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center space-x-3 mb-2">
                                <span className="live-dot" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Live</span>
                            </div>
                            <h2 className="text-3xl font-black text-white">
                                Live <span className="gradient-text">Donation Feed</span>
                            </h2>
                            <p className="text-white/35 text-sm mt-1">collecting funds by GiggleZen Technologies Pvt. Ltd.</p>
                        </div>

                        {/* Today's total */}
                        <motion.div whileHover={{ scale: 1.03 }} className="glass-strong border border-white/10 rounded-2xl px-6 py-4 text-right">
                            <p className="text-white/35 text-[10px] font-black uppercase tracking-widest mb-1 flex items-center justify-end space-x-1">
                                <TrendingUp className="w-3 h-3" /><span>Today's Total</span>
                            </p>
                            <motion.p key={totalToday} initial={{ scale: 1.2, color: '#4ade80' }} animate={{ scale: 1, color: '#f1f5f9' }}
                                transition={{ duration: 0.4 }} className="text-3xl font-black text-white">
                                <span className="text-primary">₹</span>{totalToday.toLocaleString()}
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Tier legend */}
                    <div className="flex items-center space-x-2 mt-6 overflow-x-auto scrollbar-hide pb-1">
                        <p className="text-white/25 text-[9px] font-black uppercase tracking-widest flex-shrink-0 flex items-center space-x-1">
                            <Users className="w-3 h-3" /><span>Tiers:</span>
                        </p>
                        {tiers.map((t, i) => <TierBadge key={i} {...t} />)}
                    </div>
                </motion.div>

                {/* Feed */}
                <div className="relative">
                    {/* Fade top/bottom */}
                    <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-navy-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-navy-950 to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        onMouseEnter={() => { isPaused.current = true; }}
                        onMouseLeave={() => { isPaused.current = false; }}
                        className="h-[440px] overflow-y-auto scrollbar-hide py-6 space-y-3 px-1"
                    >
                        <AnimatePresence initial={false}>
                            {donations.map(d => (
                                <DonationCard key={d._uid || d.id} donation={d} isNew={newIds.has(d.id)} />
                            ))}
                        </AnimatePresence>

                        {donations.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-64 text-white/20 space-y-3">
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <Leaf className="w-10 h-10 text-emerald-400/30" />
                                </motion.div>
                                <p className="text-xs font-bold uppercase tracking-widest">Waiting for donations...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer bar */}
                <div className="divider mt-6 mb-4" />
                <div className="flex items-center justify-between text-white/25 text-[10px] font-bold uppercase tracking-widest">
                    <span className="flex items-center space-x-1"><IndianRupee className="w-3 h-3" /><span>{donations.length} donations shown</span></span>
                    <span className="flex items-center space-x-1"><ArrowUpRight className="w-3 h-3" /><span>Hover to pause scroll</span></span>
                </div>
            </div>
        </section>
    );
};

export default LiveDashboard;

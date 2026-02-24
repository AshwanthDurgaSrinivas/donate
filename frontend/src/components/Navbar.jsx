import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, BarChart2 } from 'lucide-react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setMenuOpen(false), [location]);

    const links = [
        { to: '/', label: 'Home' },
        { to: '/dashboard', label: 'Live Dashboard' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || location.pathname !== '/' ? 'glass-dark border-b border-white/10 shadow-xl py-0' : 'bg-transparent py-2'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-3 group">
                            <motion.div
                                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                                style={{ background: 'linear-gradient(135deg, #d32f2f, #ff1744)', boxShadow: '0 8px 20px rgba(211, 47, 47, 0.4)' }}
                            >
                                <Heart className="w-5 h-5 text-white" fill="currentColor" />
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="font-black text-xl text-white tracking-tighter leading-tight">aryansh</span>
                                <span className="text-[10px] text-white/50 font-semibold tracking-tight leading-none">by GiggleZen Technologies</span>
                            </div>
                        </Link>

                        {/* Desktop links */}
                        <div className="hidden md:flex items-center space-x-1">
                            {links.map((link) => (
                                <Link key={link.to} to={link.to}>
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 block ${location.pathname === link.to
                                            ? 'glass text-white shadow-lg'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {link.label}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:flex items-center space-x-3">
                            <motion.a
                                href="/#donate-box"
                                onClick={(e) => { e.preventDefault(); document.getElementById('donate-box')?.scrollIntoView({ behavior: 'smooth' }); }}
                                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59,130,246,0.5)' }}
                                whileTap={{ scale: 0.96 }}
                                className="btn-primary text-sm px-5 py-2.5 cursor-pointer"
                            >
                                <Heart className="w-4 h-4 mr-2" fill="currentColor" />
                                Donate Now
                            </motion.a>
                        </div>

                        {/* Mobile hamburger */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden glass w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        >
                            <AnimatePresence mode="wait">
                                {menuOpen
                                    ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
                                    : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu className="w-5 h-5" /></motion.div>
                                }
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-16 left-4 right-4 z-40 glass-strong rounded-2xl p-4 space-y-2 border border-white/10"
                    >
                        {links.map(link => (
                            <Link key={link.to} to={link.to} className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === link.to ? 'glass text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
                                {link.label}
                            </Link>
                        ))}
                        <a href="/#donate-box" onClick={(e) => { e.preventDefault(); setMenuOpen(false); document.getElementById('donate-box')?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="btn-primary w-full text-center text-sm">
                            💙 Donate Now
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

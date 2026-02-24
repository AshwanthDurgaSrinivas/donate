import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, ExternalLink, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const links = {
        'Campaign': [
            { label: 'Home', href: '/' },
            { label: 'Live Dashboard', href: '/dashboard' },
            { label: 'Get a Website', href: '/#how-it-works' },
            { label: 'Donate Now', href: '/#donate-box' },
        ],
        'About': [
            { label: 'About GiggleZen', href: '/#about' },
            { label: "Aryansh's Story", href: '/#story' },
            { label: 'SMA Disease', href: '/#sma' },
            { label: 'FAQ', href: '/#faq' },
        ],
    };

    return (
        <footer className="page-bg border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="stars opacity-50" />
                <div className="orb orb-blue absolute w-64 h-64 -bottom-20 left-1/2 opacity-10" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#d32f2f,#ff1744)' }}>
                                <Heart className="w-5 h-5 text-white" fill="currentColor" />
                            </div>
                            <div>
                                <span className="font-black text-xl text-white">aryansh</span>
                                <span className="font-black text-xl text-primary">.in</span>
                            </div>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                            A community initiative by GiggleZen Technologies Pvt. Ltd. to raise funds for Aryansh's life-saving Zolgensma treatment through technology and collective kindness.
                        </p>
                        <div className="flex items-center space-x-3">
                            {[{ icon: Twitter }, { icon: Linkedin }, { icon: Instagram }].map((s, i) => (
                                <motion.div key={i} whileHover={{ scale: 1.15, y: -2 }} className="glass glass-hover w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer text-white/40 hover:text-white transition-colors">
                                    <s.icon className="w-4 h-4" />
                                </motion.div>
                            ))}
                        </div>
                        {/* Contact */}
                        <div className="space-y-3 text-sm text-white/40">
                            <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-primary flex-shrink-0" /><span>2nd Floor, 100 Feet Road, Madhapur, Hyderabad 500081</span></div>
                            <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-primary flex-shrink-0" /><a href="tel:+917842238773" className="hover:text-white transition">+91-7842238773</a></div>
                            <div className="flex items-center space-x-2"><Mail className="w-4 h-4 text-primary flex-shrink-0" /><a href="mailto:support@aryansh.in" className="hover:text-white transition">support@aryansh.in</a></div>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(links).map(([title, items]) => (
                        <div key={title}>
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-5">{title}</h4>
                            <ul className="space-y-3">
                                {items.map((item, i) => (
                                    <li key={i}>
                                        <a href={item.href} className="text-sm text-white/50 hover:text-primary transition-colors font-medium block">{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Ticker */}
                <div className="divider mb-8" />
                <div className="overflow-hidden mb-8">
                    <div className="flex" style={{ animation: 'ticker 30s linear infinite', width: '200%' }}>
                        {[...Array(8)].map((_, i) => (
                            <span key={i} className="text-white/10 text-xs font-black uppercase tracking-widest mr-8 flex-shrink-0">
                                💙 Save Aryansh &nbsp;•&nbsp; ₹1.6 Crore Goal &nbsp;•&nbsp; 500 Websites Initiative &nbsp;•&nbsp; GiggleZen Technologies &nbsp;•&nbsp;
                            </span>
                        ))}
                    </div>
                </div>
                <div className="divider mb-8" />

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
                    <p>© 2025 Project 500 Websites for Life · GiggleZen Technologies Pvt. Ltd. All rights reserved.</p>
                    <div className="flex space-x-6">
                        {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(l => (
                            <a key={l} href="#" className="hover:text-white/50 transition">{l}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, ShieldCheck, Star, MapPin, Phone, Globe, Instagram, ExternalLink, Code2, Megaphone, Headphones, BarChart3, Palette, Cpu } from 'lucide-react';

const revealVariant = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
};

const directors = [
    { name: 'Cheedalla Gowtham', title: 'Director', initials: 'CG', gradient: 'from-blue-500 to-indigo-600' },
    { name: 'Kothala Mukesh', title: 'Director', initials: 'KM', gradient: 'from-violet-500 to-purple-700' },
    { name: 'Sukla Bhargav', title: 'Director', initials: 'SB', gradient: 'from-cyan-500 to-blue-600' },
];

const values = [
    { icon: Lightbulb, title: 'Innovation', desc: 'We embrace new ideas and transform challenges into opportunities.' },
    { icon: Users, title: 'Collaboration', desc: 'We believe success thrives on teamwork, empathy, and mutual growth.' },
    { icon: ShieldCheck, title: 'Integrity', desc: 'We uphold transparency and ethics in every partnership.' },
    { icon: Star, title: 'Excellence', desc: 'We continuously strive to exceed expectations with measurable impact.' },
];

const process = [
    { step: '01', title: 'Discovery & Strategy', desc: 'We dive deep into your business goals, challenges, and target audience to create a solid digital roadmap.' },
    { step: '02', title: 'Design & Experience', desc: 'Our UI/UX experts craft interfaces that are not just beautiful but meaningful — bridging user needs with brand identity.' },
    { step: '03', title: 'Development & Automation', desc: 'We bring ideas to life through scalable code, API integrations, and robust QA practices.' },
    { step: '04', title: 'Launch & Growth', desc: 'From deployment to digital marketing — we ensure your product thrives, performs, and grows sustainably.' },
];

const GiggleZen = () => {
    return (
        <section className="page-bg overflow-hidden">

            {/* Hero Banner */}
            <div className="relative py-28 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="stars" />
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }} transition={{ duration: 10, repeat: Infinity }} className="orb orb-blue absolute w-[500px] h-[500px] top-[-100px] left-[-100px]" />
                    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className="orb orb-indigo absolute w-[400px] h-[400px] bottom-[-80px] right-[-80px]" />
                    <div className="noise-overlay" />
                </div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <span className="badge mb-6 inline-flex">About GiggleZen</span>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
                        className="w-24 h-24 mx-auto mb-8 glass-strong rounded-3xl flex items-center justify-center shadow-card border border-white/10"
                    >
                        <span className="text-3xl font-black gradient-text tracking-tighter">GZ</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7 }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                        GiggleZen <span className="gradient-text">Technologies</span>
                    </motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }}
                        className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
                        We are a Gen Z–driven company led by passionate young professionals redefining Software, BPO, and Digital Marketing solutions. With innovation and creativity at our core, we empower businesses to grow through technology, strategy, and fresh ideas.
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="mt-3 text-white/25 font-medium text-sm">Enterprise IT, BPO &amp; Digital Marketing • Global Delivery</motion.p>
                </div>
            </div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div variants={revealVariant}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 block">Our Story</span>
                        <h3 className="text-4xl font-black text-white mb-6 leading-tight">Built by <span className="gradient-text">Passion</span>, Driven by <span className="gradient-text">Purpose</span></h3>
                        <p className="text-white/50 text-lg leading-relaxed mb-5">
                            Founded with a vision to simplify digital transformation, GiggleZen began as a passionate team of engineers, strategists, and creatives. Today, we operate globally, helping startups scale faster and enterprises transform smarter.
                        </p>
                        <p className="text-white/50 text-lg leading-relaxed">
                            Our approach blends technology, design, and performance marketing into one seamless process, ensuring measurable results for every client.
                        </p>
                    </motion.div>
                    <motion.div variants={revealVariant} className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'Years of Innovation', value: '3+' },
                            { label: 'Global Clients', value: '50+' },
                            { label: 'Projects Delivered', value: '120+' },
                            { label: 'Team Members', value: '25+' },
                        ].map((stat, i) => (
                            <motion.div key={i} whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(59,130,246,0.15)' }} className="glass glass-hover rounded-2xl p-6 text-center border border-white/08">
                                <p className="text-4xl font-black text-primary mb-1">{stat.value}</p>
                                <p className="text-sm text-white/40 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Board of Directors */}
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="text-center mb-12">
                        <motion.span variants={revealVariant} className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 block">Leadership</motion.span>
                        <motion.h3 variants={revealVariant} className="text-4xl font-black text-white leading-tight">Board of <span className="gradient-text">Directors</span></motion.h3>
                        <motion.p variants={revealVariant} className="text-white/35 mt-3 max-w-md mx-auto">The visionaries driving GiggleZen's mission of innovation and excellence.</motion.p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {directors.map((d, i) => (
                            <motion.div key={i} variants={revealVariant} whileHover={{ y: -8, boxShadow: '0 30px 60px rgba(59,130,246,0.2)' }} className="glass-strong border border-white/10 rounded-[2rem] p-8 text-center">
                                <div className={`w-20 h-20 mx-auto rounded-[1.25rem] bg-gradient-to-br ${d.gradient} flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg`}>
                                    {d.initials}
                                </div>
                                <h4 className="font-black text-white text-lg">{d.name}</h4>
                                <p className="text-primary font-semibold text-sm mt-1">{d.title}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-12">
                    <motion.span variants={revealVariant} className="text-[10px] font-black uppercase tracking-widest text-primary mb-3 block">Purpose</motion.span>
                    <motion.h3 variants={revealVariant} className="text-4xl font-black text-white leading-tight">Our Mission <span className="gradient-text">&amp; Vision</span></motion.h3>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { icon: Target, label: 'Our Mission', color: 'bg-blue-500/20 text-blue-400', text: 'To empower businesses through technology, strategy, and execution — delivering measurable impact and long-term growth with innovation at the core.' },
                        { icon: Globe, label: 'Our Vision', color: 'bg-indigo-500/20 text-indigo-400', text: 'To become a globally recognized leader in integrated IT, BPO, and Digital Marketing solutions — redefining excellence through trust, creativity, and technology.' }
                    ].map((item, i) => (
                        <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariant}
                            whileHover={{ scale: 1.02 }}
                            className="glass glass-hover border border-white/08 p-8 rounded-[2rem] flex space-x-6"
                        >
                            <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                                <item.icon className="w-7 h-7" />
                            </div>
                            <div>
                                <h4 className="font-black text-white text-xl mb-3">{item.label}</h4>
                                <p className="text-white/50 leading-relaxed">{item.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Our Process */}
            <div className="bg-gradient-to-b from-white to-slate-950 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-16">
                        <motion.span variants={revealVariant} className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">How We Work</motion.span>
                        <motion.h3 variants={revealVariant} className="text-4xl font-black text-white leading-tight">Our <span className="text-primary italic">Process</span></motion.h3>
                        <motion.p variants={revealVariant} className="text-gray-400 mt-3 max-w-lg mx-auto">Every project follows a refined, transparent process built on strategy, collaboration, and execution excellence.</motion.p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {process.map((p, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.7 }}
                                whileHover={{ y: -6 }}
                                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-[1.5rem] p-7"
                            >
                                <span className="text-5xl font-black text-white/10 mb-4 block">{p.step}</span>
                                <h4 className="font-black text-white mb-3">{p.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
                                {i < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-white/20" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="bg-slate-950 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-16">
                        <motion.span variants={revealVariant} className="text-xs font-black uppercase tracking-widest text-primary mb-3 block">Culture</motion.span>
                        <motion.h3 variants={revealVariant} className="text-4xl font-black text-white">Our Core <span className="text-primary italic">Values</span></motion.h3>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ scale: 1.04 }}
                                className="text-center bg-white/5 border border-white/10 rounded-[1.5rem] p-8"
                            >
                                <div className="w-14 h-14 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-5">
                                    <v.icon className="w-7 h-7" />
                                </div>
                                <h4 className="font-black text-white text-lg mb-3">{v.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Instagram Portfolio */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="badge mb-4 inline-flex"><Instagram className="w-3.5 h-3.5 mr-1.5" />Our Work</span>
                    <h3 className="text-4xl font-black text-white mt-3">Portfolio <span className="gradient-text">&amp; Services</span></h3>
                    <p className="text-white/35 mt-3 max-w-lg mx-auto">A glimpse of what GiggleZen delivers — across web, marketing, BPO and beyond.</p>
                </motion.div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                    {[
                        { Icon: Code2, label: 'Web Development', sub: 'React, Node, Full-Stack', gradient: 'from-blue-500 to-indigo-600' },
                        { Icon: Palette, label: 'UI/UX Design', sub: 'Figma, Glassmorphism, Motion', gradient: 'from-violet-500 to-purple-700' },
                        { Icon: Megaphone, label: 'Digital Marketing', sub: 'SEO, Ads, Social Media', gradient: 'from-pink-500 to-rose-600' },
                        { Icon: Cpu, label: 'IT Solutions', sub: 'Automation, Cloud, DevOps', gradient: 'from-cyan-500 to-blue-600' },
                        { Icon: Headphones, label: 'BPO Services', sub: 'Support, CX, Back-office', gradient: 'from-amber-500 to-orange-600' },
                        { Icon: BarChart3, label: 'Analytics & Growth', sub: 'Data, Reports, Strategy', gradient: 'from-emerald-500 to-teal-600' },
                    ].map((s, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.08, duration: 0.5 }}
                            whileHover={{ scale: 1.05, y: -4 }}
                            className="glass glass-hover border border-white/08 rounded-2xl p-5 text-center group cursor-pointer"
                        >
                            <div className={`w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br ${s.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <s.Icon className="w-5 h-5 text-white" />
                            </div>
                            <p className="font-black text-white text-sm">{s.label}</p>
                            <p className="text-white/35 text-[10px] mt-0.5">{s.sub}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.a
                        href="https://www.instagram.com/giggterrzen/"
                        target="_blank" rel="noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(236,72,153,0.4)' }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl font-bold text-white"
                        style={{ background: 'linear-gradient(135deg,#f97316,#ec4899,#8b5cf6)', boxShadow: '0 8px 30px rgba(236,72,153,0.3)' }}
                    >
                        <Instagram className="w-5 h-5" />
                        <span>Follow @giggterrzen on Instagram</span>
                        <ExternalLink className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                        href="tel:+917842238773"
                        whileHover={{ scale: 1.03 }}
                        className="btn-ghost inline-flex items-center space-x-2"
                    >
                        <Phone className="w-4 h-4" />
                        <span>+91-7842238773</span>
                    </motion.a>
                </motion.div>
            </div>

            {/* Contact Footer Bar */}
            <div className="border-t border-white/05 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <p className="text-xl font-black text-white">GiggleZen <span className="text-blue-400">Technologies</span></p>
                            <p className="text-gray-500 text-sm mt-1">Enterprise IT, BPO &amp; Digital Marketing • Global Delivery</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-2">
                                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                                <span>2nd Floor, 100 Feet Road, Madhapur, Hyderabad, 500081</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                                <a href="tel:+917842238773" className="hover:text-white transition">+91-7842238773</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiggleZen;

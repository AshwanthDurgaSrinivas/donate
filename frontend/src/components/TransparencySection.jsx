import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck, BadgeCheck, Lock, Building2 } from 'lucide-react';

const trustBadges = [
    { icon: ShieldCheck, label: 'Hospital Verified', sub: 'Original documents on file' },
    { icon: BadgeCheck, label: 'Cashfree Secured', sub: '100% payment protection' },
    { icon: Lock, label: 'No Hidden Fees', sub: 'Every rupee to Aryansh' },
    { icon: Building2, label: 'Registered Trust', sub: 'Legally verified entity' },
];

const revealVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const TransparencySection = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donors/reports`);
                if (res.ok) {
                    const data = await res.json();
                    setReports(data);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            }
        };
        fetchReports();
    }, []);

    const handleDownload = (report) => {
        if (!report.file_url) return;
        window.open(`${import.meta.env.VITE_API_URL}${report.file_url}`, '_blank');
    };

    return (
        <section id="transparency" className="py-20 bg-gradient-to-b from-white to-red-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                    className="text-center mb-16"
                >
                    <motion.span variants={revealVariant} className="inline-flex items-center space-x-2 bg-red-100 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Transparency Hub</span>
                    </motion.span>
                    <motion.h2 variants={revealVariant} className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
                        100% Verified.<br />
                        <span className="text-primary italic">Every Rupee Documented.</span>
                    </motion.h2>
                    <motion.p variants={revealVariant} className="text-gray-500 max-w-xl mx-auto text-lg">
                        We publish every hospital invoice, trust document, and bank transfer proof. Trust is not claimed — it is proved.
                    </motion.p>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
                >
                    {trustBadges.map((badge, i) => (
                        <motion.div
                            key={i}
                            variants={revealVariant}
                            whileHover={{ y: -4, boxShadow: '0 20px 50px rgba(59,130,246,0.12)' }}
                            className="bg-white p-6 rounded-[1.5rem] border border-gray-100 shadow-sm text-center flex flex-col items-center space-y-3"
                        >
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <badge.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-black text-gray-900 text-sm">{badge.label}</p>
                                <p className="text-gray-400 text-[11px] mt-0.5">{badge.sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Documents Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={revealVariant}
                    className="bg-gradient-to-br from-red-900 to-rose-950 rounded-[3rem] p-8 lg:p-14 text-white overflow-hidden relative"
                >
                    {/* Decorative orb */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                            <div>
                                <div className="flex items-center space-x-2 text-red-300 mb-3">
                                    <FileText className="w-5 h-5" />
                                    <span className="font-bold text-sm uppercase tracking-widest">Official Documents</span>
                                </div>
                                <h3 className="text-3xl font-black">Hospital Bills & Trust Records</h3>
                                <p className="text-red-200 mt-2 max-w-md">All documents are uploaded by the admin and publicly accessible. Download and verify anytime.</p>
                            </div>
                        </div>

                        {reports.length === 0 ? (
                            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                                <FileText className="w-10 h-10 text-red-300 mx-auto mb-4" />
                                <p className="text-red-200 font-medium">No documents uploaded yet.</p>
                                <p className="text-red-300/60 text-sm mt-1">Hospital bills and trust documents will appear here once uploaded by the admin.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reports.map((report, index) => (
                                    <motion.div
                                        key={report.id || index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.08 }}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.2)' }}
                                        onClick={() => handleDownload(report)}
                                        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 cursor-pointer transition group"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <FileText className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white">{report.title}</h4>
                                                    <p className="text-xs text-red-300 mt-0.5">
                                                        {new Date(report.created_at).toLocaleDateString('en-IN', { month: 'short', day: '2-digit', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </div>
                                            <motion.div whileHover={{ scale: 1.2 }}>
                                                <Download className="w-5 h-5 text-red-300 group-hover:text-white transition" />
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TransparencySection;

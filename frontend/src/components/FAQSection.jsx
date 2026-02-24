import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
    { q: 'Is my donation secure?', a: 'Yes. All payments are processed via Cashfree, a PCI-DSS Level 1 certified payment gateway. Your financial data is never stored on our servers. Every transaction generates a unique receipt.' },
    { q: 'What is SMA Type 1?', a: 'Spinal Muscular Atrophy Type 1 is a rare, fatal genetic disease. It destroys the motor nerve cells in the spinal cord, leaving babies unable to sit, crawl, or swallow. Without treatment, most children do not survive beyond age 2.' },
    { q: 'What is Zolgensma?', a: 'Zolgensma (onasemnogene abeparvovec) is a one-time gene replacement therapy and the only cure for SMA Type 1. It is currently the world\'s most expensive medicine, costing approximately ₹1.6 Crore ($210,000 approx).' },
    { q: 'How does the 500 Websites initiative work?', a: 'We sell professional business websites for ₹10,000 each. Our goal is to sell 500 websites, generating the ₹50 Lakh needed. 100% of these proceeds go directly to Aryansh\'s treatment fund.' },
    { q: 'Can I donate any amount?', a: 'Absolutely! Donations start from just ₹1. Every rupee, no matter how small, is meaningful. If 1.6 crore people donate ₹1 each, we reach the goal. Collective kindness has no bounds.' },
    { q: 'Where does my money go?', a: '100% of all donations go directly to the hospital/trust account for Aryansh\'s Zolgensma treatment. We provide complete financial documentation for every rupee raised, available in our admin-uploaded reports.' },
    { q: 'Can I get a receipt?', a: 'Yes! An instant digital receipt is emailed to you right after your donation is processed. You can also access it from your Cashfree payment confirmation.' },
    { q: 'How can I verify this fundraiser?', a: 'Check the Live Dashboard for real-time donation counts and amounts. Hospital bills, trust registration documents, and bank transfer proofs are published by our admin team. All funds are fully auditable.' },
];

const FAQSection = () => {
    const [open, setOpen] = useState(null);

    return (
        <section id="faq" className="page-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-indigo absolute w-80 h-80 -top-20 -right-20 opacity-15" />
                <div className="orb orb-cyan absolute w-64 h-64 -bottom-20 -left-10 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="section-container relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                    <span className="badge mb-4 inline-flex">Frequently Asked</span>
                    <h2 className="text-4xl font-black text-white mt-3">Got <span className="gradient-text">Questions?</span></h2>
                    <p className="text-white/60 mt-3 max-w-md mx-auto">Everything you need to know about the campaign, donations, and Aryansh's story.</p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                            className={`glass glass-hover border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-primary/30' : ''}`}>
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left group"
                            >
                                <span className={`font-bold text-sm md:text-base transition-colors ${open === i ? 'text-primary' : 'text-white/80 group-hover:text-white'}`}>{faq.q}</span>
                                <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-4 font-black text-lg transition-all ${open === i ? 'bg-primary/20 text-primary' : 'glass text-white/60'}`}>
                                    +
                                </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 text-white/70 text-sm leading-relaxed border-t border-white/5 pt-4">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;

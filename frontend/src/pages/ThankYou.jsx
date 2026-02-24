import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Heart, Share2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { fireConfetti } from '../components/ConfettiEffect';
import { useSound } from '../hooks/useSound';

const ThankYou = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [verifying, setVerifying] = useState(!!orderId);
    const { playDonate } = useSound();

    useEffect(() => {
        if (orderId) {
            const verifyPayment = async () => {
                try {
                    await axios.get(`${import.meta.env.VITE_API_URL}/api/payments/verify/${orderId}`);
                } catch (e) {
                    console.error("Verification failed", e);
                } finally {
                    setVerifying(false);
                }
            };
            verifyPayment();
        }
    }, [orderId]);

    useEffect(() => {
        // Play fanfare + burst confetti after short delay
        const t1 = setTimeout(() => {
            playDonate();
        }, 400);

        const t2 = setTimeout(() => {
            fireConfetti('donate');
        }, 600);

        // Secondary burst
        const t3 = setTimeout(() => {
            fireConfetti('donate');
        }, 2200);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    const handleShare = () => {
        const text = `I just donated to save Aryansh's life! 💙 Join the mission to raise ₹1.6 Crore for Zolgensma treatment. Every rupee counts!`;
        if (navigator.share) {
            navigator.share({ title: 'Save Aryansh', text, url: window.location.origin });
        } else {
            window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + window.location.origin)}`, '_blank');
        }
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white flex items-center justify-center p-4 pt-24 overflow-hidden">
            {/* Background orbs */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-200 rounded-full blur-[120px]" />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-200 rounded-full blur-[100px]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-2xl w-full text-center relative z-10"
            >
                {/* Main success icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
                    className="mb-8 inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-full shadow-2xl shadow-green-300/50"
                >
                    <CheckCircle className="w-14 h-14" />
                </motion.div>

                {/* Floating hearts */}
                {['💙', '❤️', '💚', '💛', '💜'].map((emoji, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 0, x: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [-20, -100 - i * 20],
                            x: [(i - 2) * 40, (i - 2) * 60],
                        }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 2, ease: 'easeOut' }}
                        className="absolute text-3xl pointer-events-none left-1/2"
                        style={{ zIndex: 20 }}
                    >
                        {emoji}
                    </motion.div>
                ))}

                <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight">
                    THANK YOU!
                </motion.h1>

                <motion.p variants={itemVariants} className="text-2xl font-bold text-primary mb-2">
                    Your Heart Just Saved a Life.
                </motion.p>
                <motion.p variants={itemVariants} className="text-gray-400 font-medium mb-12">
                    Aryansh is one step closer to Zolgensma. 💙
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl mb-8"
                >
                    <p className="text-gray-500 font-medium mb-6 leading-relaxed">
                        Your donation has been recorded. A formal receipt has been sent to your email.
                        {orderId && (
                            <> Your Transaction ID: <span className="text-gray-900 font-mono font-bold bg-gray-50 px-3 py-1 rounded-xl border border-gray-200 inline-block mt-2 text-sm">{orderId}</span></>
                        )}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.button
                            onClick={handleShare}
                            whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(59,130,246,0.25)' }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center justify-center space-x-2 bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20"
                        >
                            <Share2 className="w-5 h-5" />
                            <span>Share &amp; Inspire Others</span>
                        </motion.button>
                        <motion.a
                            href={`https://wa.me/?text=${encodeURIComponent('I just supported Aryansh! 💙 Join me: ' + window.location.origin)}`}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="flex items-center justify-center space-x-2 bg-green-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-400/20"
                        >
                            <span>📱</span>
                            <span>Share on WhatsApp</span>
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link to="/">
                        <motion.span
                            whileHover={{ x: -4 }}
                            className="inline-flex items-center space-x-2 text-gray-400 hover:text-primary transition font-semibold"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Return to Homepage</span>
                        </motion.span>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ThankYou;

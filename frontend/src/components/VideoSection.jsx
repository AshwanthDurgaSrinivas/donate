import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const storyVideo = new URL('../assets/AQNamBLV5_jiZE7Zv5Xfdizw8i7t4uS21-nZsZMqRGRWp4fg_p7fwRputUM64PlTH1xYNqhqqygoZT5j-pl42Qgm.mp4', import.meta.url).href;

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const VideoSection = () => {
    return (
        <section className="section-container relative overflow-hidden py-20">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-indigo absolute w-[500px] h-[500px] -top-24 -right-24 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <motion.span
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="badge mb-4"
                    >
                        Witness the Story
                    </motion.span>
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="text-4xl sm:text-5xl font-black text-white leading-tight"
                    >
                        A Life Worth <span className="gradient-text">Fighting</span> For
                    </motion.h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group aspect-video rounded-[2.5rem] overflow-hidden shadow-card border border-white/10 glass-strong"
                >
                    {/* Video wrapper */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10 pointer-events-none" />

                    <video
                        className="w-full h-full object-cover"
                        controls
                        playsInline
                        preload="metadata"
                        poster="/video-poster.jpg" // Placeholder if exists
                    >
                        <source src={storyVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Decorative glow */}
                    <div className="absolute -inset-4 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.5), rgba(99,102,241,0.4))' }} />
                </motion.div>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-10 text-center text-white/50 text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    Every moment in Punarvika's journey is a testament to hope. Watch how
                    your support is changing the course of a life.
                </motion.p>
            </div>
        </section>
    );
};

export default VideoSection;

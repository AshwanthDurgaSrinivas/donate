import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Import images — place your Aryansh images in src/assets/
import img1 from '../assets/aryansh-1.jpeg';
import img2 from '../assets/aryansh-2.jpeg';
import img3 from '../assets/aryansh-3.jpeg';
import img4 from '../assets/aryansh-4.jpeg';
import img5 from '../assets/aryansh-5.jpeg';

const images = [
    { src: img1, caption: 'Baby Aryansh — Our Little Fighter 💪' },
    { src: img2, caption: 'Medical Recommendation — Gene Therapy' },
    { src: img3, caption: 'Aryansh in NICU — Fighting from Day 1' },
    { src: img4, caption: '#SaveAryansh — Fundraiser Campaign' },
    { src: img5, caption: 'OPD Summary — Rainbow Children\'s Hospital' },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
};

const VideoSection = () => {
    const [current, setCurrent] = useState(0);
    const [lightbox, setLightbox] = useState(false);
    const [paused, setPaused] = useState(false);

    const prev = () => setCurrent(c => (c === 0 ? images.length - 1 : c - 1));
    const next = () => setCurrent(c => (c === images.length - 1 ? 0 : c + 1));

    // Auto-scroll every 4 seconds, pause on hover or when lightbox is open
    React.useEffect(() => {
        if (paused || lightbox) return;
        const timer = setInterval(() => {
            setCurrent(c => (c === images.length - 1 ? 0 : c + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [paused, lightbox]);

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
                        Aryansh's Journey
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

                {/* Main Image Carousel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative group"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* Glow behind */}
                    <div className="absolute -inset-4 rounded-[3rem] blur-3xl opacity-15 group-hover:opacity-25 transition-opacity duration-1000 pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(211,47,47,0.5), rgba(239,83,80,0.4))' }} />

                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-card border border-white/10 glass-strong">
                        {/* Image display */}
                        <div
                            className="aspect-[16/10] sm:aspect-video relative cursor-pointer"
                            onClick={() => setLightbox(true)}
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={current}
                                    src={images[current].src}
                                    alt={images[current].caption}
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full object-contain bg-black/80"
                                />
                            </AnimatePresence>
                        </div>

                        {/* Caption bar */}
                        <div className="px-6 py-4 bg-black/60 backdrop-blur-sm">
                            <p className="text-white/70 text-sm font-medium text-center">
                                {images[current].caption}
                            </p>
                        </div>

                        {/* Navigation arrows */}
                        <button
                            onClick={prev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-5">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${i === current
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Thumbnail strip */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-6 flex justify-center gap-3 overflow-x-auto scrollbar-hide px-4"
                >
                    {images.map((img, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrent(i)}
                            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${i === current
                                ? 'border-primary shadow-[0_0_15px_rgba(211,47,47,0.4)] scale-105'
                                : 'border-white/10 opacity-50 hover:opacity-80'
                                }`}
                        >
                            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                        </motion.button>
                    ))}
                </motion.div>

                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="mt-10 text-center text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
                >
                    Every moment in Aryansh's journey is a testament to hope. Your
                    support is changing the course of a life.
                </motion.p>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
                        onClick={() => setLightbox(false)}
                    >
                        <button
                            onClick={() => setLightbox(false)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-50"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-50"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>

                        <motion.img
                            key={`lb-${current}`}
                            src={images[current].src}
                            alt={images[current].caption}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center text-white/70 hover:text-white z-50"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <p className="absolute bottom-8 left-0 right-0 text-center text-white/80 text-sm font-medium">
                            {images[current].caption} — {current + 1}/{images.length}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VideoSection;

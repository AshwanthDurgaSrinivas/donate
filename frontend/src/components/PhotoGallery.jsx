import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Use new URL() to avoid Vite import-analysis issues with freshly created files
const img1 = new URL('../assets/hero.png', import.meta.url).href;
const img2 = new URL('../assets/images (2).jpeg', import.meta.url).href;
const img3 = new URL('../assets/images (3).jpeg', import.meta.url).href;
const img5 = new URL('../assets/images (5).jpeg', import.meta.url).href;
const sma = new URL('../assets/sma.png', import.meta.url).href;

const photos = [
    { src: img1, caption: 'Punarvika — Our Little Warrior', tag: 'The Mission' },
    { src: img2, caption: "#SavePunarvika — A Mother's Hope", tag: 'Family' },
    { src: img3, caption: 'Our Happy Little Star', tag: 'Joy' },
    { src: img5, caption: "A Father's Love — Donate for Punarvika", tag: 'Father & Daughter' },
    { src: sma, caption: 'Zolgensma — The Only Cure for SMA Type 1', tag: 'The Treatment' },
];

const PhotoGallery = () => {
    const [selected, setSelected] = useState(null);

    const close = () => setSelected(null);
    const prev = () => setSelected(s => (s - 1 + photos.length) % photos.length);
    const next = () => setSelected(s => (s + 1) % photos.length);

    return (
        <section className="page-bg relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="orb orb-blue   absolute w-80 h-80 -top-20 -right-20 opacity-10" />
                <div className="orb orb-indigo absolute w-64 h-64 -bottom-16 -left-16 opacity-10" />
                <div className="noise-overlay" />
            </div>

            <div className="section-container relative z-10">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="text-center mb-12">
                    <span className="badge mb-4 inline-flex">
                        <Heart className="w-3.5 h-3.5 mr-1.5" fill="currentColor" />
                        Punarvika's World
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">
                        Every <span className="gradient-text">Moment</span> Worth Fighting For
                    </h2>
                    <p className="text-white/35 mt-3 max-w-lg mx-auto text-sm">
                        Glimpses of a little girl whose zest for life inspires thousands across the world.
                        Click any photo to view full size.
                    </p>
                </motion.div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-[200px] gap-3 md:gap-4">
                    {photos.map((photo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.03, zIndex: 10 }}
                            onClick={() => setSelected(i)}
                            className={[
                                'relative rounded-2xl overflow-hidden cursor-pointer group border border-white/08 shadow-card',
                                i === 0 ? 'col-span-1 row-span-2 sm:col-span-1 sm:row-span-2' : '',
                                i === 4 ? 'col-span-2 sm:col-span-2' : '',
                            ].join(' ')}
                        >
                            <img
                                src={photo.src}
                                alt={photo.caption}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Zoom icon */}
                            <div className="absolute top-2 right-2 w-8 h-8 glass rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                                <ZoomIn className="w-4 h-4 text-white" />
                            </div>

                            {/* Tag pill */}
                            <div className="absolute top-2 left-2 glass px-2 py-0.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="text-[9px] text-white/70 font-black uppercase tracking-widest">{photo.tag}</span>
                            </div>

                            {/* Caption */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white font-bold text-xs sm:text-sm leading-tight">{photo.caption}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selected !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-8"
                        style={{ background: 'rgba(2,8,23,0.96)', backdropFilter: 'blur(24px)' }}
                        onClick={close}
                    >
                        {/* Card */}
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
                            className="relative max-w-3xl w-full glass-strong border border-white/10 rounded-[2rem] overflow-hidden shadow-card"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={photos[selected].src}
                                alt={photos[selected].caption}
                                className="w-full max-h-[70vh] object-contain"
                            />
                            <div className="p-4 sm:p-5 flex items-center justify-between">
                                <div>
                                    <p className="text-white font-black text-sm sm:text-base">{photos[selected].caption}</p>
                                    <p className="text-white/35 text-xs mt-0.5">{selected + 1} of {photos.length}</p>
                                </div>
                                {/* Dot indicators */}
                                <div className="flex space-x-1.5">
                                    {photos.map((_, i) => (
                                        <button key={i} onClick={() => setSelected(i)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${i === selected ? 'w-6 bg-primary' : 'w-1.5 bg-white/20'}`} />
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Close */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={close}
                            className="absolute top-3 right-3 sm:top-5 sm:right-5 glass-strong border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                            <X className="w-5 h-5" />
                        </motion.button>

                        {/* Prev */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={e => { e.stopPropagation(); prev(); }}
                            className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 glass-strong border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>

                        {/* Next */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                            onClick={e => { e.stopPropagation(); next(); }}
                            className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 glass-strong border border-white/10 w-10 h-10 rounded-xl flex items-center justify-center text-white">
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default PhotoGallery;

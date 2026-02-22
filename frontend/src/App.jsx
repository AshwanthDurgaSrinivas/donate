import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import ThankYou from './pages/ThankYou';
import Footer from './components/Footer';

const pageTransition = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
};

function App() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');
    const [loading, setLoading] = useState(false);

    // Top progress bar on route change
    useEffect(() => {
        setLoading(true);
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Route-change progress bar */}
            <AnimatePresence>
                {loading && (
                    <motion.div
                        key="progress"
                        initial={{ scaleX: 0, opacity: 1 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'left' }}
                        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-blue-400 to-indigo-500 z-[999]"
                    />
                )}
            </AnimatePresence>

            {!isAdmin && <Navbar />}
            <main className="flex-grow">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        variants={pageTransition}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/thank-you" element={<ThankYou />} />
                        </Routes>
                    </motion.div>
                </AnimatePresence>
            </main>
            {!isAdmin && <Footer />}
        </div>
    );
}

export default App;

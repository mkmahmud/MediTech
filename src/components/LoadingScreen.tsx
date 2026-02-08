 
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
    const [statusIndex, setStatusIndex] = useState(0);
    const statuses = ["Initializing Secure Link", "Reading Vitals", "Syncing Specialist Data"];

    useEffect(() => {
        const timer = setInterval(() => {
            setStatusIndex((prev) => (prev + 1) % statuses.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#030303] overflow-hidden">
            
            {/* --- Background Clinical Grid --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
            // @ts-ignore
                 style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '40px 40px' }} 
            />

            <div className="relative z-10 flex flex-col items-center">
                
                {/* --- The Vital Monitor Core --- */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                    
                    {/* Pulsing Radar Rings */}
                    {[1, 1.5, 2].map((s, i) => (
                        <motion.div
                            key={i}
                            className="absolute border border-primary/20 rounded-full"
                            style={{ width: '100%', height: '100%' }}
                            animate={{ scale: [1, s], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                        />
                    ))}

                    {/* The EKG Waveform Container */}
                    <div className="relative w-32 h-20 overflow-hidden">
                        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.path
                                d="M0 50 L20 50 L25 30 L35 70 L45 10 L55 90 L65 40 L75 50 L100 50"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="text-primary"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                        
                        {/* Moving Scanline Gradient */}
                        <motion.div 
                            className="absolute inset-0 w-20 h-full bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {/* Data Readout Corner (Top Left) */}
                    <div className="absolute top-0 left-0 text-[10px] font-mono text-primary/60">
                        SYS: 120 <br /> DIA: 80
                    </div>

                    {/* Live BPM (Bottom Right) */}
                    <motion.div 
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        className="absolute bottom-0 right-0 text-right"
                    >
                        <span className="text-[10px] font-mono text-gray-400 block tracking-tighter uppercase">Heart Rate</span>
                        <span className="text-xl font-black text-primary font-mono leading-none">72</span>
                    </motion.div>
                </div>

                {/* --- Bottom Information Layer --- */}
                <div className="mt-12 flex flex-col items-center">
                    <h1 className="text-2xl font-light tracking-[0.3em] text-gray-900 dark:text-white uppercase">
                        Medi<span className="font-black text-primary">.</span>
                    </h1>

                    <div className="h-6 mt-2 overflow-hidden flex flex-col items-center">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={statusIndex}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400"
                            >
                                {statuses[statusIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    {/* Minimalist Micro-Progress Bar */}
                    <div className="mt-6 w-32 h-[1px] bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-primary w-full h-full"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
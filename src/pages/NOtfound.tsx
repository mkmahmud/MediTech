import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-[#030303] overflow-hidden">

            {/* --- Background Clinical Grid (Exact match to your Loader) --- */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative z-10 flex flex-col items-center w-full max-w-5xl px-6">

                {/* --- The Visual Centerpiece: The "Neural Gap" --- */}
                <div className="relative w-full h-40 flex items-center justify-center mb-12">

                    {/* Ghost 404 in the Background */}
                    <span className="absolute text-[12rem] font-black text-gray-50 dark:text-white/[0.02] tracking-tighter select-none">
                        404
                    </span>

                    {/* The Fragmented EKG Wave */}
                    <svg className="absolute w-full h-full text-orange-500/40" viewBox="0 0 400 100">
                        {/* The healthy pulse that breaks into a flatline */}
                        <motion.path
                            d="M0 50 L100 50 L110 20 L130 80 L145 50 L400 50"
                            fill="transparent"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        {/* A "Searching" Pulse Orb */}
                        <motion.circle
                            r="2"
                            fill="currentColor"
                            animate={{ x: [0, 400] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            style={{ cy: 50 }}
                        />
                    </svg>

                    {/* Digital Metadata (Matches your SYS/DIA style) */}
                    <div className="absolute top-0 left-1/2 -translate-x-40 text-[10px] font-mono text-orange-500/60 text-left">
                        STATUS: UNRESOLVED <br />
                        TRACE: FAILED
                    </div>

                    <div className="absolute bottom-0 right-1/2 translate-x-40 text-right">
                        <span className="text-[10px] font-mono text-gray-400 block uppercase">Packet Loss</span>
                        <span className="text-xl font-black text-orange-500 font-mono">100%</span>
                    </div>
                </div>

                {/* --- Typography: Sophisticated & Airy --- */}
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-gray-900 dark:text-white uppercase leading-none">
                            Signal <span className="font-black text-primary">Terminated</span>
                        </h1>
                        <p className="mt-6 text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-gray-400 max-w-md mx-auto">
                            The requested directory is currently offline or non-existent.
                        </p>
                    </motion.div>
                </div>

                {/* --- Premium Action Buttons --- */}
                <div className="mt-16 flex flex-col sm:flex-row gap-6 items-center">
                    <Link
                        to="/"
                        className="group flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all hover:shadow-[0_20px_40px_rgba(var(--primary-rgb),0.3)] active:scale-95"
                    >
                        <Home className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
                        Main Console
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-3 px-10 py-4 bg-transparent border border-gray-100 dark:border-white/10 text-gray-400 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous Station
                    </button>
                </div>

                {/* --- Interactive Status Bar (Matches your Loader's Progress Bar) --- */}
                <div className="mt-24 w-48 space-y-3 flex flex-col items-center">
                    <div className="flex justify-between w-full text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                        <span>Re-routing</span>
                        <motion.span animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity }}>...</motion.span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-100 dark:bg-white/5 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-0 bg-orange-500 w-full h-full"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
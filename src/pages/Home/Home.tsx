import { Search, Activity, ShieldCheck, Zap, Globe, Microscope, Video, Fingerprint, CheckCircle2, Users, Clock3, Stethoscope, Star, ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { doctorService } from '@/lib/services/doctorService';
import { DoctorSkeleton } from '@/components/skeleton/DoctorCardSkeleton';
import { NoDataFound } from '@/components/shared/NoDataFound';
import DoctorCardRow from '@/components/cards/DoctorCardRow';
export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();


    const { data: doctorsData, isLoading: isDoctorsLoading } = useQuery({
        queryKey: ['home-doctors'],
        queryFn: () => doctorService.getAllDoctors({ page: 1, limit: 50 }), // fetch more to allow random selection
        staleTime: 1000 * 60 * 5,
    });

    // Utility to shuffle array
    function getRandomDoctors(doctors: any[], count: number) {
        const shuffled = [...doctors].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const doctors = doctorsData?.data ? getRandomDoctors(doctorsData.data, 4) : [];


    const handleHeroSearch = () => {
        const query = searchTerm.trim();
        if (!query) {
            navigate('/appointment');
            return;
        }
        navigate(`/appointment?search=${encodeURIComponent(query)}`);
    };



    return (
        <main
            style={{ fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" }}
            className="bg-white dark:bg-[#030303] transition-colors duration-500"
        >

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-30 pb-16 sm:pt-28 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                {/* Animated Background Grid with Parallax Effect */}
                <motion.div
                    className="absolute inset-0 opacity-[0.02] sm:opacity-[0.03] dark:opacity-[0.06] dark:sm:opacity-[0.08] pointer-events-none"
                    style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Gradient Blur Orbs for Depth - Responsive sizing */}
                <div className="absolute top-10 sm:top-20 -left-20 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-orange/5 sm:bg-orange/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
                <div className="absolute bottom-10 sm:bottom-20 -right-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-primary/5 sm:bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-7 space-y-6 sm:space-y-8 lg:space-y-10 relative z-10">
                        <div className="space-y-3 sm:space-y-4">
                            {/* Enhanced Status Badge with Shimmer */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 relative overflow-hidden group/badge"
                            >
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="flex h-2 w-2 rounded-full bg-orange animate-pulse relative">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-orange opacity-75 animate-ping" />
                                </span>
                                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange uppercase tracking-widest relative">your ultimate healthcare experience</span>
                            </motion.div>

                            {/* Animated Heading with Gradient Text */}
                            <motion.h1
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] dark:text-white"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                Healthcare <br />
                                <span className="text-orange italic bg-gradient-to-r from-orange via-orange to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                                    Redefined.
                                </span>
                            </motion.h1>
                        </div>

                        <motion.p
                            className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Access the global network of specialized medicine. Book high-fidelity consultations with
                            verified experts through our secure clinical operating system.
                        </motion.p>

                        {/* Enhanced Search Bar */}
                        <motion.div
                            className="relative max-w-2xl group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange/20 to-primary/20 blur opacity-25 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center   bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10  rounded shadow-2xl">
                                <div className="flex-grow flex items-center px-4 sm:px-6 py-2 sm:py-0">
                                    <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Enter specialty or physician name..."
                                        aria-label="Search for specialty or physician"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleHeroSearch();
                                            }
                                        }}
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent focus:outline-none text-xs sm:text-sm font-bold tracking-tight dark:text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <Button
                                    onClick={handleHeroSearch}
                                    className=" "
                                    aria-label="Execute search"
                                >
                                    Search
                                </Button>
                            </div>
                        </motion.div>

                        {/* Enhanced Stats with Better Avatars */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4 border-t border-gray-100 dark:border-white/5"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <div className="flex -space-x-3 sm:-space-x-4">
                                {[
                                    { color: 'from-orange/60 to-red-500/60', initial: 'A' },
                                    { color: 'from-blue-500/60 to-primary/60', initial: 'B' },
                                    { color: 'from-green-500/60 to-emerald-500/60', initial: 'C' },
                                    { color: 'from-purple-500/60 to-pink-500/60', initial: 'D' }
                                ].map((avatar, i) => (
                                    <motion.div
                                        key={i}
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-3 sm:border-4 border-white dark:border-[#030303] bg-gradient-to-br ${avatar.color} flex items-center justify-center overflow-hidden shadow-lg hover:scale-110 transition-transform cursor-pointer relative group/avatar`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        title={`Doctor ${avatar.initial}`}
                                    >
                                        <span className="text-white font-black text-xs sm:text-sm">{avatar.initial}</span>
                                        {/* Tooltip - Hidden on mobile */}
                                        <div className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2 bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-lg text-[10px] font-bold opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                            Verified Doctor
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs sm:text-sm font-black dark:text-white">500+ Verified Doctors</span>
                                <span className="text-[8px] sm:text-[10px] font-mono text-gray-400 uppercase tracking-widest">Active_Medical_Specialists</span>
                            </div>
                        </motion.div>

                        {/* Mobile-only Image Preview */}
                        <motion.div
                            className="block md:hidden mt-6"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <div className="relative rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 shadow-2xl bg-white dark:bg-[#0A0A0A]">
                                <img
                                    src="/doctor.jpg"
                                    alt="Medical professional"
                                    className="w-full h-[22rem] sm:h-[24rem] object-cover object-top grayscale-[0.35]"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-br from-orange/15 via-transparent to-primary/20 mix-blend-overlay" />

                                <div className="absolute left-3 top-3 bottom-3 w-14 rounded-2xl border border-white/20 bg-black/35 backdrop-blur-md">
                                    <div className="h-full flex flex-col items-center justify-between py-3">
                                        <div className="w-8 h-8 rounded-xl bg-orange/20 text-orange flex items-center justify-center">
                                            <Activity className="w-4 h-4 animate-pulse" />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                                                <span className="text-[10px] font-black text-white">72</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                                                <span className="text-[10px] font-black text-white">98</span>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                                                <span className="text-[10px] font-black text-white">24</span>
                                            </div>
                                        </div>

                                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                                    </div>
                                </div>

                                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center gap-2">
                                    <span className="relative flex h-2 w-2 rounded-full bg-green-400">
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                                    </span>
                                    <span className="text-[9px] font-mono font-black uppercase tracking-wider text-white">AI_Assist_ON</span>
                                </div>

                                <div className="absolute bottom-3 left-3 right-3 p-3 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[9px] font-mono text-orange font-bold uppercase tracking-[0.2em]">Session_Mode</p>
                                            <p className="text-sm font-black dark:text-white tracking-tight">Remote Cardiac Review</p>
                                        </div>
                                        <span className="px-2.5 py-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-[9px] font-black uppercase tracking-wider">
                                            Stable
                                        </span>
                                    </div>

                                    <div className="mt-3 grid grid-cols-3 gap-2">
                                        <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-2 text-center">
                                            <p className="text-[8px] font-mono text-gray-500 uppercase">HR</p>
                                            <p className="text-[11px] font-black dark:text-white">72 BPM</p>
                                        </div>
                                        <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-2 text-center">
                                            <p className="text-[8px] font-mono text-gray-500 uppercase">SpO2</p>
                                            <p className="text-[11px] font-black dark:text-white">98%</p>
                                        </div>
                                        <div className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-2 text-center">
                                            <p className="text-[8px] font-mono text-gray-500 uppercase">Resp</p>
                                            <p className="text-[11px] font-black dark:text-white">24/min</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Enhanced Image Section - Now visible on medium screens */}
                    <motion.div
                        className="lg:col-span-5 relative hidden md:block"
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <div className="relative rounded-[3rem] overflow-hidden border-[1px] border-gray-200 dark:border-white/10 shadow-2xl group/image bg-white dark:bg-[#0A0A0A]">
                            <img
                                src="/doctor.jpg"
                                alt="Medical professional providing healthcare services"
                                className="w-full h-[500px] md:h-[600px] lg:h-[650px] object-cover object-top grayscale-[0.35] group-hover/image:grayscale-0 group-hover/image:scale-105 transition-all duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-orange/15 via-transparent to-primary/20 mix-blend-overlay" />

                            <div className="absolute left-6 top-6 bottom-6 w-20 rounded-3xl border border-white/20 bg-black/35 backdrop-blur-md">
                                <div className="h-full flex flex-col items-center justify-between py-5">
                                    <div className="w-11 h-11 rounded-2xl bg-orange/20 text-orange flex items-center justify-center">
                                        <Activity className="w-5 h-5 animate-pulse" />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                            <span className="text-xs font-black text-white">72</span>
                                        </div>
                                        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                            <span className="text-xs font-black text-white">98</span>
                                        </div>
                                        <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                                            <span className="text-xs font-black text-white">24</span>
                                        </div>
                                    </div>

                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                </div>
                            </div>

                            <div className="absolute top-6 right-6 px-4 py-2 rounded-full border border-white/30 bg-black/40 backdrop-blur-md flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5 rounded-full bg-green-400">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                                </span>
                                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-white">AI_Assist_ON</span>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-mono text-orange font-bold uppercase tracking-[0.2em]">Session_Mode</p>
                                        <p className="text-lg font-black dark:text-white tracking-tight">Remote Cardiac Review</p>
                                    </div>
                                    <span className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-wider">
                                        Stable
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-3 gap-3">
                                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3 text-center">
                                        <p className="text-[9px] font-mono text-gray-500 uppercase">HR</p>
                                        <p className="text-sm font-black dark:text-white">72 BPM</p>
                                    </div>
                                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3 text-center">
                                        <p className="text-[9px] font-mono text-gray-500 uppercase">SpO2</p>
                                        <p className="text-sm font-black dark:text-white">98%</p>
                                    </div>
                                    <div className="rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white/70 dark:bg-white/5 p-3 text-center">
                                        <p className="text-[9px] font-mono text-gray-500 uppercase">Resp</p>
                                        <p className="text-sm font-black dark:text-white">24/min</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. STATS BAR --- */}
            <section className="py-8 sm:py-10 lg:py-12 border-y border-gray-100 dark:border-white/5 bg-gradient-to-r from-gray-50/50 via-orange/[0.02] to-gray-50/50 dark:from-white/[0.01] dark:via-orange/[0.03] dark:to-white/[0.01] relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 relative z-10">
                    {[
                        { label: "Transactions", value: "50k+", icon: <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6" />, color: "from-orange/20 to-orange/5", iconBg: "bg-orange/10", iconColor: "text-orange", delay: 0.1 },
                        { label: "Active_Physicians", value: "500+", icon: <Activity className="w-5 sm:w-6 h-5 sm:h-6" />, color: "from-primary/20 to-primary/5", iconBg: "bg-primary/10", iconColor: "text-primary", delay: 0.2 },
                        { label: "Clinical_Years", value: "15+", icon: <Zap className="w-5 sm:w-6 h-5 sm:h-6" />, color: "from-green-500/20 to-green-500/5", iconBg: "bg-green-500/10", iconColor: "text-green-600 dark:text-green-500", delay: 0.3 },
                        { label: "Medical_Nodes", value: "80+", icon: <Globe className="w-5 sm:w-6 h-5 sm:h-6" />, color: "from-blue-500/20 to-blue-500/5", iconBg: "bg-blue-500/10", iconColor: "text-blue-600 dark:text-blue-500", delay: 0.4 },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: stat.delay }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="group relative"
                        >
                            {/* Gradient Background on Hover */}
                            <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Card Content */}
                            <div className="relative bg-white dark:bg-[#0A0A0A] border border-gray-100 dark:border-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 transition-all duration-500 group-hover:border-gray-200 dark:group-hover:border-white/10 group-hover:shadow-xl">
                                {/* Icon Container */}
                                <motion.div
                                    className={`w-10 sm:w-12 h-10 sm:h-12 rounded-xl sm:rounded-2xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-3 sm:mb-4`}
                                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {stat.icon}
                                </motion.div>

                                {/* Value */}
                                <motion.div
                                    className="mb-2"
                                    initial={{ scale: 0.5 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: stat.delay + 0.2, type: "spring" }}
                                >
                                    <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tighter dark:text-white uppercase block leading-none">
                                        {stat.value}
                                    </span>
                                </motion.div>

                                {/* Label */}
                                <p className="text-[9px] sm:text-[10px] font-mono text-gray-500 dark:text-gray-400   font-bold leading-relaxed">
                                    {stat.label}
                                </p>

                                {/* Pulse Indicator */}
                                <motion.div
                                    className={`absolute top-3 right-3 w-2 h-2 rounded-full ${stat.iconBg} opacity-0 group-hover:opacity-100`}
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- 3. SPECIALIST MATRIX --- */}
            <section className="py-32 px-10 bg-white dark:bg-[#030303]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-orange font-black ">Doctors</span>
                            <h2 className="text-5xl font-black tracking-tighter dark:text-white uppercase">Expert Specialists.</h2>
                        </div>
                        <Button className="hidden md:flex items-center gap-2   transition-all">
                            <Link to='/doctors' className="flex items-center gap-2">
                                Browse All  <ChevronRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {
                            isDoctorsLoading && [1, 2, 3, 4].map((i) => (
                                <DoctorSkeleton key={i} />
                            ))
                        }

                        {!isDoctorsLoading && doctors && doctors?.map((doctor: any) => (
                            <DoctorCardRow key={doctor.id} doctor={doctor} />
                        ))}

                        {!isDoctorsLoading && doctors?.length === 0 && (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                <NoDataFound title="No Doctors Found" description="No specialist doctors available right now." />
                            </div>
                        )}
                    </div>
                </div>
                <Button className=" w-full md:hidden" variant="outline">
                    <Link to='/doctors' className="flex items-center gap-2">
                        Browse All Doctors  <ChevronRight className="w-4 h-4" /></Link>
                </Button>

            </section>

            {/* --- 4. CLINICAL PROTOCOL --- */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center">
                    <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                        <div className="space-y-3 sm:space-y-4">
                            <span className="text-[10px] sm:text-xs font-mono text-primary font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Workflow_Protocol</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter dark:text-white uppercase leading-none">The Patient <br /> Journey.</h2>
                        </div>
                        <div className="space-y-6 sm:space-y-8">
                            {[
                                { step: "01", title: "Node Selection", desc: "Filter through verified specialists across all clinical departments." },
                                { step: "02", title: "Secure Uplink", desc: "Initialize a high-bandwidth video consultation on our encrypted network." },
                                { step: "03", title: "Digital Diagnosis", desc: "Receive immediate prescriptions and lab requests to your secure vault." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 sm:gap-6 group">
                                    <span className="text-xl sm:text-2xl font-mono font-black text-gray-200 dark:text-white/10 group-hover:text-orange transition-colors">{item.step}</span>
                                    <div className="space-y-1">
                                        <h4 className="text-base sm:text-lg lg:text-xl font-black dark:text-white uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
                        <div className="relative bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-[3rem] p-6 sm:p-10 lg:p-12 shadow-2xl">
                            <div className="space-y-4 sm:space-y-6">
                                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-white/5 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-white/5">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-primary/20" />
                                        <span className="text-[10px] sm:text-xs font-black dark:text-white uppercase">Specialist Found</span>
                                    </div>
                                    <CheckCircle2 className="text-primary w-4 sm:w-5 h-4 sm:h-5" />
                                </div>
                                <div className="h-32 sm:h-40 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-2xl sm:rounded-3xl">
                                    <Activity className="w-10 sm:w-12 h-10 sm:h-12 text-gray-200 dark:text-white/10 animate-pulse" />
                                </div>
                                <button className="w-full py-3 sm:py-4 bg-primary text-white rounded-xl sm:rounded-2xl font-black text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.3em]">Initialize System</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. SERVICES MODULES --- */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10 bg-gray-50/50 dark:bg-white/[0.01] border-y border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4">
                        <span className="text-[10px] sm:text-xs font-mono text-orange font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Clinical_Modules</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter dark:text-white uppercase">System Capabilities.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {[
                            { title: "Telemedicine", desc: "Consult with doctors via video call from anywhere.", icon: <Video className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" /> },
                            { title: "Lab Tests", desc: "Book blood tests and diagnostics at home.", icon: <Microscope className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" /> },
                            { title: "Neural Pharmacy", desc: "Automated medicine routing and logistics.", icon: <Zap className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8" /> },
                        ].map((service, i) => (
                            <div key={i} className="p-6 sm:p-8 lg:p-10 bg-white dark:bg-[#0A0A0A] rounded-3xl sm:rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className="text-orange mb-6 sm:mb-8">{service.icon}</div>
                                <h3 className="text-xl sm:text-xl lg:text-2xl font-black mb-3 sm:mb-4 dark:text-white uppercase tracking-tighter">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed font-medium">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. TRUST LAYERS --- */}
            <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10">
                <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
                    <div className="space-y-3">
                        <span className="text-[10px] sm:text-xs font-mono text-primary font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Quality_Layers</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter dark:text-white uppercase">Why Patients Choose Medi.</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {[
                            { title: 'Verified Doctors', desc: 'Every specialist is identity-verified and credential screened.', icon: <ShieldCheck className="w-5 h-5" /> },
                            { title: 'Fast Appointments', desc: 'Book, confirm and consult without waiting in long queues.', icon: <Clock3 className="w-5 h-5" /> },
                            { title: 'Patient-Centric', desc: 'Designed to keep every visit and medical record easy to manage.', icon: <Users className="w-5 h-5" /> },
                            { title: 'Clinical Accuracy', desc: 'Structured workflow for diagnosis, notes and digital prescriptions.', icon: <Stethoscope className="w-5 h-5" /> },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="rounded-3xl border border-gray-100 dark:border-white/5 p-6 bg-white dark:bg-[#0A0A0A] hover:shadow-xl transition-all"
                            >
                                <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black tracking-tight dark:text-white uppercase mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 7. SPECIALTY GRID --- */}
            <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10 bg-gray-50/50 dark:bg-white/[0.01] border-y border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="space-y-3">
                            <span className="text-[10px] sm:text-xs font-mono text-orange font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Departments_Index</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter dark:text-white uppercase">Popular Specialties.</h2>
                        </div>
                        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-white/5 transition-all">
                            Browse All
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                        {['Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'Orthopedics', 'ENT', 'Gynecology', 'Urology', 'Psychiatry', 'Dental', 'Oncology', 'General Care'].map((specialty, index) => (
                            <div
                                key={index}
                                className="rounded-2xl border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0A0A0A] px-4 py-5 text-center hover:-translate-y-1 hover:shadow-lg transition-all"
                            >
                                <p className="text-xs sm:text-sm font-black dark:text-white uppercase tracking-tight">{specialty}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 8. PATIENT FEEDBACK --- */}
            <section className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-10">
                <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">
                    <div className="text-center space-y-3">
                        <span className="text-[10px] sm:text-xs font-mono text-primary font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">Patient_Reports</span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter dark:text-white uppercase">What Patients Say.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        {[
                            {
                                quote: 'Booking a specialist took less than five minutes, and follow-up was seamless.',
                                author: 'Nadia Rahman',
                                meta: 'Cardiology Patient'
                            },
                            {
                                quote: 'The consultation quality was excellent and prescription delivery was instant.',
                                author: 'Arif Hasan',
                                meta: 'Telemedicine User'
                            },
                            {
                                quote: 'I can track all appointments, notes and reports in one place. Very convenient.',
                                author: 'Samia Islam',
                                meta: 'Family Account'
                            },
                        ].map((item, index) => (
                            <div key={index} className="rounded-3xl border border-gray-100 dark:border-white/5 p-6 sm:p-8 bg-white dark:bg-[#0A0A0A]">
                                <div className="flex items-center gap-1 mb-4 text-orange">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed mb-6">“{item.quote}”</p>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-tight dark:text-white">{item.author}</p>
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mt-1">{item.meta}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 9. CTA --- */}
            <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-10">
                <div className="max-w-7xl mx-auto relative rounded-3xl sm:rounded-[3rem] bg-black dark:bg-white overflow-hidden p-8 sm:p-12 lg:p-24 text-center space-y-6 sm:space-y-8 lg:space-y-10">
                    <div className="absolute inset-0 opacity-10 sm:opacity-20 pointer-events-none">
                        <Activity className="w-full h-full text-white dark:text-black scale-150" />
                    </div>
                    <div className="relative z-10 space-y-4 sm:space-y-6">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white dark:text-black tracking-tighter leading-none uppercase">
                            Ready to <br /> Initialize?
                        </h2>
                        <p className="text-white/60 dark:text-black/60 text-sm sm:text-base lg:text-lg font-medium max-w-2xl mx-auto px-4">
                            Join the Medi. network today. Authenticate your profile to access subsidized consultations and global nodes.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <button className="px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-orange text-white rounded-xl sm:rounded-2xl font-black uppercase text-[10px] sm:text-[11px] tracking-[0.25em] sm:tracking-[0.3em] hover:scale-105 transition-transform flex items-center justify-center gap-2 sm:gap-3 mx-auto sm:mx-0">
                            <Fingerprint className="w-4 sm:w-5 h-4 sm:h-5" /> Create_Identity
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
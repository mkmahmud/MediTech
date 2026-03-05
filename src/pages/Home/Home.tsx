import { Search, Activity, ShieldCheck, Zap, Globe, Microscope, Video, Fingerprint, Command, CheckCircle2, } from 'lucide-react';
import { motion } from 'framer-motion';
export default function Home() {



    return (
        <main
            style={{ fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" }}
            className="bg-white dark:bg-[#030303] transition-colors duration-500"
        >

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
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
                                <span className="text-[9px] sm:text-[10px] font-mono font-black text-orange uppercase tracking-widest relative">System_Status: Optimal</span>
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
                            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center p-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-2xl sm:rounded-[2rem] shadow-2xl">
                                <div className="flex-grow flex items-center px-4 sm:px-6 py-2 sm:py-0">
                                    <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Enter specialty or physician name..."
                                        aria-label="Search for specialty or physician"
                                        className="w-full px-3 sm:px-4 py-3 sm:py-4 bg-transparent focus:outline-none text-xs sm:text-sm font-bold tracking-tight dark:text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <button
                                    className="bg-black dark:bg-white text-white dark:text-black px-6 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-full font-black text-[9px] sm:text-[10px] uppercase tracking-[0.2em] hover:bg-orange dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
                                    aria-label="Execute search"
                                >
                                    Execute <Command className="w-3 h-3" />
                                </button>
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
                                <span className="text-xs sm:text-sm font-black dark:text-white">500+ Verified Nodes</span>
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
                            <div className="relative rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-transparent to-primary/20 mix-blend-overlay" />
                                <img
                                    src="/doctor.jpg"
                                    alt="Medical professional"
                                    className="w-full h-64 object-cover grayscale-[0.5]"
                                />

                                {/* Simple overlay card for mobile */}
                                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 dark:bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Activity className="w-5 h-5 text-orange animate-pulse" />
                                            <div>
                                                <p className="text-[9px] font-mono text-orange font-bold uppercase">Heart_Rate</p>
                                                <p className="text-lg font-black dark:text-white tracking-tighter">72 BPM</p>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
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
                        <div className="relative rounded-[3rem] overflow-hidden border-[1px] border-gray-200 dark:border-white/10 shadow-2xl group/image">
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-transparent to-primary/20 mix-blend-overlay group-hover/image:opacity-0 transition-opacity duration-700" />
                            <img
                                src="/doctor.jpg"
                                alt="Medical professional providing healthcare services"
                                className="w-full h-[500px] md:h-[600px] lg:h-[650px] object-cover grayscale-[0.5] group-hover/image:grayscale-0 group-hover/image:scale-105 transition-all duration-700"
                            />

                            {/* Floating Activity Card */}
                            <motion.div
                                className="absolute top-10 right-10 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Activity className="w-6 h-6 text-orange animate-pulse" />
                            </motion.div>

                            {/* Floating Heart Rate Card */}
                            <motion.div
                                className="absolute bottom-10 left-10 p-6 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <p className="text-[10px] font-mono text-orange font-bold uppercase mb-1">Heart_Rate</p>
                                <p className="text-2xl font-black dark:text-white tracking-tighter flex items-center gap-2">
                                    72 BPM
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="inline-block w-2 h-2 bg-orange rounded-full"
                                    />
                                </p>
                            </motion.div>

                            {/* Additional Floating Element - Success Badge */}
                            <motion.div
                                className="absolute top-1/2 left-10 -translate-y-1/2 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl opacity-0 group-hover/image:opacity-100 transition-opacity"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    <span className="text-xs font-black dark:text-white">Verified</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- 2. STATS BAR --- */}
            <section className="py-8 sm:py-10 lg:py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {[
                        { label: "Transactions", value: "50k+", icon: <ShieldCheck className="w-3 sm:w-4 h-3 sm:h-4" /> },
                        { label: "Active_Physicians", value: "500+", icon: <Activity className="w-3 sm:w-4 h-3 sm:h-4" /> },
                        { label: "Clinical_Years", value: "15+", icon: <Zap className="w-3 sm:w-4 h-3 sm:h-4" /> },
                        { label: "Medical_Nodes", value: "80+", icon: <Globe className="w-3 sm:w-4 h-3 sm:h-4" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col space-y-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 text-primary">
                                {stat.icon}
                                <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter dark:text-white uppercase">{stat.value}</span>
                            </div>
                            <p className="text-[8px] sm:text-[9px] font-mono text-gray-400 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. SPECIALIST MATRIX --- */}
            {/* <section className="py-32 px-10 bg-white dark:bg-[#030303]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-16">
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-orange font-black uppercase tracking-[0.4em]">Node_Directory</span>
                            <h2 className="text-5xl font-black tracking-tighter dark:text-white uppercase">Expert Specialists.</h2>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 border border-gray-200 dark:border-white/10 rounded-full hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                            Browse All  <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {
                            isLoading && [1, 2, 3, 4].map((i) => (
                                <DoctorSkeleton key={i} />
                            ))
                        }

                        {doctors && doctors?.map((doctor) => (
                            <div key={doctor?.id} className="group relative bg-gray-50/50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-4 transition-all hover:bg-white dark:hover:bg-white/[0.05] hover:shadow-2xl">

                                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="w-full h-full bg-gray-200 dark:bg-white/10" >
                                        <img src={doctor?.profileImageUrl || '/doctor.jpg'} alt="" /></div>
                                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        <button className="w-full py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Book Consultation</button>
                                    </div>
                                </div>
                                <div className="px-4 pb-4">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-black dark:text-white uppercase text-lg tracking-tight">{doctor?.firstName} {doctor?.lastName}</h4>
                                        <div className="flex items-center gap-1 text-orange">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-[10px] font-bold">4.9</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest">{doctor?.doctor?.specialization}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

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

            {/* --- 6. CTA --- */}
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
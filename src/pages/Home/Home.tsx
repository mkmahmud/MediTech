import { Search, Activity, ShieldCheck, Zap, Globe, Microscope, Video, Fingerprint, Command, Star, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useDoctorStore } from '@/stores/doctors/useDoctorsStore';
import { DoctorSkeleton } from '@/components/skeleton/DoctorCardSkeleton';

export default function Home() {

    // Get Doctors
    const { doctors, isLoading, fetchDoctors } = useDoctorStore();

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <main
            style={{ fontFamily: "'Roboto', 'Open Sans', 'Helvetica', 'Arial', sans-serif" }}
            className="bg-white dark:bg-[#030303] transition-colors duration-500"
        >

            {/* --- 1. HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none"
                    style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                />

                <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-7 space-y-10 relative z-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20"
                            >
                                <span className="flex h-2 w-2 rounded-full bg-orange animate-pulse" />
                                <span className="text-[10px] font-mono font-black text-orange uppercase tracking-widest">System_Status: Optimal</span>
                            </motion.div>

                            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] dark:text-white">
                                Healthcare <br />
                                <span className="text-orange italic">Redefined.</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium">
                            Access the global network of specialized medicine. Book high-fidelity consultations with
                            verified experts through our secure clinical operating system.
                        </p>

                        <div className="relative max-w-2xl group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange/20 to-primary/20 blur opacity-0 group-hover:opacity-100 transition duration-1000" />
                            <div className="relative flex items-center p-2 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl">
                                <div className="flex-grow flex items-center px-6">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter specialty or physician name..."
                                        className="w-full px-4 py-4 bg-transparent focus:outline-none text-sm font-bold tracking-tight dark:text-white"
                                    />
                                </div>
                                <button className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange dark:hover:bg-primary dark:hover:text-white transition-all active:scale-95 flex items-center gap-2">
                                    Execute <Command className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 pt-4 border-t border-gray-100 dark:border-white/5">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-2xl border-4 border-white dark:border-[#030303] bg-gray-100 dark:bg-white/10 flex items-center justify-center overflow-hidden">
                                        <div className="w-full h-full bg-gradient-to-br from-orange/20 to-primary/20" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-black dark:text-white">500+ Verified Nodes</span>
                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Active_Medical_Specialists</span>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 relative hidden lg:block">
                        <div className="relative rounded-[3rem] overflow-hidden border-[1px] border-gray-200 dark:border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-orange/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                            <img src="/doctor.jpg" alt="Clinical Interface" className="w-full h-[650px] object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />

                            <div className="absolute top-10 right-10 p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl">
                                <Activity className="w-6 h-6 text-orange animate-pulse" />
                            </div>
                            <div className="absolute bottom-10 left-10 p-6 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
                                <p className="text-[10px] font-mono text-orange font-bold uppercase mb-1">Heart_Rate</p>
                                <p className="text-2xl font-black dark:text-white tracking-tighter">72 BPM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 2. STATS BAR --- */}
            <section className="py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.01]">
                <div className="max-w-7xl mx-auto px-10 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { label: "Transactions", value: "50k+", icon: <ShieldCheck className="w-4 h-4" /> },
                        { label: "Active_Physicians", value: "500+", icon: <Activity className="w-4 h-4" /> },
                        { label: "Clinical_Years", value: "15+", icon: <Zap className="w-4 h-4" /> },
                        { label: "Medical_Nodes", value: "80+", icon: <Globe className="w-4 h-4" /> },
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col space-y-1">
                            <div className="flex items-center gap-2 text-primary">
                                {stat.icon}
                                <span className="text-3xl font-black tracking-tighter dark:text-white uppercase">{stat.value}</span>
                            </div>
                            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 3. SPECIALIST MATRIX --- */}
            <section className="py-32 px-10 bg-white dark:bg-[#030303]">
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
            </section>

            {/* --- 4. CLINICAL PROTOCOL --- */}
            <section className="py-32 px-10 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-primary font-black uppercase tracking-[0.4em]">Workflow_Protocol</span>
                            <h2 className="text-5xl font-black tracking-tighter dark:text-white uppercase leading-none">The Patient <br /> Journey.</h2>
                        </div>
                        <div className="space-y-8">
                            {[
                                { step: "01", title: "Node Selection", desc: "Filter through verified specialists across all clinical departments." },
                                { step: "02", title: "Secure Uplink", desc: "Initialize a high-bandwidth video consultation on our encrypted network." },
                                { step: "03", title: "Digital Diagnosis", desc: "Receive immediate prescriptions and lab requests to your secure vault." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <span className="text-2xl font-mono font-black text-gray-200 dark:text-white/10 group-hover:text-orange transition-colors">{item.step}</span>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black dark:text-white uppercase tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
                        <div className="relative bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/10 rounded-[3rem] p-12 shadow-2xl">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/20" />
                                        <span className="text-xs font-black dark:text-white uppercase">Specialist Found</span>
                                    </div>
                                    <CheckCircle2 className="text-primary w-5 h-5" />
                                </div>
                                <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 dark:border-white/5 rounded-3xl">
                                    <Activity className="w-12 h-12 text-gray-200 dark:text-white/10 animate-pulse" />
                                </div>
                                <button className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em]">Initialize System</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 5. SERVICES MODULES --- */}
            <section className="py-32 px-10 bg-gray-50/50 dark:bg-white/[0.01] border-y border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <span className="text-xs font-mono text-orange font-black uppercase tracking-[0.4em]">Clinical_Modules</span>
                        <h2 className="text-5xl font-black tracking-tighter dark:text-white uppercase">System Capabilities.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Telemedicine", desc: "Consult with doctors via video call from anywhere.", icon: <Video className="w-8 h-8" /> },
                            { title: "Lab Tests", desc: "Book blood tests and diagnostics at home.", icon: <Microscope className="w-8 h-8" /> },
                            { title: "Neural Pharmacy", desc: "Automated medicine routing and logistics.", icon: <Zap className="w-8 h-8" /> },
                        ].map((service, i) => (
                            <div key={i} className="p-10 bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                                <div className="text-orange mb-8">{service.icon}</div>
                                <h3 className="text-2xl font-black mb-4 dark:text-white uppercase tracking-tighter">{service.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed font-medium">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 6. CTA --- */}
            <section className="py-32 px-10">
                <div className="max-w-7xl mx-auto relative rounded-[3rem] bg-black dark:bg-white overflow-hidden p-12 lg:p-24 text-center space-y-10">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <Activity className="w-full h-full text-white dark:text-black scale-150" />
                    </div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-5xl lg:text-7xl font-black text-white dark:text-black tracking-tighter leading-none uppercase">
                            Ready to <br /> Initialize?
                        </h2>
                        <p className="text-white/60 dark:text-black/60 text-lg font-medium max-w-2xl mx-auto">
                            Join the Medi. network today. Authenticate your profile to access subsidized consultations and global nodes.
                        </p>
                    </div>
                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-12 py-5 bg-orange text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] hover:scale-105 transition-transform flex items-center gap-3 mx-auto sm:mx-0">
                            <Fingerprint className="w-5 h-5" /> Create_Identity
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
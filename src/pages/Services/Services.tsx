import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {

    Clock,
    Plus,

    BarChart3,
    Layers
} from "lucide-react"

const SERVICES = [
    { id: 1, title: "Cardiovascular Scan", category: "Diagnostic", price: "$450", duration: "45 Min", complexity: "High", load: 65, description: "High-resolution multi-planar imaging of heart valves and arterial blood flow." },
    { id: 2, title: "Neural Synapse Mapping", category: "Neurology", price: "$820", duration: "90 Min", complexity: "Extreme", load: 40, description: "Comprehensive EEG analysis to monitor cognitive firing patterns and neuro-health." },
    { id: 3, title: "Biometric Integration", category: "General", price: "$120", duration: "20 Min", complexity: "Low", load: 95, description: "Synchronizing wearable health data with clinical electronic health records." },
    { id: 4, title: "Retinal Laser Suite", category: "Ophthalmology", price: "$1,100", duration: "30 Min", complexity: "Mid", load: 20, description: "Precision corrective procedures using cold-laser technology for retinal repair." },
];

export default function ServicesPage() {
    const [activeSector, setActiveSector] = useState("All");

    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#020202] text-[#1a1a1a] dark:text-white selection:bg-orange">

            {/* --- SYSTEM HUD (STICKY) --- */}


            <div className="mt-20 max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">

                {/* --- SIDEBAR: STATUS MONITOR --- */}
                <aside className="lg:w-80 p-8 lg:border-r border-gray-100 dark:border-white/5 flex flex-col justify-between">
                    <div className="space-y-12">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">System_Sectors</p>
                            <div className="space-y-2">
                                {['All', 'Diagnostic', 'Neurology', 'General', 'Ophthalmology'].map(sector => (
                                    <button
                                        key={sector}
                                        onClick={() => setActiveSector(sector)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeSector === sector ? 'bg-black text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 font-bold'}`}
                                    >
                                        <span className="text-[10px] uppercase tracking-widest">{sector}</span>
                                        {activeSector === sector && <Plus className="w-3 h-3 text-orange" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-[32px] bg-orange/5 border border-orange/10 space-y-4">
                            <BarChart3 className="w-5 h-5 text-orange" />
                            <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">
                                Network_Load: <span className="text-orange">Moderate</span><br />
                                Active_Labs: 14/18
                            </p>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN: PROTOCOL GRID --- */}
                <main className="flex-1 p-8 lg:p-12 overflow-y-auto bg-gray-50/30 dark:bg-transparent">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <AnimatePresence mode="popLayout">
                            {SERVICES.filter(s => activeSector === "All" || s.category === activeSector).map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group bg-white dark:bg-[#0a0a0a] rounded-[48px] p-10 border border-gray-100 dark:border-white/5 hover:border-orange transition-all duration-500 shadow-sm flex flex-col justify-between min-h-[480px]"
                                >
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full text-[8px] font-black uppercase tracking-[0.2em]">Proc_{service.id.toString().padStart(3, '0')}</span>
                                                    <span className="text-orange text-[8px] font-black uppercase tracking-[0.2em]">{service.complexity}_Complexity</span>
                                                </div>
                                                <h3 className="text-4xl font-black uppercase tracking-tighter italic leading-none">{service.title}</h3>
                                            </div>
                                            <div className="h-16 w-16 rounded-3xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/10 group-hover:rotate-12 transition-transform">
                                                <Layers className="w-6 h-6 text-gray-300 dark:text-gray-700 group-hover:text-orange" />
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-md">
                                            {service.description}
                                        </p>

                                        {/* Dynamic Load Visualizer */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-end">
                                                <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">Current_System_Load</p>
                                                <p className="text-[10px] font-black">{service.load}%</p>
                                            </div>
                                            <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${service.load}%` }}
                                                    className={`h-full rounded-full ${service.load > 80 ? 'bg-red-500' : 'bg-orange'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-10 flex items-center justify-between border-t border-gray-50 dark:border-white/5">
                                        <div className="flex items-center gap-10">
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Unit_Cost</p>
                                                <p className="text-xl font-black tracking-tighter italic">{service.price}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[8px] font-black text-gray-300 uppercase">Cycle_Time</p>
                                                <p className="text-[11px] font-black flex items-center gap-2 uppercase tracking-widest"><Clock className="w-3 h-3 text-orange" /> {service.duration}</p>
                                            </div>
                                        </div>

                                        <Button className="h-20 px-10 rounded-[30px] bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-orange hover:text-white transition-all group-hover:scale-[1.02]">
                                            Initialize
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}
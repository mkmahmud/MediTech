import { useState, useMemo } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { InputGroup } from "@/components/ui/input-group"
import {
    Star,
    Stethoscope,
    Heart,
    Brain,
    Eye,
    ChevronRight,
    Plus,
    ArrowUpRight,
    Search
} from "lucide-react"

const DOCTORS = [
    { id: 1, name: "Dr. Sarah Jenkins", specialty: "Cardiology", rating: 4.9, experience: "12 Yrs", status: "Available", bio: "Leading expert in non-invasive cardiovascular surgery and rhythm management." },
    { id: 2, name: "Dr. Marcus Chen", specialty: "Neurology", rating: 4.8, experience: "8 Yrs", status: "Away", bio: "Specializing in neuroplasticity and advanced diagnostic imaging protocols." },
    { id: 3, name: "Dr. Elena Rodriguez", specialty: "Ophthalmology", rating: 5.0, experience: "15 Yrs", status: "Available", bio: "Pioneer in laser-assisted reconstructive surgery and retinal synchronization." },
    { id: 4, name: "Dr. James Wilson", specialty: "General Medicine", rating: 4.7, experience: "10 Yrs", status: "Available", bio: "Focused on holistic clinical integration and proactive biometric monitoring." },
];

const CATEGORIES = [
    { name: "All", icon: Stethoscope },
    { name: "Cardiology", icon: Heart },
    { name: "Neurology", icon: Brain },
    { name: "Ophthalmology", icon: Eye },
];

export default function DoctorsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const methods = useForm({ defaultValues: { search: "" } });
    const searchQuery = methods.watch("search");

    const filteredDoctors = useMemo(() => {
        return DOCTORS.filter(doc => {
            const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || doc.specialty === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

 
    return (
        <div   className="min-h-screen bg-[#fcfcfc] dark:bg-[#030303] text-[#1a1a1a] dark:text-white selection:bg-orange">

            {/* --- STICKY SEARCH HEADER --- */}
            {/* Added backdrop-blur for a premium feel when scrolling cards underneath */}
            <section className="sticky top-20 z-40 px-6 lg:px-24 py-6 bg-[#fcfcfc]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 min-w-max">
                        <Plus className="text-orange w-4 h-4" />
                        <h2 className="text-[11px] font-black uppercase tracking-[0.4em]">Search_Nodes</h2>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        <FormProvider {...methods}>
                            <InputGroup
                                name="search"
                                placeholder="QUERY_BY_NAME_OR_SECTOR..."
                                className="rounded-full h-14 bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 px-8 font-black uppercase text-[10px] tracking-widest focus:border-orange transition-all"
                            />
                        </FormProvider>
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* --- CONTENT ARCHITECTURE --- */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row mt-20">

                {/* Left Nav: Sticky Categories */}
                <aside className="lg:w-72 p-6 lg:py-12 lg:sticky lg:top-[100px] h-fit space-y-8">
                    <div className="space-y-1">
                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">Sectors</p>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setActiveCategory(cat.name)}
                                className={`group w-full flex items-center justify-between py-4 px-2 border-b border-transparent hover:border-orange transition-all ${activeCategory === cat.name ? 'border-orange' : ''}`}
                            >
                                <span className={`text-[11px] font-black uppercase tracking-widest transition-colors ${activeCategory === cat.name ? 'text-orange' : 'text-gray-400 group-hover:text-black dark:group-hover:text-white'}`}>
                                    {cat.name}
                                </span>
                                <ChevronRight className={`w-3 h-3 transition-transform ${activeCategory === cat.name ? 'text-orange translate-x-1' : 'text-gray-200 opacity-0 group-hover:opacity-100'}`} />
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Right Content: The Specialist Grid */}
                <main className="flex-1 p-6 lg:p-12 border-l border-gray-100 dark:border-white/5">
                    <div className="grid grid-cols-1 gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredDoctors.map((doc, i) => (
                                <motion.div
                                    key={doc.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="group bg-white dark:bg-[#080808] rounded-[40px] p-8 lg:p-12 border border-gray-100 dark:border-white/5 hover:border-orange/20 transition-all flex flex-col lg:flex-row gap-12 items-center"
                                >
                                    {/* Visual Cluster */}
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 flex items-center justify-center font-black text-3xl text-orange italic">
                                            {doc.name.split(' ')[2][0]}
                                        </div>
                                        {doc.status === "Available" && (
                                            <div className="absolute -bottom-1 right-2 h-5 w-5 bg-green-500 rounded-full border-4 border-white dark:border-[#080808] animate-pulse" />
                                        )}
                                    </div>

                                    {/* Detail Cluster */}
                                    <div className="flex-1 space-y-4 text-center lg:text-left">
                                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-3xl font-black uppercase tracking-tighter italic">{doc.name}</h3>
                                                <p className="text-[10px] font-bold text-orange uppercase tracking-[0.4em]">{doc.specialty}</p>
                                            </div>
                                            <div className="flex items-center justify-center lg:justify-start gap-4 text-[10px] font-black uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Star className="w-3 h-3 fill-orange text-orange" /> {doc.rating}</span>
                                                <span className="text-gray-200 dark:text-gray-800">/</span>
                                                <span className="text-gray-400">{doc.experience} EXP</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed font-medium">
                                            {doc.bio}
                                        </p>
                                    </div>

                                    {/* Action Cluster */}
                                    <div className="flex gap-3">
                                        <Button className="h-20 w-20 rounded-full border-2 border-black dark:border-white bg-transparent hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-white dark:hover:text-black transition-all flex items-center justify-center">
                                            <ArrowUpRight className="w-6 h-6" />
                                        </Button>
                                        <Button className="h-20 px-10 rounded-full bg-orange text-white font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-orange/20 border-none">
                                            Book_Node
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {filteredDoctors.length === 0 && (
                        <div className="py-20 text-center opacity-30">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Zero_Matches_Found</p>
                        </div>
                    )}
                </main>
            </div>

            {/* --- FOOTER --- */}
            <footer className="p-12 border-t border-gray-100 dark:border-white/5 flex justify-between items-center opacity-30">
                <p className="text-[9px] font-black uppercase tracking-[0.5em]">Clinical_OS_Directory</p>
                <div className="h-[1px] w-20 bg-gray-200 dark:bg-white/10" />
            </footer>
        </div>
    )
}
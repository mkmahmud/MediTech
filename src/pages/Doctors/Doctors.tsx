import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { InputGroup } from "@/components/ui/input-group"
import { AppPagination } from "@/components/shared/AppPagination"
import {

    Stethoscope,
    Heart,
    Brain,
    Eye,
    ChevronRight,
    Plus,

    Search,
    Syringe,
    Baby,

    Bone,
    BrainCircuit,
    Users,

} from "lucide-react"
import { doctorService } from "@/lib/services/doctorService"
import { DoctorSkeleton } from "@/components/skeleton/DoctorCardSkeleton"
import DoctorCard from "@/components/cards/DoctorCard"
import { Button } from "@/components/ui/button"
import { NoDataFound } from "@/components/shared/NoDataFound"

const CATEGORIES = [
    { name: "All", icon: Stethoscope, value: null },
    { name: "Cardiology", icon: Heart, value: "CARDIOLOGY" },
    { name: "Neurology", icon: Brain, value: "NEUROLOGY" },
    { name: "Ophthalmology", icon: Eye, value: "OPHTHALMOLOGY" },
    { name: "Dermatology", icon: Syringe, value: "DERMATOLOGY" },
    { name: "Pediatrics", icon: Baby, value: "PEDIATRICS" },
    { name: "Orthopedics", icon: Bone, value: "ORTHOPEDICS" },
    { name: "Psychiatry", icon: BrainCircuit, value: "PSYCHIATRY" },
    { name: "General", icon: Users, value: "GENERAL_PRACTICE" },
];

export default function DoctorsPage() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const limit = 7;

    const methods = useForm({ defaultValues: { search: "" } });
    const searchQuery = methods.watch("search");

    // Fetch doctors using TanStack Query
    const { data, isLoading, error } = useQuery({
        queryKey: ['doctors', activeCategory, searchQuery, page],
        queryFn: () => doctorService.getAllDoctors({
            specialization: activeCategory,
            name: searchQuery || undefined,
            page,
            limit,
        }),
        placeholderData: (previousData) => previousData,
    });

    // Handle data extraction - works with nested or direct data structure
    const doctors = data?.data || [];
    const totalPages = data?.meta?.totalPages || 1;
    const hasNextPage = data?.meta?.hasNextPage || false;
    const hasPreviousPage = data?.meta?.hasPreviousPage || false;




    return (
        <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#030303] text-[#1a1a1a] dark:text-white selection:bg-orange">

            {/* --- STICKY SEARCH HEADER --- */}
            <section className="sticky top-20 z-40 px-4 sm:px-6 lg:px-24 py-6 bg-[#fcfcfc]/80 dark:bg-[#030303]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4 min-w-max">
                        <Plus className="text-orange w-4 h-4" />
                        <h2 className="text-sm  ">Search Doctors</h2>
                    </div>

                    <div className="w-full lg:w-1/2 relative">
                        <FormProvider {...methods}>
                            <InputGroup
                                name="search"
                                placeholder="QUERY_BY_NAME_OR_SECTOR..."

                            />
                        </FormProvider>
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* --- CONTENT ARCHITECTURE --- */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row mt-12 sm:mt-20">

                {/* Left Nav: Sticky Categories */}
                <aside className="lg:w-72 p-4 sm:p-6 lg:py-12 lg:sticky lg:top-[140px] h-fit space-y-8">
                    <div className="space-y-1">
                        <p className="text-sm font-black text-gray-400  mb-4">Sectors</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 lg:gap-0 space-y-2">
                            {CATEGORIES.map(cat => (
                                <Button
                                    key={cat.name}
                                    onClick={() => {
                                        setActiveCategory(cat.value);
                                        setPage(1);
                                    }}

                                    variant={activeCategory === cat.value ? 'default' : 'secondary'}
                                >
                                    <div className="flex items-center gap-2">
                                        <cat.icon className={`w-3.5 h-3.5 lg:hidden  `} />
                                        <span className={`text-sm   transition-colors }`}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <ChevronRight className={`w-3 h-3 transition-transform ${activeCategory === cat.value ? 'text-orange translate-x-1' : 'text-gray-200 opacity-0 group-hover:opacity-100'}`} />
                                </Button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Right Content: The Specialist Grid */}
                <main className="flex-1 p-4 sm:p-6 lg:p-12 lg:border-l border-gray-100 dark:border-white/5">
                    {/* Error State */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50">
                            <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                                Failed to load doctors. Please try again.
                            </p>
                        </div>
                    )}
                    <div className="grid grid-cols-1 gap-6 lg:gap-8">
                        {/* Loading State */}
                        {isLoading && (
                            <>
                                {[...Array(6)].map((_, i) => (
                                    <DoctorSkeleton key={i} />
                                ))}
                            </>
                        )}

                        {/* Doctors List */}
                        {!isLoading && (
                            <AnimatePresence mode="popLayout">
                                {doctors.map((doctor: any, i: any) => (
                                    <DoctorCard key={doctor.id} doctor={doctor} i={i} />
                                ))}
                            </AnimatePresence>
                        )}
                    </div>

                    {/* Empty State */}
                    {!isLoading && doctors.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center"
                        >
                            <NoDataFound title="No Doctors Found" description="No doctors found matching your criteria." />
                        </motion.div>
                    )}

                    {/* Pagination */}
                    <div className="mt-10">
                        {!isLoading && doctors.length > 0 && (
                            <AppPagination
                                currentPage={page}
                                totalPages={totalPages}
                                hasPreviousPage={hasPreviousPage}
                                hasNextPage={hasNextPage}
                                onPageChange={setPage}
                                isLoading={isLoading}
                            />
                        )}

                    </div>

                </main>
            </div>

        </div>
    )
}
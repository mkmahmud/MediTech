import { FormField } from "@/components/ui/form-field";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/SelectGroup";
import { SPECIALIZATIONS } from "@/types/doctors";
import { Search, Star } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Toggle } from "@/components/ui/toggle"
import { useState, useEffect } from "react";
import { doctorService } from "@/lib/services/doctorService";
import { useQuery } from "@tanstack/react-query";
import { DoctorSkeleton } from "@/components/skeleton/DoctorCardSkeleton";
import { AppPagination } from "@/components/shared/AppPagination";
import { NoDataFound } from "@/components/shared/NoDataFound";

export default function Appointment() {
    const [page, setPage] = useState(1);
    const methods = useForm({ defaultValues: { search: "" } });
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [activeDays, setActiveDays] = useState<number[]>([]);

    // Watch search field value
    const searchValue = useWatch({
        control: methods.control,
        name: "search"
    });

    // get specialization value
    const specializationValue = useWatch({
        control: methods.control,
        // @ts-ignore
        name: "specialization",

    });

    // Debounce search - only update debounced value after 500ms of no changes
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchValue || "");
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Categorys


    // Handle submit
    const onSubmit = async (data: any) => {
        try {
            console.log(data)
            methods.reset();
        } catch (error) {
        }
    };

    // Get days of week
    const DAYS = [
        { label: "Sat", value: 0 },
        { label: "Sun", value: 1 },
        { label: "Mon", value: 2 },
        { label: "Tue", value: 3 },
        { label: "Wed", value: 4 },
        { label: "Thu", value: 5 },
        { label: "Fri", value: 6 },
    ];
    const handleToggle = (value: number, isPressed: boolean) => {

        setActiveDays((prev) => {
            if (isPressed) {
                return [...prev, value];
            } else {
                return prev.filter((day) => day !== value);
            }
        });
    };


    const { data, isLoading } = useQuery({
        queryKey: ['doctors', debouncedSearch, activeDays, specializationValue, page],
        queryFn: () => {
            const params = {
                page: page,
                limit: 10,
                specialization: specializationValue || undefined,
                days: activeDays.length > 0 ? activeDays : undefined,
                name: debouncedSearch.trim() ? debouncedSearch.trim() : undefined,
            };
            //@ts-ignore
            return doctorService.getAllDoctors(params);
        },
        staleTime: 1000 * 60 * 5,
    });



    return (
        <section className="max-w-7xl mx-auto min-h-screen bg-light-bg dark:bg-dark-bg   dark:text-white selection:bg-orange">
            {/* Appointment page content */}
            <section className="sticky top-24 z-40 px-6 lg:px-12 py-6 bg-light-bg/80 dark:bg-dark-bg/80   dark:border-white/5">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">

                        <div className="max-w-7xl   mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 w-full lg:w-1/2 relative">
                                <FormField name="specialization"  >
                                    <SelectGroup
                                        name="specialization"
                                        icon="role"
                                        options={[{ label: "All", value: "" }, ...SPECIALIZATIONS.map(s => ({ label: s, value: s }))]}
                                        rules={{
                                            required: "User Role is required"
                                        }}
                                    />
                                </FormField>
                            </div>

                            <div className="space-y-4 p-4">
                                <div className="flex   items-center gap-2">
                                    {DAYS.map((day) => (
                                        <Toggle
                                            key={day.value}
                                            variant="outline"
                                            size="lg"
                                            pressed={activeDays.includes(day.value)}
                                            onPressedChange={(pressed) => handleToggle(day.value, pressed)}
                                            className="data-[state=on]:bg-orange data-[state=on]:text-white"
                                        >
                                            {day.label}
                                        </Toggle>
                                    ))}
                                </div>

                            </div>

                            <div className="w-full lg:w-1/2 relative">

                                <InputGroup
                                    name="search"
                                    placeholder="Type Doctor Name (eg, Dr. John Smith)..."
                                    className="rounded-full h-14 bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 px-8     focus:border-orange transition-all"
                                />

                                <Search className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                            </div>
                        </div>
                    </form>

                </FormProvider>
            </section>
            {/* Doctors */}
            <section className=" py-32 px-10 ">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* If Loading */}
                    {isLoading &&
                        Array.from({ length: 4 }).map((_, index) => (
                            <DoctorSkeleton key={index} />
                        ))
                    }
                    {/* If not found any doctor */}
                    {data && data?.data?.length === 0 && (
                        <NoDataFound title="No Doctor Found!" />
                    )}

                    {/* Doctors data */}
                    {
                        data && data?.data?.map((doctor: any) => (
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
                        ))
                    }

                </div>
                {/* Pagination */}
                <AppPagination
                    currentPage={data?.meta?.page || 1}
                    totalPages={data?.meta?.totalPages || 1}
                    hasNextPage={data?.meta?.hasNextPage || false}
                    hasPreviousPage={data?.meta?.hasPreviousPage || false}
                    onPageChange={(newPage) => setPage(newPage)}
                    isLoading={isLoading}
                />
            </section>
        </section>
    )
}

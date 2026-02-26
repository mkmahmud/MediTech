import { useState, useEffect } from 'react';
import {
    Clock, Plus, Trash2, Save, ShieldCheck, AlertCircle, Timer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { doctorService } from '@/lib/services/doctorService';
import { useUserStore } from '@/stores/user/useUserStore';
import type { DoctorAvailability } from '@/types/doctors';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Mapping for Prisma dayOfWeek (0 = Sunday)
const DAYS_LOOKUP = [
    { label: "sunday", value: 0 },
    { label: "monday", value: 1 },
    { label: "tuesday", value: 2 },
    { label: "wednesday", value: 3 },
    { label: "thursday", value: 4 },
    { label: "friday", value: 5 },
    { label: "saturday", value: 6 },
];

export default function ManageAvailability() {
    const clinicalFont = { fontFamily: "'Roboto', sans-serif" };
    const queryClient = useQueryClient();
    const { user } = useUserStore();

    // Local state for the "draft" schedule
    const [availabilities, setAvailabilities] = useState<Partial<DoctorAvailability>[]>([]);

    // 1. Fetching Data
    const { data: serverData, isLoading } = useQuery({
        queryKey: ['availability', user?.id],
        queryFn: () => doctorService.getAvailability(user?.id),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });

    // 2. Hydrate local state from cache/server whenever data changes
    useEffect(() => {
        if (serverData) {
            setAvailabilities(serverData as any);
        }
    }, [serverData]);

    // 3. Mutation for saving changes
    const mutation = useMutation({
        mutationFn: (newSchedule: Partial<DoctorAvailability>[]) => 
            doctorService.setAvailability(user?.id, newSchedule),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['availability', user?.id] });
            toast.success(res.message || "Schedule updated successfully");
        },
        onError: () => {
            toast.error("protocol_sync_failed");
        }
    });

    const toggleDay = (dayValue: number) => {
        const dayExists = availabilities.some(a => a.dayOfWeek === dayValue);
        if (dayExists) {
            setAvailabilities(availabilities.filter(a => a.dayOfWeek !== dayValue));
        } else {
            setAvailabilities([...availabilities, {
                dayOfWeek: dayValue,
                startTime: "09:00",
                endTime: "17:00",
                isAvailable: true
            }]);
        }
    };

    const addSlot = (dayValue: number) => {
        setAvailabilities([...availabilities, {
            dayOfWeek: dayValue,
            startTime: "12:00",
            endTime: "14:00",
            isAvailable: true
        }]);
    };

    const updateTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
        const newAvail = [...availabilities];
        newAvail[index][field] = value;
        setAvailabilities(newAvail);
    };

    const removeSlot = (index: number) => {
        setAvailabilities(availabilities.filter((_, i) => i !== index));
    };

    const handleCommit = () => {
        mutation.mutate(availabilities);
    };

    return (
        <div style={clinicalFont} className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-white/5 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        Availability Schedule
                    </h1>
                    <p className="text-[12px] font-medium text-gray-500 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-orange" />
                        set your weekly availability for patient bookings
                    </p>
                </div>
                <Button
                    onClick={handleCommit}
                    disabled={mutation.isPending}
                    className="bg-orange hover:bg-orange/90 text-white rounded-xl px-6 h-10 flex items-center gap-2 shadow-lg shadow-orange/20"
                >
                    <Save className="w-4 h-4" />
                    {mutation.isPending ? "Saving..." : "Save changes"}
                </Button>
            </header>

            {isLoading && (
                <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                    loading_availability...
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-4">
                    {DAYS_LOOKUP.map((day) => {
                        const daySlots = availabilities.filter(a => a.dayOfWeek === day.value);
                        const isActive = daySlots.length > 0;

                        return (
                            <div
                                key={day.value}
                                className={`group relative bg-white dark:bg-[#080808] border rounded-2xl p-5 transition-all duration-300 ${isActive
                                    ? 'border-gray-200 dark:border-white/10 opacity-100'
                                    : 'border-gray-100 dark:border-white/5 opacity-50'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    <div className="w-32 flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            checked={isActive}
                                            onChange={() => toggleDay(day.value)}
                                            className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange"
                                        />
                                        <span className={`text-sm font-bold capitalize ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                            {day.label}
                                        </span>
                                    </div>

                                    <div className="flex-1 flex flex-wrap gap-3">
                                        {isActive ? (
                                            availabilities.map((slot, globalIdx) => {
                                                if (slot.dayOfWeek !== day.value) return null;
                                                return (
                                                    <div key={globalIdx} className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5 animate-in zoom-in-95">
                                                        <input
                                                            type="time"
                                                            value={slot.startTime}
                                                            onChange={(e) => updateTime(globalIdx, 'startTime', e.target.value)}
                                                            className="bg-transparent text-[12px] font-bold outline-none text-gray-700 dark:text-gray-300"
                                                        />
                                                        <span className="text-gray-400 text-[10px]">—</span>
                                                        <input
                                                            type="time"
                                                            value={slot.endTime}
                                                            onChange={(e) => updateTime(globalIdx, 'endTime', e.target.value)}
                                                            className="bg-transparent text-[12px] font-bold outline-none text-gray-700 dark:text-gray-300"
                                                        />
                                                        <button
                                                            onClick={() => removeSlot(globalIdx)}
                                                            className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <span className="text-[12px] font-medium text-gray-400 italic">offline_status</span>
                                        )}

                                        {isActive && (
                                            <button
                                                onClick={() => addSlot(day.value)}
                                                className="p-2 border border-dashed border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                            >
                                                <Plus className="w-4 h-4 text-orange" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside className="space-y-6">
                    <div className="bg-black dark:bg-white p-6 rounded-[32px] text-white dark:text-black shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <h3 className="text-[11px] font-bold mb-4 flex items-center gap-2 text-orange">
                            <Timer className="w-4 h-4" />
                            session_logic
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] opacity-60">default_duration</span>
                                <span className="text-[12px] font-bold">30_min</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] opacity-60">buffer_period</span>
                                <span className="text-[12px] font-bold">05_min</span>
                            </div>
                            <div className="pt-4 border-t border-white/10 dark:border-black/10">
                                <p className="text-[9px] leading-relaxed opacity-50">
                                    changes to availability will not affect existing confirmed appointments.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border border-gray-100 dark:border-white/5 rounded-[32px] bg-gray-50/50 dark:bg-transparent">
                        <div className="flex items-center gap-3 mb-4 text-orange">
                            <AlertCircle className="w-5 h-5" />
                            <h4 className="text-[11px] font-bold">vacation_mode</h4>
                        </div>
                        <p className="text-[10px] text-gray-500 mb-4 leading-relaxed">
                            temporarily disable all booking channels without clearing your recurring schedule.
                        </p>
                        <Button variant="outline" className="w-full rounded-xl border-orange/20 text-orange text-[10px] font-bold h-8">
                            activate_maintenance
                        </Button>
                    </div>
                </aside>
            </div>
        </div>
    );
}
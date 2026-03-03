import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { Button } from "@/components/ui/button";
import { NoDataFound } from "@/components/shared/NoDataFound";
import { Calendar as DatePicker } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, AlertCircle } from "lucide-react";
import AppointmentCardDoctor from "../AppointmentCardDoctor";
import { AppointmentStatusFilters } from "../ui/AppointmentStatusFilters";
import { type AppFilterStatus } from "@/pages/Dashboard/Appointments/appointmentTypes";

export default function Doctor() {
    const { user } = useAuthStore();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [filterStatus, setFilterStatus] = useState<AppFilterStatus>("all");

    const doctorId = (user as any)?.doctorId || user?.id;

    const formatApiDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    };

    const apiDate = formatApiDate(selectedDate);

    const { data, isLoading } = useQuery({
        queryKey: ["appointments-doctor", doctorId, apiDate],
        queryFn: () => appointmentService.getAppointmentsByDoctorId(doctorId as string, apiDate),
        enabled: !!doctorId,
    });

    const appointments = useMemo(() => {
        const rawData = data ? (Array.isArray(data) ? data : data?.data || []) : [];
        return rawData.map((apt: any) => ({
            ...apt,
            status: apt.status?.toLowerCase() || "scheduled",
        }));
    }, [data]);

    // Filter by status
    const filteredAppointments = useMemo(() => {
        if (filterStatus === "all") return appointments;
        return appointments.filter(
            (apt: any) => apt.status === filterStatus
        );
    }, [appointments, filterStatus]);

    const formatDateForDisplay = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    if (isLoading) {
        return <div className="dark:text-white text-center py-12">Loading your schedule...</div>;
    }

    const hasAppointmentsForSelectedDate = appointments.length > 0;

    return (
        <div className="dark:text-white">


            {/* Step 1: Date Selection */}
            <div className="mb-8 rounded-2xl border p-4 sm:p-5 dark:border-gray-800 dark:bg-gray-900/40">
                <h2 className="text-lg font-black mb-3">Select Date</h2>
                <div className="flex flex-wrap items-center gap-3">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className="h-10 min-w-[280px] justify-start rounded-lg">
                                <Calendar className="mr-2 h-4 w-4" />
                                {formatDateForDisplay(selectedDate)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto rounded-xl p-0" align="start">
                            <DatePicker
                                mode="single"
                                selected={selectedDate}
                                onSelect={(date) => {
                                    if (date) {
                                        setSelectedDate(date);
                                        setFilterStatus("all");
                                    }
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                        Showing for {apiDate}
                    </span>
                </div>
            </div>

            {/* Step 2: Status Filters (only show if date is selected) */}
            {selectedDate && hasAppointmentsForSelectedDate && (
                <>
                    <div className="mb-8">
                        <h2 className="text-lg font-black mb-4">Filter by Status</h2>
                        <AppointmentStatusFilters
                            appointments={appointments}
                            selectedStatus={filterStatus}
                            onStatusChange={setFilterStatus}
                        />
                    </div>

                    {/* Step 3: Appointments for Selected Date */}
                    <div>
                        <h2 className="text-lg font-black mb-4">
                            Appointments for {formatDateForDisplay(selectedDate)}
                        </h2>
                        {filteredAppointments.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                <p className="text-gray-600 dark:text-gray-400">
                                    No appointments {filterStatus !== "all" ? `with status "${filterStatus}" ` : ""}on this date.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredAppointments.map((apt: any) => (
                                    <AppointmentCardDoctor key={apt.id} appointment={apt} />
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {selectedDate && !hasAppointmentsForSelectedDate && (
                <NoDataFound
                    title="No Appointments Scheduled"
                    description={`No appointments found for ${apiDate}.`}
                />
            )}
        </div>
    );
}

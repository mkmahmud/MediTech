import { useState, useMemo } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { AppointmentSkeleton } from "@/pages/Dashboard/Appointments/components/skeleton/AppointmentSkeleton";
import { NoDataFound } from "@/components/shared/NoDataFound";
import AppointmentCard from "../AppointmentCard";
import { AppointmentStatusFilters } from "../ui/AppointmentStatusFilters";
import { type AppFilterStatus } from "@/pages/Dashboard/Appointments/appointmentTypes";

export default function Patient() {
    const { user } = useAuthStore();
    const userRole = user?.role;

    const { data, isLoading } = useQuery({
        queryKey: ["appointments", user?.id, userRole],
        queryFn: async () => {
            return appointmentService.getAppointmentsByPatientId(user?.patientId as string);
        },
        enabled: !!user?.id,
    });


    const [filterStatus, setFilterStatus] = useState<AppFilterStatus>("all");

    const appointments = data
        ? (Array.isArray(data) ? data : data?.data || []).map((apt: any) => ({
            ...apt,
            status: apt.status?.toLowerCase() || "scheduled",
        }))
        : [];

    const filteredAppointments = useMemo(() => {
        if (filterStatus === "all") return appointments;
        return appointments.filter((apt: any) => apt.status === filterStatus);
    }, [filterStatus, appointments]);


    return (
        <div className="dark:text-white">


            {/* Filter Tabs */}
            <AppointmentStatusFilters
                appointments={appointments}
                selectedStatus={filterStatus}
                onStatusChange={setFilterStatus}
                className="flex gap-3 mb-8 flex-wrap"
            />

            {/* Appointments Grid */}
            {isLoading ? (
                <AppointmentSkeleton />
            ) : filteredAppointments.length === 0 ? (
                <NoDataFound title="No Appointments Found" description="No appointments to display." />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredAppointments.map((appointment: any) => (
                        <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                </div>
            )}
        </div>
    );
}

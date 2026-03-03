import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
    APPOINTMENT_FILTER_STATUSES,
    type AppFilterStatus,
} from "@/pages/Dashboard/Appointments/appointmentTypes";

type AppointmentStatusFiltersProps = {
    appointments: Array<{ status?: string | null }>;
    selectedStatus: AppFilterStatus;
    onStatusChange: (status: AppFilterStatus) => void;
    className?: string;
};

const getStatusLabel = (status: AppFilterStatus) =>
    status
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

export function AppointmentStatusFilters({
    appointments,
    selectedStatus,
    onStatusChange,
    className,
}: AppointmentStatusFiltersProps) {
    const countsByStatus = useMemo(() => {
        const counts: Record<AppFilterStatus, number> = {
            all: appointments.length,
            scheduled: 0,
            confirmed: 0,
            in_progress: 0,
            completed: 0,
            cancelled: 0,
            no_show: 0,
            rescheduled: 0,
        };

        appointments.forEach((appointment) => {
            const status = appointment.status?.toLowerCase() as AppFilterStatus | undefined;
            if (status && status in counts) {
                counts[status] += 1;
            }
        });

        return counts;
    }, [appointments]);

    return (
        <div className={className ?? "flex gap-3 flex-wrap"}>
            {APPOINTMENT_FILTER_STATUSES.map((status) => (
                <Button
                    key={status}
                    onClick={() => onStatusChange(status)}
                    variant={selectedStatus === status ? "default" : "secondary"}
                    className="rounded-lg"
                >
                    {getStatusLabel(status)} ({countsByStatus[status]})
                </Button>
            ))}
        </div>
    );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock3, MapPin, Video } from 'lucide-react';
import { Link } from 'react-router';
import CancelAppointment from './CancelAppointment';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { formatDate, formatTime } from '@/lib/utils';
import { GetStatusColor, GetStatusIcon } from './ui/Status';

export default function AppointmentCard({ appointment }: any) {
    const { user } = useAuthStore();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const doctorId = appointment?.doctorId || appointment?.doctor?.id || "";
    const patientId = appointment?.patientId || appointment?.patient?.id || user?.id || "";
    const appointmentId = appointment?.id || appointment?.appointmentId || "";


    return (
        <div
            key={appointment.id}
            className={`border rounded-2xl p-6 transition-all hover:shadow  ${GetStatusColor(appointment.status)}`}
        >
            {/* Header with Status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {GetStatusIcon(appointment.status)}
                    <span className="text-xs font-black capitalize text-dark-bg dark:text-light-bg">
                        {appointment.status}
                    </span>
                </div>
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {appointment.type === "TELEMEDICINE" ? "virtual" : "in-person"}
                </span>
            </div>



            {/* Appointment Details */}
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-orange" />
                    <span className="text-sm font-medium">{formatDate(appointment.scheduledAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock3 className="w-4 h-4 text-orange" />
                    <span className="text-sm font-medium">
                        {formatTime(appointment.scheduledAt)} · {appointment.duration} min
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    {appointment.type === "TELEMEDICINE" ? (
                        <Video className="w-4 h-4 text-orange" />
                    ) : (
                        <MapPin className="w-4 h-4 text-orange" />
                    )}
                    <span className="text-sm font-medium capitalize">
                        {appointment.type === "TELEMEDICINE" ? "video consultation" : "clinic visit"}
                    </span>
                </div>
            </div>

            {/* Chief Complaint */}
            <div className="mb-6">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">reason for visit</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{appointment.chiefComplaint}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                {appointment.type === "TELEMEDICINE" && appointment.status === "scheduled" && (
                    <Button variant="default"  >
                        <Video className="w-4 h-4 mr-2" />
                        join call
                    </Button>
                )}
                {(appointment.status === "scheduled" || appointment.status === "confirmed" || appointment.status === "rescheduled") && (
                    <>
                        <Button variant="secondary"  >
                            reschedule
                        </Button>
                        <Button variant="denger" onClick={() => setIsCancelModalOpen(true)}>
                            cancel
                        </Button>
                    </>
                )}

                <Button variant="destructive"  >
                    <Link to={`/dashboard/appointments/${appointment.id}`}>
                        view details
                    </Link>
                </Button>


                {(appointment.status === "completed" || appointment.status === "no_show") && (
                    <>

                        <Button variant="secondary" >
                            reschedule
                        </Button>
                    </>
                )}
            </div>

            {/* Cancel Appointment Modal */}
            <CancelAppointment
                open={isCancelModalOpen}
                onOpenChange={setIsCancelModalOpen}
                doctorId={doctorId}
                patientId={patientId}
                appointmentId={appointmentId}
            />
        </div>
    )
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calendar, CheckCircle, Clock3, MapPin, Video, XCircle } from 'lucide-react';
import { Link } from 'react-router';
import CancelAppointment from './CancelAppointment';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export default function AppointmentCard({ appointment }: any) {
    const { user } = useAuthStore();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const doctorId = appointment?.doctorId || appointment?.doctor?.id || "";
    const patientId = appointment?.patientId || appointment?.patient?.id || user?.id || "";
    const appointmentId = appointment?.id || appointment?.appointmentId || "";


    const getStatusColor = (status: string) => {
        switch (status) {
            case "scheduled":
                return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800";
            case "confirmed":
                return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
            case "in_progress":
                return "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800";
            case "completed":
                return "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800";
            case "cancelled":
                return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
            case "no_show":
                return "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800";
            case "rescheduled":
                return "bg-cyan-50 dark:bg-cyan-950 border-cyan-200 dark:border-cyan-800";
            default:
                return "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "scheduled":
                return <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
            case "confirmed":
                return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />;
            case "in_progress":
                return <Clock3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
            case "completed":
                return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
            case "cancelled":
                return <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />;
            case "no_show":
                return <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />;
            case "rescheduled":
                return <AlertCircle className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />;
            default:
                return null;
        }
    };



    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatTime = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div
            key={appointment.id}
            className={`border rounded-2xl p-6 transition-all hover:shadow  ${getStatusColor(appointment.status)}`}
        >
            {/* Header with Status */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    {getStatusIcon(appointment.status)}
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

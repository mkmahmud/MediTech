import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Clock3,
    MapPin,
    User,
    Video,
    XCircle,
    Mail,
    Phone,
    Droplet,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import CancelAppointment from "./CancelAppointment";
import type { AppointmentDetails } from "../appointmentTypes";
import { formatTime } from "@/lib/utils";
import { GetStatusColor, GetStatusIcon } from "./ui/Status";


interface AppointmentCardDoctorProps {
    appointment: AppointmentDetails;
}

export default function AppointmentCardDoctor({
    appointment,
}: AppointmentCardDoctorProps) {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

    const doctorId = appointment?.doctorId || (user as any)?.doctorId || user?.id || "";
    const patientId = appointment?.patientId || "";
    const appointmentId = appointment?.id || "";




    const patientName = appointment.patient?.user
        ? `${appointment.patient.user.firstName} ${appointment.patient.user.lastName}`
        : "Unknown Patient";

    return (
        <>
            <div
                className={`group relative border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl   ${GetStatusColor(
                    appointment.status
                )} overflow-hidden`}
            >
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Header Section */}
                <div className="relative flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                            {GetStatusIcon(appointment.status)}
                        </div>
                        <div>
                            <span className="text-xs font-black uppercase tracking-wide text-dark-bg dark:text-light-bg">
                                {appointment.status.replace("_", " ")}
                            </span>
                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                                ID: {appointment.id.slice(0, 8)}...
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                            {appointment.type === "TELEMEDICINE" ? (
                                <>
                                    <Video className="w-3 h-3" />
                                    virtual
                                </>
                            ) : (
                                <>
                                    <MapPin className="w-3 h-3" />
                                    in-person
                                </>
                            )}
                        </span>
                    </div>
                </div>

                {/* Patient Information - Enhanced */}
                <div className="relative mb-5 p-4 rounded-xl bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm border border-white/60 dark:border-gray-700/50">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                            {appointment.patient?.user?.profileImageUrl ? (
                                <img
                                    src={appointment.patient.user.profileImageUrl}
                                    alt={patientName}
                                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/80 dark:ring-gray-700/80"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange/20 to-orange/10 ring-4 ring-white/80 dark:ring-gray-700/80 flex items-center justify-center">
                                    <User className="w-8 h-8 text-orange" />
                                </div>
                            )}
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1 truncate">
                                {patientName}
                            </h3>
                            <div className="space-y-1">
                                {appointment.patient?.user?.email && (
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <Mail className="w-3 h-3 flex-shrink-0" />
                                        <span className="truncate">{appointment.patient.user.email}</span>
                                    </div>
                                )}
                                {appointment.patient?.user?.phoneNumber && (
                                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <Phone className="w-3 h-3 flex-shrink-0" />
                                        <span>{appointment.patient.user.phoneNumber}</span>
                                    </div>
                                )}
                                {appointment.patient?.bloodType && (
                                    <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400">
                                        <Droplet className="w-3 h-3 flex-shrink-0" />
                                        <span>Blood: {appointment.patient.bloodType}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointment Details Grid */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/40 dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-700/30">
                        <div className="p-2 rounded-lg bg-orange/10">
                            <Clock3 className="w-4 h-4 text-orange" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Time</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {formatTime(appointment.scheduledAt)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/40 dark:bg-gray-800/20 border border-gray-200/50 dark:border-gray-700/30">
                        <div className="p-2 rounded-lg bg-orange/10">
                            <Calendar className="w-4 h-4 text-orange" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Duration</p>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">
                                {appointment.duration} min
                            </p>
                        </div>
                    </div>
                </div>

                {/* Chief Complaint */}
                {appointment.chiefComplaint && (
                    <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-100 dark:border-blue-900/30">
                        <p className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                            Chief Complaint
                        </p>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                            {appointment.chiefComplaint}
                        </p>
                    </div>
                )}

                {/* Action Buttons - Enhanced */}
                <div className="flex flex-wrap gap-2.5">
                    {appointment.type === "TELEMEDICINE" &&
                        (appointment.status === "scheduled" ||
                            appointment.status === "confirmed") &&
                        appointment.meetingUrl && (
                            <Button

                                variant="default"

                                onClick={() =>
                                    window.open(appointment.meetingUrl!, "_blank")
                                }
                            >
                                <Video className="w-4 h-4 mr-1.5" />
                                join call
                            </Button>
                        )}

                    <Button

                        variant="secondary"

                        onClick={() => navigate(`/dashboard/appointments/${appointment.id}`)}
                    >
                        view details
                    </Button>

                    {(appointment.status === "scheduled" ||
                        appointment.status === "confirmed") && (
                            <>

                                <Button

                                    variant="denger"

                                    onClick={() => setIsCancelModalOpen(true)}
                                >
                                    <XCircle className="w-3.5 h-3.5 mr-1.5" />
                                    cancel
                                </Button>
                            </>
                        )}
                </div>
            </div>

            {/* Cancel Appointment Modal */}
            <CancelAppointment
                open={isCancelModalOpen}
                onOpenChange={setIsCancelModalOpen}
                doctorId={doctorId}
                patientId={patientId}
                appointmentId={appointmentId}
            />
        </>
    );
}

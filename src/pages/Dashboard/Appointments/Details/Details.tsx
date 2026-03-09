import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { Button } from "@/components/ui/button";
import { NoDataFound } from "@/components/shared/NoDataFound";
import { Calendar, ChevronLeft, Clock, MapPin, Video } from "lucide-react";
import type { AppointmentDetails } from "../appointmentTypes";
import { formatDate, formatTime } from "@/lib/utils";
import { StatusStyle } from "../components/ui/Status";
import CompleteAppointment from "../components/CompleteAppointment";

const formatStatus = (status: string) => status.replaceAll("_", " ");

const fullName = (firstName?: string | null, lastName?: string | null) =>
    `${firstName || ""} ${lastName || ""}`.trim() || "N/A";

export default function Details() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuthStore();
    const role = user?.role;
    const [completeModalOpen, setCompleteModalOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["appointment-details", id],
        queryFn: () => appointmentService.getAppointmentDetailsById(id as string),
        enabled: !!id,
    });

    const appointment: AppointmentDetails | undefined =
        (data?.data || data) as AppointmentDetails | undefined;

    if (isLoading) {
        return <div className="dark:text-white">Loading appointment details...</div>;
    }

    if (!appointment) {
        return (
            <NoDataFound
                title="Appointment Not Found"
                description="No appointment details available for this record."
            />
        );
    }

    const normalizedStatus = appointment.status?.toLowerCase() || "scheduled";
    const isPatient = role === "PATIENT";
    const isDoctor = role === "DOCTOR";
    const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
    const doctorId = (user as any)?.doctorId || user?.id;

    return (
        <div className="dark:text-white min-h-screen">
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 mb-4 font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Appointments
                </button>
                <h1 className="text-4xl font-black mb-2">Appointment Details</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className={`rounded-2xl p-6 border ${StatusStyle(normalizedStatus)}`}>
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium opacity-75">Appointment Status</p>
                                <h2 className="text-2xl font-black capitalize">{formatStatus(normalizedStatus)}</h2>
                            </div>
                            <span className="px-4 py-2 bg-white/20 dark:bg-white/10 rounded-full text-sm font-medium capitalize">
                                {appointment.type === "TELEMEDICINE" ? "virtual" : "in-person"}
                            </span>
                        </div>
                    </div>

                    {isPatient && (
                        <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                            <h3 className="text-lg font-black mb-4">Doctor Information</h3>
                            <div className="flex items-center justify-between gap-6">
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">Name:</span> {fullName(appointment.doctor?.user?.firstName, appointment.doctor?.user?.lastName)}</p>
                                    <p><span className="font-semibold">Specialization:</span> {appointment.doctor?.specialization || "N/A"}</p>
                                    <p><span className="font-semibold">Email:</span> {appointment.doctor?.user?.email || "N/A"}</p>
                                    <p><span className="font-semibold">Phone:</span> {appointment.doctor?.user?.phoneNumber || "N/A"}</p>
                                </div>
                                <div className="shrink-0">
                                    <img
                                        src={appointment.doctor?.user?.profileImageUrl || "/placeholder.png"}
                                        alt="Doctor"
                                        className="w-20 h-20 object-cover rounded-xl border dark:border-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {isDoctor && (
                        <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                            <h3 className="text-lg font-black mb-4">Patient Information</h3>
                            <div className="flex items-center justify-between gap-6">
                                <div className="space-y-2 text-sm">
                                    <p><span className="font-semibold">Name:</span> {fullName(appointment.patient?.user?.firstName, appointment.patient?.user?.lastName)}</p>
                                    <p><span className="font-semibold">Email:</span> {appointment.patient?.user?.email || "N/A"}</p>
                                    <p><span className="font-semibold">Phone:</span> {appointment.patient?.user?.phoneNumber || "N/A"}</p>
                                    <p><span className="font-semibold">Blood Type:</span> {appointment.patient?.bloodType || "N/A"}</p>
                                </div>
                                <div className="shrink-0">
                                    <img
                                        src={appointment.patient?.user?.profileImageUrl || "/placeholder.png"}
                                        alt="Patient"
                                        className="w-20 h-20 object-cover rounded-xl border dark:border-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {isAdmin && (
                        <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                            <h3 className="text-lg font-black mb-4">Doctor & Patient</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="font-semibold mb-1">Doctor</p>
                                    <p>{fullName(appointment.doctor?.user?.firstName, appointment.doctor?.user?.lastName)}</p>
                                    <p>{appointment.doctor?.specialization || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="font-semibold mb-1">Patient</p>
                                    <p>{fullName(appointment.patient?.user?.firstName, appointment.patient?.user?.lastName)}</p>
                                    <p>{appointment.patient?.user?.email || "N/A"}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black mb-4">Date & Time</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-orange" /><span>{formatDate(appointment.scheduledAt)}</span></div>
                            <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-orange" /><span>{formatTime(appointment.scheduledAt)} · {appointment.duration} min</span></div>
                            <div className="flex items-center gap-3">
                                {appointment.type === "TELEMEDICINE" ? <Video className="w-4 h-4 text-orange" /> : <MapPin className="w-4 h-4 text-orange" />}
                                <span>{appointment.type === "TELEMEDICINE" ? "Video consultation" : "Clinic visit"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black mb-4">Chief Complaint</h3>
                        <p>{appointment.chiefComplaint || "N/A"}</p>
                    </div>

                    <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black mb-4">Clinical Notes</h3>
                        <p>{appointment.notes || "N/A"}</p>
                    </div>

                    <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black mb-4">Diagnosis</h3>
                        <p>{appointment.diagnosis || "N/A"}</p>
                    </div>

                    {normalizedStatus === "cancelled" && (
                        <div className="border rounded-2xl p-6 border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-red-950/20">
                            <h3 className="text-lg font-black mb-2 text-red-700 dark:text-red-300">Cancellation Reason</h3>
                            <p className="text-red-700 dark:text-red-300">{appointment.cancellationReason || "N/A"}</p>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                        <h3 className="text-lg font-black mb-4">Quick Info</h3>
                        <div className="space-y-2 text-sm">
                            <p><span className="font-semibold">Created:</span> {formatDate(appointment.createdAt)}</p>
                            <p><span className="font-semibold">Fee:</span> ${appointment.doctor?.consultationFee ?? "N/A"}</p>
                        </div>
                    </div>

                    {appointment.type === "TELEMEDICINE" && (
                        <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                            <h3 className="text-lg font-black mb-4">Meeting</h3>
                            {appointment.meetingUrl ? (
                                <Button asChild className="w-full">
                                    <a href={appointment.meetingUrl} target="_blank" rel="noreferrer">Join Meeting</a>
                                </Button>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">Meeting URL not available.</p>
                            )}
                        </div>
                    )}

                    {isDoctor && normalizedStatus === "confirmed" && (
                        <div className="border rounded-2xl p-6 dark:border-gray-800 dark:bg-gray-800/50">
                            <h3 className="text-lg font-black mb-4">Actions</h3>
                            <Button 
                                onClick={() => setCompleteModalOpen(true)}
                                className="w-full"
                            >
                            Prescription & Complete Appointment
                            </Button>
                        </div>
                    )}

                </div>
            </div>

            <CompleteAppointment
                open={completeModalOpen}
                onOpenChange={setCompleteModalOpen}
                doctorId={doctorId}
                appointmentId={appointment.id}
                // @ts-ignore
                patientId={appointment.patientId || appointment.patient?.id || ""}
            />
        </div>
    );
}


export type AppointmentDetails = {
    id: string;
    patientId: string;
    doctorId: string;
    scheduledAt: string;
    duration: number;
    type: "TELEMEDICINE" | "IN_PERSON";
    status: string;
    chiefComplaint: string | null;
    notes: string | null;
    diagnosis: string | null;
    meetingUrl: string | null;
    cancellationReason: string | null;
    createdAt: string;
    doctor?: {
        specialization?: string | null;
        consultationFee?: number | null;
        user?: {
            firstName?: string | null;
            lastName?: string | null;
            email?: string | null;
            phoneNumber?: string | null;
            profileImageUrl?: string | null;
        };
    };
    patient?: {
        bloodType?: string | null;
        user?: {
            firstName?: string | null;
            lastName?: string | null;
            email?: string | null;
            phoneNumber?: string | null;
            profileImageUrl?: string | null;
            gender?: string | null;
            dateOfBirth?: string | null;
        };
    };
};

export const APPOINTMENT_FILTER_STATUSES = [
    "all",
    "scheduled",
    "confirmed",
    "in_progress",
    "completed",
    "cancelled",
    "no_show",
    "rescheduled",
] as const;

export type AppFilterStatus = (typeof APPOINTMENT_FILTER_STATUSES)[number];

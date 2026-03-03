
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

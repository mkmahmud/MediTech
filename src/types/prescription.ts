export interface PrescriptionMedication {
    medicationName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions?: string;
    refillsAllowed?: number;
}

export interface CreatePrescriptionPayload {
    patientId: string;
    doctorId: string;
    medications: PrescriptionMedication[];
    notes?: string;
    expiresAt?: string;
}

export interface Prescription {
    id: string;
    patientId: string;
    doctorId: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";
    issuedAt: string;
    expiresAt?: string;
    doctorSignature?: string;
    signedAt?: string;
    medications: PrescriptionMedication[];
    notes?: string;
    sentToPharmacy: boolean;
    sentAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetPrescriptionsQuery {
    patientId?: string;
    doctorId?: string;
    status?: "ACTIVE" | "COMPLETED" | "CANCELLED" | "EXPIRED";
    limit?: number;
    offset?: number;
}

export interface GetPrescriptionsResponse {
    data: Prescription[];
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
}

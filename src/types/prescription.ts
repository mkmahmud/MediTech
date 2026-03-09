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
    status: "ACTIVE" | "EXPIRED" | "REVOKED";
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

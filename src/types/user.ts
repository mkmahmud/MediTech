export type UserRole = "SUPER_ADMIN" | "ADMIN" | "DOCTOR" | "NURSE" | "PATIENT" | "PHARMACIST" | "LAB_TECHNICIAN" | "RECEPTIONIST";
export type UserStatus = "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED" | "DEACTIVATED";

export interface DoctorProfile {
    licenseNumber: string;
    specialization: string;
    qualifications: string[];
    experience: number;
    consultationFee: number;
}

export interface PatientProfile {
    bloodType: string | null;
    height: number | null;
    weight: number | null;
    emergencyContactName: string | null;
    emergencyContactPhone: string | null;
}

export interface User {
    id: string;
    email: string;
    username: string | null;
    role: UserRole;
    status: UserStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    profileImageUrl: string | null;
    emailVerified: boolean;
    twoFactorEnabled: boolean;
    lastLogin: string | null;
    // Relationships
    doctor?: DoctorProfile | null;
    patient?: PatientProfile | null;
}
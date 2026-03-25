import type { UserStatus } from "./user";

export interface PatientDetails {
    id: string;
    userId: string;
    bloodType: string | null;
    height: number | null;
    weight: number | null;
    emergencyContactName: string | null;
    emergencyContactPhone: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface NotificationDetails {
    id: string;
    userId: string;
    type: string;
    title: string;
    message: string;
    data: any;
    read: boolean;
    readAt: string | null;
    scheduledFor: string | null;
    sentAt: string | null;
    createdAt: string;
}


export interface UserDetails {
    id: string;
    email: string;
    username: string | null;
    role: string;
    status: UserStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    profileImageUrl: string | null;
    emailVerified: boolean;
    phoneVerified: boolean;
    twoFactorEnabled: boolean;
    twoFactorSecret: string | null;
    lastLogin: string | null;
    failedLoginAttempts: number;
    accountLockedUntil: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    patient: PatientDetails | null;
    doctor: any;
    refreshTokens: any[];
    auditLogs: any[];
    notifications: NotificationDetails[];
}

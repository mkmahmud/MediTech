export type Specialization =
    | "DERMATOLOGY" | "PEDIATRICS" | "NEUROLOGY"
    | "ORTHOPEDICS" | "PSYCHIATRY" | "GENERAL_PRACTICE"
    | "GYNECOLOGY" | "OPHTHALMOLOGY" | "ONCOLOGY"
    | "CARDIOLOGY"; // Added for completeness

// Use 'as const' to make the array immutable and strictly typed
export const SPECIALIZATIONS: Specialization[] = [
    "CARDIOLOGY", "DERMATOLOGY", "PEDIATRICS", "NEUROLOGY",
    "ORTHOPEDICS", "PSYCHIATRY", "GENERAL_PRACTICE",
    "GYNECOLOGY", "OPHTHALMOLOGY", "ONCOLOGY"
];

export interface DoctorAvailability {
    id: string;
    doctorId: number;
    dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
    startTime: string; // "HH:mm" format
    endTime: string;   // "HH:mm" format
    isAvailable: boolean;
    doctor: any
}
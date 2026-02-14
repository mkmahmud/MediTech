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
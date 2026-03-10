import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address format"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
    rememberMe: z.boolean(),
});

export const registerSchema = z.object({
    fullName: z
        .string()
        .min(1, "Full name is required")
        .min(2, "Full name must be at least 2 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address format"),
    countryCode: z
        .string()
        .min(1, "Country code is required"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^\d{7,}$/, "Phone number must be at least 7 digits"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    agreeToTerms: z
        .boolean()
        .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

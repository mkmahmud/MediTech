import { z } from "zod";

export const PaymentProviderSchema = z.enum(["STRIPE", "PAYPAL", "CARD"]);
export const PaymentMethodSchema = z.enum(["CARD"]);
export const PaymentTypeSchema = z.enum([
    "APPOINTMENT_FEE",
    "LAB_TEST_FEE",
    "MEDICINE_FEE",
    "CONSULTATION_FEE",
    "PROCEDURE_FEE",
    "OTHER",
]);

export const CardFormSchema = z.object({
    cardNumber: z
        .string()
        .min(13, "Card number must be at least 13 digits")
        .max(19, "Card number must be at most 19 digits")
        .regex(/^[0-9]+$/, "Card number must contain only digits"),
    cardholderName: z.string().min(2, "Cardholder name is required").max(100),
    expiryMonth: z.number().min(1).max(12),
    expiryYear: z.number().min(new Date().getFullYear(), "Card is expired"),
    cvv: z.string().regex(/^[0-9]{3,4}$/, "CVV must be 3 or 4 digits"),
    description: z.string().max(500).optional(),
});

export type CardFormValues = z.infer<typeof CardFormSchema>;

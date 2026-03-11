import api from "../../api";

export type PaymentType =
    | "APPOINTMENT_FEE"
    | "LAB_TEST_FEE"
    | "MEDICINE_FEE"
    | "CONSULTATION_FEE"
    | "PROCEDURE_FEE"
    | "OTHER";

export type PaymentMethod = "CARD";
export type PaymentProvider = "STRIPE" | "PAYPAL" | "CARD";

export type CardInput = {
    cardNumber: string;
    cardholderName: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
};

export type CreatePaymentPayload = {
    amount: number;
    currency: string;
    paymentType: PaymentType;
    provider: PaymentProvider;
    method: PaymentMethod;
    appointmentId?: string;
    prescriptionId?: string;
    labTestId?: string;
    card?: CardInput;
    paypalEmail?: string;
    description?: string;
    idempotencyKey: string;
};

export type PaymentDetails = {
    id: string;
    patientId: string;
    appointmentId?: string | null;
    amount: number;
    currency: string;
    status: string;
    method: string;
    provider: string;
    paymentType: string;
    transactionId?: string | null;
    invoiceNumber: string;
    invoiceUrl?: string | null;
    cardLastFour?: string | null;
    cardBrand?: string | null;
    totalRefunded: number;
    description?: string | null;
    paidAt?: string | null;
    failedAt?: string | null;
    createdAt: string;
    updatedAt: string;
    paymentUrl?: string | null;
    checkoutUrl?: string | null;
    clientSecret?: string | null;
    expiresAt?: string | null;
};

type ApiResponse<T> = {
    statusCode: number;
    message?: string;
    data: T;
};

export const paymentService = {
    createPayment: async (payload: CreatePaymentPayload) => {
        const response = await api.post<ApiResponse<PaymentDetails>>("/payments/create", payload);
        return response.data;
    },

    getPaymentDetails: async (paymentId: string) => {
        const response = await api.get<ApiResponse<PaymentDetails>>(`/payments/${paymentId}`);
        return response.data;
    },

    getPaymentsList: async (query?: {
        page?: number;
        limit?: number;
        status?: string;
        type?: string;
        provider?: string;
    }) => {
        const response = await api.get<ApiResponse<any>>("/payments", { params: query });
        return response.data;
    },
};
import { create } from "zustand";

type PaymentFlowContext = {
    appointmentId: string;
    amount: number;
    currency: string;
    paymentType: "APPOINTMENT_FEE";
};

type PaymentStore = {
    context: PaymentFlowContext | null;
    selectedProvider: "STRIPE" | "PAYPAL" | "CARD";
    lastPaymentId: string | null;
    setContext: (payload: PaymentFlowContext) => void;
    setProvider: (provider: "STRIPE" | "PAYPAL" | "CARD") => void;
    setLastPaymentId: (paymentId: string | null) => void;
    reset: () => void;
};

export const usePaymentStore = create<PaymentStore>((set) => ({
    context: null,
    selectedProvider: "STRIPE",
    lastPaymentId: null,
    setContext: (payload) => set({ context: payload }),
    setProvider: (provider) => set({ selectedProvider: provider }),
    setLastPaymentId: (paymentId) => set({ lastPaymentId: paymentId }),
    reset: () => set({ context: null, selectedProvider: "STRIPE" }),
}));

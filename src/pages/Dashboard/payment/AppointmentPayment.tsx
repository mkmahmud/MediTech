import { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import { InputGroup } from "@/components/ui/input-group";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { paymentService } from "@/lib/services/payment/paymentService";
import { formatDate, formatTime } from "@/lib/utils";
import { CardFormSchema, type CardFormValues } from "./paymentSchemas";
import { usePaymentStore } from "@/stores/payment/usePaymentStore";
import {
    HeartHandshake, ShieldCheck, Lock, CreditCard,
    Calendar, Clock3, User, ArrowLeft, Loader2, CheckCircle2
} from "lucide-react";

const createIdempotencyKey = (): string => {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

type Provider = "STRIPE" | "CARD";

export default function AppointmentPayment() {
    const { appointmentId = "" } = useParams();
    const navigate = useNavigate();
    const { setContext, setLastPaymentId } = usePaymentStore();
    const [selectedProvider, setSelectedProvider] = useState<Provider>("STRIPE");

    const { data, isLoading } = useQuery({
        queryKey: ["appointment-payment-context", appointmentId],
        queryFn: () => appointmentService.getAppointmentDetailsById(appointmentId),
        enabled: Boolean(appointmentId),
    });

    const appointment = (data?.data || data) as any;

    const paymentContext = useMemo(() => {
        const amount = Number(appointment?.doctor?.consultationFee ?? 0);
        return { appointmentId, amount, currency: "USD", paymentType: "APPOINTMENT_FEE" as const };
    }, [appointment?.doctor?.consultationFee, appointmentId]);

    const methods = useForm<CardFormValues>({
        resolver: zodResolver(CardFormSchema),
        mode: "onBlur",
        defaultValues: {
            cardNumber: "",
            cardholderName: "",
            expiryMonth: new Date().getMonth() + 1,
            expiryYear: new Date().getFullYear(),
            cvv: "",
            description: "",
        },
    });

    const { mutate: initiateStripePayment, isPending: isStripePending } = useMutation({
        mutationFn: async () => {
            if (!paymentContext.amount || paymentContext.amount <= 0)
                throw new Error("Appointment fee is not available.");
            return paymentService.createPayment({
                amount: paymentContext.amount,
                currency: paymentContext.currency,
                provider: "STRIPE",
                paymentType: paymentContext.paymentType,
                method: "CARD",
                appointmentId: paymentContext.appointmentId,
                idempotencyKey: createIdempotencyKey(),
            });
        },
        onSuccess: (response) => {
            // @ts-ignore
            const payment = response?.data;
            const checkoutUrl = payment?.checkoutUrl || payment?.paymentUrl;
            if (!payment?.id || !checkoutUrl) {
                toast.error("Stripe checkout URL missing from response.");
                return;
            }
            setContext(paymentContext);
            setLastPaymentId(payment.id);
            // Persist across the full-page Stripe redirect (Zustand is lost)
            sessionStorage.setItem("pending_payment_id", payment.id);
            sessionStorage.setItem("pending_appointment_id", paymentContext.appointmentId);
            window.location.assign(checkoutUrl);
        },
        onError: (error: any) => toast.error(error?.message || "Failed to initiate Stripe payment"),
    });

    const { mutate: submitCardPayment, isPending: isCardPending } = useMutation({
        mutationFn: async (values: CardFormValues) => {
            if (!paymentContext.amount || paymentContext.amount <= 0)
                throw new Error("Appointment fee is not available.");
            return paymentService.createPayment({
                amount: paymentContext.amount,
                currency: paymentContext.currency,
                paymentType: paymentContext.paymentType,
                provider: "CARD",
                method: "CARD",
                appointmentId: paymentContext.appointmentId,
                card: {
                    cardNumber: values.cardNumber,
                    cardholderName: values.cardholderName,
                    expiryMonth: values.expiryMonth,
                    expiryYear: values.expiryYear,
                    cvv: values.cvv,
                },
                description: values.description,
                idempotencyKey: createIdempotencyKey(),
            });
        },
        onSuccess: (response) => {
            // @ts-ignore
            const payment = response?.data;
            if (!payment?.id) { toast.error("Payment ID missing from response"); return; }
            setContext(paymentContext);
            setLastPaymentId(payment.id);
            // @ts-ignore
            toast.success(response?.message || "Payment processed successfully");
            navigate(`/payments/success?paymentId=${payment.id}`);
        },
        onError: (error: any) => toast.error(error?.message || "Failed to process card payment"),
    });

    const isScheduled = String(appointment?.status || "").toLowerCase() === "scheduled";
    const doctorName = appointment?.doctor?.user
        ? `Dr. ${appointment.doctor.user.firstName || ""} ${appointment.doctor.user.lastName || ""}`.trim()
        : "Your Doctor";

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#030303] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-gray-500 dark:text-gray-400">
                    <div className="w-10 h-10 bg-orange flex items-center justify-center rounded-xl">
                        <HeartHandshake className="w-6 h-6 text-white" />
                    </div>
                    <Loader2 className="w-5 h-5 animate-spin text-orange" />
                    <p className="text-sm font-medium">Loading payment details...</p>
                </div>
            </div>
        );
    }

    if (!appointment?.id) {
        return (
            <div className="min-h-screen bg-white dark:bg-[#030303] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-black dark:text-white">Appointment Not Found</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We couldn't load your appointment details.</p>
                    <Button onClick={() => navigate("/dashboard/appointments")}>
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Appointments
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#030303]">
            {/* ─── LEFT PANEL ─── */}
            <div className="relative lg:w-[42%] bg-black/90 flex flex-col justify-between p-8 lg:p-14 min-h-[360px] lg:min-h-screen overflow-hidden">
                {/* bg image */}

                {/* grid overlay */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

                {/* Logo */}
                <div className="relative z-10 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <div className="bg-orange p-1.5 rounded-lg">
                            <HeartHandshake className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter">
                            Medi<span className="text-orange">.</span>
                        </span>
                    </Link>
                    <Link to="/dashboard/appointments"
                        className="flex items-center gap-2 text-white/50 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />Back
                    </Link>
                </div>

                {/* Main copy */}
                <div className="relative z-10 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-orange animate-pulse" />
                        <span className="text-xs font-mono font-black text-white">Secure Payment</span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                        Confirm<br />
                        <span className="text-orange text-4xl lg:text-5xl">Your_Appt.</span>
                    </h1>

                    <p className="text-white/50 text-sm max-w-xs leading-relaxed font-medium">
                        Complete payment to lock in your consultation with {doctorName}. All transactions are encrypted end-to-end.
                    </p>

                    {/* Appointment summary card */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-sm">
                        <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Appointment_Details</p>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                            <Calendar className="w-4 h-4 text-orange shrink-0" />
                            <span className="font-medium">{formatDate(appointment.scheduledAt)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                            <Clock3 className="w-4 h-4 text-orange shrink-0" />
                            <span className="font-medium">{formatTime(appointment.scheduledAt)} · {appointment.duration} min</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/80">
                            <User className="w-4 h-4 text-orange shrink-0" />
                            <span className="font-medium">{doctorName}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                            <span className="  text-white ">Total Due</span>
                            <span className="text-2xl font-black text-white">
                                ${paymentContext.amount > 0 ? paymentContext.amount.toFixed(2) : "—"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer trust indicators */}
                <div className="relative z-10 flex gap-8 border-t border-white/10 pt-6">
                    <div className="space-y-1">
                        <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Security</p>
                        <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3 text-orange" /> AES-256
                        </p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Gateway</p>
                        <p className="text-xs font-bold text-white uppercase flex items-center gap-2">
                            <Lock className="w-3 h-3 text-orange" /> PCI-DSS
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── RIGHT PANEL ─── */}
            <div className="lg:w-[58%] flex items-center justify-center p-6 lg:p-14 bg-gray-50 dark:bg-[#030303]">
                <div className="w-full max-w-lg space-y-8">
                    <div className="space-y-1">
                        <h2 className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white uppercase">
                            Choose Payment
                        </h2>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            Select a method to complete your appointment fee
                        </p>
                    </div>

                    {!isScheduled && (
                        <div className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-4">
                            <p className="text-sm font-bold text-red-600 dark:text-red-400">
                                This appointment is not in scheduled state. Payment can only be made for scheduled appointments.
                            </p>
                        </div>
                    )}

                    {/* Provider selector */}
                    <div className="grid grid-cols-3 gap-3">
                        {/* Stripe */}
                        <button
                            type="button"
                            disabled={!isScheduled}
                            onClick={() => setSelectedProvider("STRIPE")}
                            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                                ${selectedProvider === "STRIPE"
                                    ? "border-orange bg-orange/5 dark:bg-orange/10"
                                    : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20"
                                }`}
                        >
                            {selectedProvider === "STRIPE" && (
                                <span className="absolute top-2 right-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-orange" />
                                </span>
                            )}
                            <span className="text-2xl">⚡</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">Stripe</span>
                        </button>

                        {/* PayPal - disabled */}
                        <button
                            type="button"
                            disabled
                            className="relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] opacity-40 cursor-not-allowed"
                        >
                            <span className="text-2xl">🅿️</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">PayPal</span>
                            <span className="absolute -top-1 -right-1 bg-gray-400 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">Soon</span>
                        </button>

                        {/* Card */}
                        <button
                            type="button"
                            disabled
                            onClick={() => setSelectedProvider("CARD")}
                            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                                ${selectedProvider === "CARD"
                                    ? "border-orange bg-orange/5 dark:bg-orange/10"
                                    : "border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/20"
                                }`}
                        >
                            {selectedProvider === "CARD" && (
                                <span className="absolute top-2 right-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-orange" />
                                </span>
                            )}
                            <CreditCard className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-700 dark:text-gray-300">Card</span>
                        </button>
                    </div>

                    {/* ── Stripe section ── */}
                    {selectedProvider === "STRIPE" && (
                        <motion.div
                            key="stripe"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                            className="space-y-5"
                        >
                            <div className="rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-5 space-y-3">
                                <p className="  font-mono text-gray-400  font-black">What happens next</p>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 font-medium">
                                    <li className="flex items-start gap-2"><span className="text-orange mt-0.5">→</span> You'll be redirected to Stripe's secure checkout page</li>
                                    <li className="flex items-start gap-2"><span className="text-orange mt-0.5">→</span> Enter your card details directly on Stripe's encrypted form</li>
                                    <li className="flex items-start gap-2"><span className="text-orange mt-0.5">→</span> After payment, you'll be returned here automatically</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-4 flex items-center justify-between">
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Appointment Fee</span>
                                <span className="text-xl font-black text-gray-900 dark:text-white">
                                    ${paymentContext.amount > 0 ? paymentContext.amount.toFixed(2) : "—"} USD
                                </span>
                            </div>

                            <Button
                                onClick={() => initiateStripePayment()}
                                disabled={isStripePending || !isScheduled}
                                className="w-full h-14 rounded-2xl  font-medium   "
                            >
                                {isStripePending
                                    ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Redirecting to Stripe...</>
                                    : <>  &nbsp;Continue to Stripe Checkout</>
                                }
                            </Button>
                        </motion.div>
                    )}

                    {/* ── Card section ── */}
                    {selectedProvider === "CARD" && (
                        <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        >
                            <FormProvider {...methods}>
                                <form
                                    className="space-y-4"
                                    onSubmit={methods.handleSubmit((values) => submitCardPayment(values))}
                                >
                                    <FormField name="cardNumber" label="Card Number">
                                        <InputGroup
                                            name="cardNumber"
                                            type="text"
                                            placeholder="5555 5555 5555 4444"
                                            className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                        />
                                    </FormField>

                                    <FormField name="cardholderName" label="Cardholder Name">
                                        <InputGroup
                                            name="cardholderName"
                                            icon="user"
                                            type="text"
                                            placeholder="Jane Smith"
                                            className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                        />
                                    </FormField>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-1 space-y-2">
                                            <FormField name="expiryMonth" label="Month">
                                                <Input
                                                    type="number"
                                                    min={1} max={12}
                                                    placeholder="MM"
                                                    {...methods.register("expiryMonth", { valueAsNumber: true })}
                                                    className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                                />
                                            </FormField>
                                            {methods.formState.errors.expiryMonth && (
                                                <p className="text-xs text-red-500">{methods.formState.errors.expiryMonth.message}</p>
                                            )}
                                        </div>

                                        <div className="col-span-1 space-y-2">
                                            <FormField name="expiryYear" label="Year">
                                                <Input
                                                    type="number"
                                                    min={new Date().getFullYear()}
                                                    placeholder="YYYY"
                                                    {...methods.register("expiryYear", { valueAsNumber: true })}
                                                    className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                                />
                                            </FormField>
                                            {methods.formState.errors.expiryYear && (
                                                <p className="text-xs text-red-500">{methods.formState.errors.expiryYear.message}</p>
                                            )}
                                        </div>

                                        <FormField name="cvv" label="CVV" className="col-span-1">
                                            <InputGroup
                                                name="cvv"
                                                icon="password"
                                                type="password"
                                                placeholder="•••"
                                                className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                            />
                                        </FormField>
                                    </div>

                                    <FormField name="description" label="Note (Optional)">
                                        <InputGroup
                                            name="description"
                                            type="text"
                                            placeholder="e.g. Follow-up consultation"
                                            className="rounded-2xl h-14 bg-white dark:bg-white/[0.02] border-none shadow-sm font-bold dark:text-white dark:placeholder:text-gray-600"
                                        />
                                    </FormField>

                                    <div className="rounded-2xl bg-white dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 p-4 flex items-center justify-between">
                                        <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Total Due</span>
                                        <span className="text-xl font-black text-gray-900 dark:text-white">
                                            ${paymentContext.amount > 0 ? paymentContext.amount.toFixed(2) : "—"} USD
                                        </span>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isCardPending || !isScheduled}
                                        className="w-full h-14 rounded-2xl font-medium tracking-widest"
                                    >
                                        {isCardPending
                                            ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Processing Payment...</>
                                            : <><CreditCard className="w-4 h-4 mr-2" />Pay ${paymentContext.amount > 0 ? paymentContext.amount.toFixed(2) : "0.00"}</>
                                        }
                                    </Button>
                                </form>
                            </FormProvider>
                        </motion.div>
                    )}


                </div>
            </div>
        </div>
    );
}

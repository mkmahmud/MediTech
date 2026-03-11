import { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/lib/services/payment/paymentService";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { usePaymentStore } from "@/stores/payment/usePaymentStore";
import {
    HeartHandshake, CheckCircle2, XCircle, Clock, ArrowRight,
    Receipt, CreditCard, Calendar, ShieldCheck, Loader2
} from "lucide-react";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { lastPaymentId } = usePaymentStore();

    // Recover payment ID saved before Stripe redirect (Zustand is reset on full-page nav)
    const [storedPaymentId] = useState<string | null>(() => {
        const id = sessionStorage.getItem("pending_payment_id");
        if (id) sessionStorage.removeItem("pending_payment_id");
        return id;
    });

    // Stripe returns session_id; card payments return paymentId
    const paymentId =
        searchParams.get("paymentId") ||
        searchParams.get("id") ||
        lastPaymentId ||
        storedPaymentId;
    const sessionId = searchParams.get("session_id");

    // Recover appointmentId persisted before Stripe redirect
    const [storedAppointmentId] = useState<string | null>(() => {
        const id = sessionStorage.getItem("pending_appointment_id");
        if (id) sessionStorage.removeItem("pending_appointment_id");
        return id;
    });

    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ["payment-verify", paymentId, sessionId],
        queryFn: () => paymentService.getPaymentDetails(paymentId as string),
        enabled: Boolean(paymentId),
        refetchOnWindowFocus: false,
    });

    const payment = data?.data;
    const normalizedStatus = (payment?.status || "").toUpperCase();

    // Auto-confirm the appointment once payment is verified as COMPLETED
    const confirmedRef = useRef(false);
    useEffect(() => {
        if (normalizedStatus !== "COMPLETED" || confirmedRef.current) return;
        const appointmentId = payment?.appointmentId || storedAppointmentId;
        if (!appointmentId) return;
        confirmedRef.current = true;
        appointmentService.confirmAppointment(appointmentId).catch(
            (err) => console.error("Auto-confirm appointment failed:", err)
        );
    }, [normalizedStatus, payment?.appointmentId, storedAppointmentId]);

    const statusConfig = useMemo(() => {
        switch (normalizedStatus) {
            case "COMPLETED":
                return {
                    icon: <CheckCircle2 className="w-16 h-16 text-green-400" />,
                    title: "Payment Successful",
                    subtitle: "Your appointment has been confirmed.",
                    color: "green",
                    bg: "from-green-950/40 to-transparent",
                    border: "border-green-800/40",
                };
            case "FAILED":
                return {
                    icon: <XCircle className="w-16 h-16 text-red-400" />,
                    title: "Payment Failed",
                    subtitle: "We couldn't process your payment. Please try again.",
                    color: "red",
                    bg: "from-red-950/40 to-transparent",
                    border: "border-red-800/40",
                };
            case "PENDING":
            default:
                return {
                    icon: <Clock className="w-16 h-16 text-orange-400" />,
                    title: "Payment Pending",
                    subtitle: "Your payment is being processed. This may take a moment.",
                    color: "orange",
                    bg: "from-orange-950/40 to-transparent",
                    border: "border-orange-800/40",
                };
        }
    }, [normalizedStatus]);

    return (
        <div className="min-h-screen bg-[#030303] flex flex-col">
            {/* Top nav bar */}
            <header className="flex items-center justify-between px-8 py-5 border-b border-white/5">
                <Link to="/" className="flex items-center gap-2 text-white">
                    <div className="bg-orange p-1.5 rounded-lg">
                        <HeartHandshake className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-black uppercase tracking-tighter">
                        Medi<span className="text-orange">.</span>
                    </span>
                </Link>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange" />
                    Secure Transaction
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-lg space-y-8">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="flex flex-col items-center gap-6 text-center"
                        >
                            <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                <Loader2 className="w-10 h-10 text-orange animate-spin" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-white mb-2">Verifying Payment</h1>
                                <p className="text-gray-400 text-sm font-medium">Checking your transaction status...</p>
                            </div>
                        </motion.div>
                    ) : !paymentId ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-6 text-center"
                        >
                            <XCircle className="w-16 h-16 text-gray-500" />
                            <div>
                                <h1 className="text-3xl font-black text-white mb-2">Missing Payment ID</h1>
                                <p className="text-gray-400 text-sm font-medium">No payment reference found. Please try again from appointments.</p>
                            </div>
                            <Button onClick={() => navigate("/dashboard/appointments")} className="rounded-2xl h-12 px-8">
                                Back to Appointments <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-6"
                        >
                            {/* Status card */}
                            <div className={`relative rounded-3xl border ${statusConfig.border} bg-gradient-to-b ${statusConfig.bg} bg-white/[0.02] p-8 flex flex-col items-center text-center gap-4`}>
                                <div className="absolute inset-0 opacity-[0.03] rounded-3xl"
                                    style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "24px 24px" }} />
                                <div className="relative z-10">
                                    {statusConfig.icon}
                                </div>
                                <div className="relative z-10">
                                    <h1 className="text-4xl font-black text-white tracking-tighter mb-1">{statusConfig.title}</h1>
                                    <p className="text-gray-400 text-sm font-medium max-w-xs mx-auto">{statusConfig.subtitle}</p>
                                </div>

                                {normalizedStatus === "PENDING" && (
                                    <div className="relative z-10 mt-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => refetch()}
                                            disabled={isFetching}
                                            className="rounded-xl h-9 text-[10px] font-black uppercase tracking-widest border-white/20 text-white hover:bg-white/10"
                                        >
                                            {isFetching
                                                ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />Checking...</>
                                                : <>↻ &nbsp;Refresh Status</>}
                                        </Button>
                                    </div>
                                )}
                            </div>

                            {/* Payment details */}
                            {payment && (
                                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
                                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-black">Transaction_Details</p>
                                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                                        <div>
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-wider mb-0.5">Invoice</p>
                                            <p className="font-bold text-white tabular-nums">{payment.invoiceNumber || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-wider mb-0.5">Amount</p>
                                            <p className="font-bold text-white">${Number(payment.amount || 0).toFixed(2)} {payment.currency}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-wider mb-0.5">Provider</p>
                                            <p className="font-bold text-white uppercase">{payment.provider || "—"}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/30 uppercase tracking-wider mb-0.5">Type</p>
                                            <p className="font-bold text-white uppercase">{payment.paymentType?.replace(/_/g, " ") || "—"}</p>
                                        </div>
                                        {payment.cardLastFour && (
                                            <div className="flex items-center gap-2 col-span-2">
                                                <CreditCard className="w-4 h-4 text-orange" />
                                                <p className="font-bold text-white">{payment.cardBrand} ···· {payment.cardLastFour.slice(-4)}</p>
                                            </div>
                                        )}
                                        {payment.paidAt && (
                                            <div className="flex items-center gap-2 col-span-2">
                                                <Calendar className="w-4 h-4 text-orange" />
                                                <p className="font-bold text-white">{new Date(payment.paidAt).toLocaleString()}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button
                                    onClick={() => navigate("/dashboard/appointments")}
                                    className="flex-1    font-medium "
                                >
                                    <Receipt className="w-4 h-4 mr-2" />View Appointments
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => navigate("/dashboard/payments")}
                                    className="flex-1   "
                                >
                                    Payment History <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            {normalizedStatus === "FAILED" && (
                                <Button
                                    variant="denger"
                                    onClick={() => navigate(-1)}
                                    className="w-full rounded-2xl h-11 font-medium"
                                >
                                    Try Payment Again
                                </Button>
                            )}
                        </motion.div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="px-8 py-5 border-t border-white/5 flex items-center justify-center gap-8 text-[9px] font-mono font-black text-white/20 uppercase tracking-[0.2em]">
                <span>256-bit encryption</span>
                <span>PCI-DSS compliant</span>
                <span>MediTech Inc.</span>
            </footer>
        </div>
    );
}

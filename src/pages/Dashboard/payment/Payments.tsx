import { useMemo } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/lib/services/payment/paymentService";

export default function Payments() {
    const { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ["payments-list", 1, 20],
        queryFn: () => paymentService.getPaymentsList({ page: 1, limit: 20 }),
    });

    const payload = data?.data;

    const payments = useMemo(() => {
        if (Array.isArray(payload)) return payload;
        if (Array.isArray(payload?.payments)) return payload.payments;
        return [];
    }, [payload]);

    return (
        <div className="dark:text-white space-y-8">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                    <h1 className="text-4xl font-black mb-2">Payments</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Track your payment records and status.
                    </p>
                </div>

                <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
                    {isFetching ? "Refreshing..." : "Refresh"}
                </Button>
            </div>

            {isLoading ? (
                <div>Loading payments...</div>
            ) : payments.length === 0 ? (
                <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 bg-white dark:bg-[#050505] space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">No payment records found.</p>
                    <Button asChild>
                        <Link to="/dashboard/appointments">Go to Appointments</Link>
                    </Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {payments.map((payment: any) => (
                        <div key={payment.id} className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-[#050505]">
                            <div className="grid md:grid-cols-3 gap-2 text-sm">
                                <p><span className="font-semibold">Invoice:</span> {payment.invoiceNumber || "N/A"}</p>
                                <p><span className="font-semibold">Amount:</span> ${Number(payment.amount || 0).toFixed(2)}</p>
                                <p><span className="font-semibold">Status:</span> {payment.status || "N/A"}</p>
                                <p><span className="font-semibold">Provider:</span> {payment.provider || "N/A"}</p>
                                <p><span className="font-semibold">Type:</span> {payment.paymentType || "N/A"}</p>
                                <p><span className="font-semibold">Method:</span> {payment.method || "N/A"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { appointmentService } from "@/lib/services/appointment/appointmentService";

type CancelAppointmentProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctorId: string;
    patientId: string;
    appointmentId: string;
    onSuccess?: () => void;
};

export default function CancelAppointment({
    open,
    onOpenChange,
    doctorId,
    patientId,
    appointmentId,
    onSuccess,
}: CancelAppointmentProps) {
    const queryClient = useQueryClient();
    const [cancellationReason, setCancellationReason] = useState("");

    const { mutate: cancelAppointment, isPending } = useMutation({
        mutationFn: () =>
            appointmentService.cancelAppointment({
                doctorId,
                patientId,
                appointmentId,
                cancellationReason,
            }),
        onSuccess: () => {
            toast.success("Appointment cancelled successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            setCancellationReason("");
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || "Failed to cancel appointment";
            toast.error(message);
        },
    });

    const handleCancelAppointment = () => {
        if (!cancellationReason.trim()) {
            toast.error("Cancellation reason is required");
            return;
        }

        if (!doctorId || !patientId || !appointmentId) {
            toast.error("Missing appointment details");
            return;
        }

        cancelAppointment();
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen && !isPending) {
            setCancellationReason("");
        }
        onOpenChange(nextOpen);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/80"
                onClick={() => !isPending && handleOpenChange(false)}
            />

            <div className="relative z-10 w-[92%] max-w-md rounded-lg border bg-background p-6 shadow-lg">
                <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-foreground">Cancel Appointment</h2>
                    <p className="text-sm text-muted-foreground">
                        Please provide a reason for cancellation.
                    </p>
                </div>

                <div className="mt-6 space-y-2">
                    <label className="text-sm font-medium">Cancellation Reason</label>
                    <Textarea
                        value={cancellationReason}
                        onChange={(e) => setCancellationReason(e.target.value)}
                        placeholder="Write reason..."
                        rows={5}
                        disabled={isPending}
                    />
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <Button
                        variant="secondary"
                        type="button"
                        onClick={() => handleOpenChange(false)}
                        disabled={isPending}
                    >
                        Close
                    </Button>
                    <Button
                        variant="denger"
                        type="button"
                        onClick={handleCancelAppointment}
                        disabled={isPending}
                    >
                        {isPending ? "Cancelling..." : "Confirm Cancel"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

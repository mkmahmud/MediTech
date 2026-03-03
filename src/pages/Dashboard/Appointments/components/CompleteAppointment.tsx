import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { FormProvider, useForm } from "react-hook-form";
import { TextareaGroup } from "@/components/ui/text-area-group";
import { Stethoscope, FileText, X } from "lucide-react";

type CompleteAppointmentProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctorId: string;
    appointmentId: string;
    onSuccess?: () => void;
};

type CompleteAppointmentFormValues = {
    diagnosis: string;
    notes: string;
};

export default function CompleteAppointment({
    open,
    onOpenChange,
    doctorId,
    appointmentId,
    onSuccess,
}: CompleteAppointmentProps) {
    const queryClient = useQueryClient();

    const methods = useForm<CompleteAppointmentFormValues>({
        defaultValues: {
            diagnosis: "",
            notes: "",
        },
    });



    const { mutate: completeAppointment, isPending } = useMutation({
        mutationFn: (payload: { appointmentId: string; doctorId: string; diagnosis: string; notes: string }) =>
            appointmentService.completeAppointment(payload),
        onSuccess: () => {
            toast.success("Appointment completed successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            queryClient.invalidateQueries({ queryKey: ["appointment-details", appointmentId] });
            methods.reset();
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || "Failed to complete appointment";
            toast.error(message);
        },
    });


    const handleCompleteAppointment = (data: CompleteAppointmentFormValues) => {
        // Use react-hook-form data directly
        const diagnosis = data.diagnosis?.trim() || "";
        const notes = data.notes?.trim() || "";


        if (!diagnosis || diagnosis.length === 0) {
            toast.error("Diagnosis is required");
            return;
        }

        if (!notes || notes.length === 0) {
            toast.error("Notes/Prescription is required");
            return;
        }

        if (!doctorId || !appointmentId) {
            toast.error("Missing appointment details");
            return;
        }

        completeAppointment({
            appointmentId,
            doctorId,
            diagnosis,
            notes,
        });
    };

    const handleOpenChange = (nextOpen: boolean) => {
        if (!nextOpen && !isPending) {
            methods.reset();
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

            <div className="relative z-10 w-[92%] max-w-2xl rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-xl dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">

                {/* Close Button */}
                <button
                    onClick={() => handleOpenChange(false)}
                    disabled={isPending}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 dark:hover:text-gray-300"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-8 space-y-2 border-b border-gray-200 pb-6 dark:border-gray-700">
                    <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                        <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                            <Stethoscope className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                        </div>
                        Complete Appointment
                    </h2>
                    <p className="ml-11 text-sm text-gray-500 dark:text-gray-400">
                        Provide diagnosis and clinical notes to finalize this appointment
                    </p>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleCompleteAppointment)} className="space-y-6">

                        {/* Diagnosis Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Stethoscope className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                Diagnosis *
                            </label>
                            <TextareaGroup
                                name="diagnosis"
                                placeholder="Enter the diagnosis (e.g., Fever, Hypertension, Gastritis)..."
                                className="rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 focus-within:border-orange-500 dark:focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 dark:focus-within:ring-orange-900/30 p-0"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">Be specific about the findings and diagnosis</p>
                        </div>

                        {/* Notes/Prescription Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Clinical Notes & Prescriptions *
                            </label>
                            <TextareaGroup
                                name="notes"
                                placeholder="Enter treatment recommendations, prescriptions, and follow-up instructions (e.g., Take antibiotics 2x daily for 7 days)..."
                                className="rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 p-0"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">Include treatment plan and follow-up care instructions</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end dark:border-gray-700">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => handleOpenChange(false)}
                                disabled={isPending}
                                className="rounded-lg"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="rounded-lg bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                            >
                                {isPending ? (
                                    <span className="flex items-center gap-2">
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                        Completing...
                                    </span>
                                ) : (
                                    "Complete Appointment"
                                )}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

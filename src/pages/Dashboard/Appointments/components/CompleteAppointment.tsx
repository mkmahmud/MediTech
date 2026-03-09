import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { appointmentService } from "@/lib/services/appointment/appointmentService";
import { prescriptionsService } from "@/lib/services/prescriptions/prescriptionsService";
import { FormProvider, useForm } from "react-hook-form";
import { TextareaGroup } from "@/components/ui/text-area-group";
import { InputGroup } from "@/components/ui/input-group";
import { SelectGroup } from "@/components/ui/SelectGroup";
import { FormField } from "@/components/ui/form-field";
import { Stethoscope, FileText, X, Plus, Trash2, Pill } from "lucide-react";
import { NOTIFICATION_QUERY_KEYS } from "@/hooks/useNotifications";
import { useState } from "react";
import type { PrescriptionMedication } from "@/types/prescription";

type CompleteAppointmentProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    doctorId: string;
    appointmentId: string;
    patientId: string;
    onSuccess?: () => void;
};

type CompleteAppointmentFormValues = {
    diagnosis: string;
    notes: string;
};

type MedicineFormValues = {
    medicationName: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
    refillsAllowed: string;
};

// Dropdown options
const dosageOptions = [
    { label: "250mg", value: "250mg" },
    { label: "500mg", value: "500mg" },
    { label: "1000mg (1g)", value: "1000mg" },
    { label: "1 tablet", value: "1 tablet" },
    { label: "2 tablets", value: "2 tablets" },
    { label: "5ml", value: "5ml" },
    { label: "10ml", value: "10ml" },
    { label: "1 capsule", value: "1 capsule" },
    { label: "2 capsules", value: "2 capsules" },
    { label: "1 teaspoon", value: "1 teaspoon" },
];

const frequencyOptions = [
    { label: "Once daily", value: "Once daily" },
    { label: "Twice daily", value: "Twice daily" },
    { label: "Three times daily", value: "Three times daily" },
    { label: "Four times daily", value: "Four times daily" },
    { label: "Every 4 hours", value: "Every 4 hours" },
    { label: "Every 6 hours", value: "Every 6 hours" },
    { label: "Every 8 hours", value: "Every 8 hours" },
    { label: "Every 12 hours", value: "Every 12 hours" },
    { label: "Before meals", value: "Before meals" },
    { label: "After meals", value: "After meals" },
    { label: "At bedtime", value: "At bedtime" },
    { label: "As needed", value: "As needed" },
];

const durationOptions = [
    { label: "3 days", value: "3 days" },
    { label: "5 days", value: "5 days" },
    { label: "7 days", value: "7 days" },
    { label: "10 days", value: "10 days" },
    { label: "14 days (2 weeks)", value: "14 days" },
    { label: "21 days (3 weeks)", value: "21 days" },
    { label: "30 days (1 month)", value: "30 days" },
    { label: "60 days (2 months)", value: "60 days" },
    { label: "90 days (3 months)", value: "90 days" },
    { label: "Ongoing", value: "Ongoing" },
];

const refillsOptions = [
    { label: "0 (No refills)", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "12", value: "12" },
];

export default function CompleteAppointment({
    open,
    onOpenChange,
    doctorId,
    appointmentId,
    patientId,
    onSuccess,
}: CompleteAppointmentProps) {
    const queryClient = useQueryClient();
    const [medications, setMedications] = useState<PrescriptionMedication[]>([]);

    // Main appointment form
    const methods = useForm<CompleteAppointmentFormValues>({
        defaultValues: {
            diagnosis: "",
            notes: "",
        },
    });

    // Medication form
    const medicationForm = useForm<MedicineFormValues>({
        defaultValues: {
            medicationName: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
            refillsAllowed: "0",
        },
    });



    //  Mutation to complete the appointment
    const { mutate: completeAppointment, isPending } = useMutation({
        mutationFn: async (payload: { 
            appointmentId: string
            doctorId: string
            diagnosis: string
            notes: string
            medications: PrescriptionMedication[]
        }) => {
            // First, complete the appointment
            await appointmentService.completeAppointment({
                appointmentId: payload.appointmentId,
                doctorId: payload.doctorId,
                diagnosis: payload.diagnosis,
                notes: payload.notes,
            });

            // Then, create the prescription if there are medications
            if (payload.medications.length > 0) {
                await prescriptionsService.createPrescription({
                    patientId,
                    doctorId: payload.doctorId,
                    medications: payload.medications,
                    notes: payload.notes,
                });
            }
        },
        onSuccess: async () => {
            toast.success("Appointment completed and prescription created successfully");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
            queryClient.invalidateQueries({ queryKey: ["appointment-details", appointmentId] });
            await queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all });
            await queryClient.refetchQueries({ queryKey: NOTIFICATION_QUERY_KEYS.all, type: 'active' });
            methods.reset();
            setMedications([]);
            medicationForm.reset();
            onOpenChange(false);
            onSuccess?.();
        },
        onError: (error: any) => {
            const message =
                error?.response?.data?.message || "Failed to complete appointment";
            toast.error(message);
        },
    });


    const handleAddMedicine = () => {
        const currentMedicine = medicationForm.getValues();
        
        if (!currentMedicine.medicationName.trim()) {
            medicationForm.setError("medicationName", { message: "Medication name must be at least 2 characters" });
            return;
        }

        if (currentMedicine.medicationName.trim().length > 200) {
            medicationForm.setError("medicationName", { message: "Medication name is too long" });
            return;
        }

        if (!currentMedicine.dosage.trim()) {
            medicationForm.setError("dosage", { message: "Dosage is required" });
            return;
        }

        if (currentMedicine.dosage.trim().length > 100) {
            medicationForm.setError("dosage", { message: "Dosage is too long" });
            return;
        }

        if (!currentMedicine.frequency.trim()) {
            medicationForm.setError("frequency", { message: "Frequency must be at least 2 characters" });
            return;
        }

        if (currentMedicine.frequency.trim().length > 100) {
            medicationForm.setError("frequency", { message: "Frequency is too long" });
            return;
        }

        if (!currentMedicine.duration.trim()) {
            medicationForm.setError("duration", { message: "Duration is required" });
            return;
        }

        if (currentMedicine.duration.trim().length > 100) {
            medicationForm.setError("duration", { message: "Duration is too long" });
            return;
        }

        if (currentMedicine.instructions.length > 500) {
            medicationForm.setError("instructions", { message: "Instructions are too long" });
            return;
        }

        const refills = parseInt(currentMedicine.refillsAllowed) || 0;
        if (refills < 0 || refills > 12) {
            medicationForm.setError("refillsAllowed", { message: "Refills must be between 0 and 12" });
            return;
        }

        setMedications([
            ...medications,
            {
                medicationName: currentMedicine.medicationName,
                dosage: currentMedicine.dosage,
                frequency: currentMedicine.frequency,
                duration: currentMedicine.duration,
                instructions: currentMedicine.instructions,
                refillsAllowed: refills,
            },
        ]);

        medicationForm.reset();
        toast.success("Medication added");
    };

    const handleRemoveMedicine = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
        toast.success("Medication removed");
    };

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

        if (notes.length > 1000) {
            toast.error("Notes are too long (max 1000 characters)");
            return;
        }

        if (medications.length === 0) {
            toast.error("At least one medication is required");
            return;
        }

        if (medications.length > 20) {
            toast.error("Maximum 20 medications per prescription");
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
            medications,
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

            <div className="relative z-10 w-[92%] max-w-2xl max-h-[90vh] rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 shadow-xl dark:border-gray-700 dark:from-gray-900 dark:to-gray-800 flex flex-col">

                {/* Close Button */}
                <button
                    onClick={() => handleOpenChange(false)}
                    disabled={isPending}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 dark:hover:text-gray-300 z-20"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="flex-shrink-0 space-y-2 border-b border-gray-200 pb-6 px-8 pt-8 dark:border-gray-700">
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

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
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

                        {/* Prescriptions Section */}
                        <div className="space-y-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Pill className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Add Medications (Prescription)
                            </label>

                            {/* Medicine Input Fields */}
                            <FormProvider {...medicationForm}>
                                <div className="grid grid-cols-1 gap-3 bg-white dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FormField name="medicationName" label="Medication Name *">
                                            <InputGroup
                                                name="medicationName"
                                                type="text"
                                                placeholder="e.g., Aspirin, Amoxicillin"
                                                className="text-sm rounded-md"
                                            />
                                        </FormField>
                                        
                                        <FormField name="dosage" label="Dosage *">
                                            <SelectGroup
                                                name="dosage"
                                                options={dosageOptions}
                                                placeholder="Select dosage"
                                                className="text-sm rounded-md h-9"
                                            />
                                        </FormField>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FormField name="frequency" label="Frequency *">
                                            <SelectGroup
                                                name="frequency"
                                                options={frequencyOptions}
                                                placeholder="Select frequency"
                                                className="text-sm rounded-md h-9"
                                            />
                                        </FormField>
                                        
                                        <FormField name="duration" label="Duration *">
                                            <SelectGroup
                                                name="duration"
                                                options={durationOptions}
                                                placeholder="Select duration"
                                                className="text-sm rounded-md h-9"
                                            />
                                        </FormField>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <FormField name="instructions" label="Instructions (Optional)">
                                            <InputGroup
                                                name="instructions"
                                                type="text"
                                                placeholder="e.g., Take with food, avoid dairy"
                                                className="text-sm rounded-md"
                                            />
                                        </FormField>
                                        
                                        <FormField name="refillsAllowed" label="Refills Allowed (0-12)">
                                            <SelectGroup
                                                name="refillsAllowed"
                                                options={refillsOptions}
                                                placeholder="Select refills"
                                                className="text-sm rounded-md h-9"
                                            />
                                        </FormField>
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={handleAddMedicine}
                                        disabled={isPending}
                                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Add Medication
                                    </Button>
                                </div>
                            </FormProvider>

                            {/* Medicine List */}
                            {medications.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                        ({medications.length}) Medication(s) Added
                                    </p>
                                    {medications.map((med, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start justify-between gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-blue-200 dark:border-blue-800"
                                        >
                                            <div className="flex-1 space-y-1 text-sm">
                                                <p className="font-semibold text-gray-900 dark:text-white">
                                                    {med.medicationName}
                                                </p>
                                                <p className="text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">{med.dosage}</span> • {med.frequency} • {med.duration}
                                                </p>
                                                {med.instructions && (
                                                    <p className="text-gray-500 dark:text-gray-500 text-xs italic">
                                                        {med.instructions}
                                                    </p>
                                                )}
                                                {med.refillsAllowed !== undefined && (
                                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                                        Refills: {med.refillsAllowed}
                                                    </p>
                                                )}
                                            </div>
                                            <Button
                                                type="button"
                                                onClick={() => handleRemoveMedicine(index)}
                                                disabled={isPending}
                                                variant="ghost"
                                                className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notes/Prescription Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                Clinical Notes & Treatment Plan *
                            </label>
                            <TextareaGroup
                                name="notes"
                                placeholder="Enter treatment recommendations, follow-up instructions, and other clinical notes..."
                                className="rounded-xl bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-600 focus-within:border-blue-500 dark:focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/30 p-0"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400">Include treatment plan and follow-up care instructions</p>
                        </div>

                        </form>
                    </FormProvider>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="flex-shrink-0 flex flex-col-reverse gap-3 border-t border-gray-200 px-8 py-6 sm:flex-row sm:justify-end dark:border-gray-700 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
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
                        onClick={() => methods.handleSubmit(handleCompleteAppointment)()}
                        className="rounded-lg bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-2">
                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                Completing...
                            </span>
                        ) : (
                            "Complete Appointment & Create Prescription"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}

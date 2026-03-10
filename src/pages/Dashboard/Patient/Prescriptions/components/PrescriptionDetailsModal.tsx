import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { prescriptionsService } from "@/lib/services/prescriptions/prescriptionsService";
import type { Prescription } from "@/types/prescription";
import { Loader2, Download, Pill, X } from "lucide-react";
import { toast } from "sonner";

type PrescriptionDetailsModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    prescriptionId?: string | null;
    patientId?: string;
    doctorId?: string;
    appointmentDate?: string;
    patientName?: string;
    doctorName?: string;
};

function normalizePrescriptionResponse(input: unknown): Prescription | null {
    if (!input) return null;
    const maybeWrapped = input as Prescription | { data?: Prescription };
    if ("data" in maybeWrapped && maybeWrapped.data) return maybeWrapped.data;
    return maybeWrapped as Prescription;
}

function formatDate(value?: string) {
    if (!value) return "-";
    return new Date(value).toLocaleDateString();
}

function pickClosestPrescription(rows: Prescription[], appointmentDate?: string) {
    if (!rows.length) return null;

    if (!appointmentDate) {
        return [...rows].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )[0];
    }

    const target = new Date(appointmentDate).getTime();
    return [...rows].sort((a, b) => {
        const aTime = new Date(a.issuedAt || a.createdAt).getTime();
        const bTime = new Date(b.issuedAt || b.createdAt).getTime();
        return Math.abs(aTime - target) - Math.abs(bTime - target);
    })[0];
}

function triggerPrescriptionPDFDownload(prescription: Prescription, patientName: string, doctorName: string) {
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const brandBlue: [number, number, number] = [22, 88, 162];
    const mutedGray: [number, number, number] = [96, 103, 112];
    let y = margin;

    const drawPageFrame = () => {
        doc.setDrawColor(222, 226, 230);
        doc.setLineWidth(0.35);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
    };

    const drawFooter = () => {
        doc.setDrawColor(220, 224, 229);
        doc.line(margin, pageHeight - 16, pageWidth - margin, pageHeight - 16);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(...mutedGray);
        doc.text(
            "Generated electronically by MediTech. Valid without handwritten signature.",
            pageWidth / 2,
            pageHeight - 10,
            { align: "center" },
        );
        doc.setTextColor(0, 0, 0);
    };

    const drawSectionHeader = (title: string, top: number) => {
        doc.setFillColor(246, 248, 251);
        doc.rect(margin, top, contentWidth, 8, "F");
        doc.setDrawColor(224, 228, 234);
        doc.rect(margin, top, contentWidth, 8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.setTextColor(...brandBlue);
        doc.text(title, margin + 3, top + 5.5);
        doc.setTextColor(0, 0, 0);
        return top + 11;
    };

    const drawTableHeader = (top: number) => {
        doc.setFillColor(245, 247, 250);
        doc.rect(margin, top, contentWidth, 8, "F");
        doc.setDrawColor(224, 228, 234);
        doc.rect(margin, top, contentWidth, 8);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.text("#", margin + 2, top + 5.5);
        doc.text("Medication", margin + 10, top + 5.5);
        doc.text("Prescription Details", margin + 82, top + 5.5);
        doc.text("Refills", pageWidth - margin - 2, top + 5.5, { align: "right" });
        return top + 8;
    };

    drawPageFrame();

    doc.setFillColor(...brandBlue);
    doc.rect(8, 8, pageWidth - 16, 26, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("MediTech Healthcare", margin, 19);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Clinical Prescription", margin, 25);
    doc.setFontSize(8.5);
    doc.text(`Prescription ID: ${prescription.id}`, pageWidth - margin, 18, { align: "right" });
    doc.text(`Issued: ${formatDate(prescription.issuedAt || prescription.createdAt)}`, pageWidth - margin, 23, { align: "right" });
    doc.text(`Status: ${prescription.status}`, pageWidth - margin, 28, { align: "right" });
    doc.setTextColor(0, 0, 0);

    y = 40;
    doc.setFillColor(249, 250, 252);
    doc.rect(margin, y, contentWidth / 2 - 1.5, 20, "F");
    doc.rect(pageWidth / 2 + 1.5, y, contentWidth / 2 - 1.5, 20, "F");
    doc.setDrawColor(224, 228, 234);
    doc.rect(margin, y, contentWidth / 2 - 1.5, 20);
    doc.rect(pageWidth / 2 + 1.5, y, contentWidth / 2 - 1.5, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...mutedGray);
    doc.text("PATIENT", margin + 3, y + 5.5);
    doc.text("PRESCRIBING DOCTOR", pageWidth / 2 + 4.5, y + 5.5);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text(patientName, margin + 3, y + 11.5);
    doc.text(doctorName, pageWidth / 2 + 4.5, y + 11.5);
    doc.setFontSize(8.8);
    doc.setTextColor(...mutedGray);
    doc.text(`ID: ${prescription.patientId}`, margin + 3, y + 16.5);
    doc.text(`ID: ${prescription.doctorId}`, pageWidth / 2 + 4.5, y + 16.5);
    doc.setTextColor(0, 0, 0);

    y = drawSectionHeader("Prescription Items", y + 26);
    y = drawTableHeader(y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    prescription.medications.forEach((medication, index) => {
        const medicationNameLines = doc.splitTextToSize(medication.medicationName || "-", 68) as string[];
        const detailsText = `${medication.dosage} • ${medication.frequency} • ${medication.duration}`;
        const detailsLines = doc.splitTextToSize(detailsText, 74) as string[];
        const instructionLines = medication.instructions
            ? (doc.splitTextToSize(`Instructions: ${medication.instructions}`, contentWidth - 24) as string[])
            : [];

        const primaryRows = Math.max(medicationNameLines.length, detailsLines.length, 1);
        const rowHeight = 5 + primaryRows * 4 + (instructionLines.length ? 2 + instructionLines.length * 3.7 : 0) + 3;

        if (y + rowHeight > pageHeight - 32) {
            drawFooter();
            doc.addPage();
            drawPageFrame();
            y = margin;
            y = drawSectionHeader("Prescription Items (Continued)", y);
            y = drawTableHeader(y);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
        }

        doc.setDrawColor(236, 239, 243);
        doc.rect(margin, y, contentWidth, rowHeight);

        const baseLine = y + 5;
        doc.text(String(index + 1), margin + 2, baseLine);
        doc.text(medicationNameLines, margin + 10, baseLine);
        doc.text(detailsLines, margin + 82, baseLine);
        doc.text(String(medication.refillsAllowed ?? 0), pageWidth - margin - 2, baseLine, { align: "right" });

        if (instructionLines.length) {
            doc.setTextColor(...mutedGray);
            doc.setFontSize(8.5);
            doc.text(instructionLines, margin + 10, y + 5 + primaryRows * 4 + 2);
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(9);
        }

        y += rowHeight;
    });

    if (prescription.notes) {
        const notesLines = doc.splitTextToSize(prescription.notes, contentWidth - 8) as string[];
        const notesBlockHeight = Math.max(14, notesLines.length * 4 + 8);

        if (y + notesBlockHeight + 18 > pageHeight - 32) {
            drawFooter();
            doc.addPage();
            drawPageFrame();
            y = margin;
        }

        y = drawSectionHeader("Clinical Notes", y + 6);
        doc.setDrawColor(230, 234, 239);
        doc.rect(margin, y, contentWidth, notesBlockHeight);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.2);
        doc.text(notesLines, margin + 4, y + 6);
        y += notesBlockHeight + 8;
    }

    const signatureY = pageHeight - 28;
    doc.setDrawColor(188, 194, 201);
    doc.line(pageWidth - 78, signatureY, pageWidth - margin, signatureY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...mutedGray);
    doc.text("Authorized Physician Signature", pageWidth - 46, signatureY + 4.5, { align: "center" });
    doc.setTextColor(0, 0, 0);

    drawFooter();

    const filename = `prescription-${prescription.id.slice(0, 8)}.pdf`;
    doc.save(filename);
}

export default function PrescriptionDetailsModal({
    open,
    onOpenChange,
    prescriptionId,
    patientId,
    doctorId,
    appointmentDate,
    patientName,
    doctorName,
}: PrescriptionDetailsModalProps) {
    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["prescription-modal", prescriptionId, patientId, doctorId, appointmentDate],
        enabled: open && (!!prescriptionId || !!patientId || !!doctorId),
        queryFn: async () => {
            if (prescriptionId) {
                const detail = await prescriptionsService.getPrescriptionById(prescriptionId);
                return normalizePrescriptionResponse(detail);
            }

            const response = await prescriptionsService.getPrescriptions({
                patientId,
                doctorId,
                limit: 50,
                offset: 0,
            });

            return pickClosestPrescription(response?.data || [], appointmentDate);
        },
    });

    const prescription = useMemo(() => data || null, [data]);

    if (!open) return null;

    const resolvedPatientName = patientName || "Patient";
    const resolvedDoctorName = doctorName || "Doctor";

    const handleDownload = () => {
        if (!prescription) {
            toast.error("No prescription available to download");
            return;
        }

        try {
            triggerPrescriptionPDFDownload(prescription, resolvedPatientName, resolvedDoctorName);
            toast.success("Prescription PDF downloaded");
        } catch {
            toast.error("Failed to generate prescription PDF");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80" onClick={() => onOpenChange(false)} />

            <div className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-background shadow-2xl">
                <div className="px-5 py-4 border-b border-gray-100 dark:border-white/10 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-black">Prescription Details</h2>
                        <p className="text-xs text-gray-500">Clinical format with downloadable PDF</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleDownload} disabled={!prescription || isLoading || isFetching}>
                            <Download className="w-4 h-4 mr-1" /> Download PDF
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-y-auto max-h-[calc(92vh-72px)] p-5 bg-gray-50 dark:bg-black/20">
                    {isLoading || isFetching ? (
                        <div className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-10 flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" /> Loading prescription...
                        </div>
                    ) : isError ? (
                        <div className="rounded-xl border border-red-200 bg-red-50/70 p-6 text-sm text-red-700 dark:bg-red-950/20 dark:border-red-900/40 dark:text-red-300">
                            Failed to load prescription.
                        </div>
                    ) : !prescription ? (
                        <div className="rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/[0.03] p-10 text-center text-sm text-gray-500">
                            No prescription found for this appointment.
                        </div>
                    ) : (
                        <article className="mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-lg">
                            <header className="border-b border-dashed border-gray-300 pb-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight">MediTech Healthcare</h3>
                                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Digital Clinical Network</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-500 uppercase">Prescription ID</p>
                                        <p className="text-xs font-semibold break-all max-w-[180px]">{prescription.id}</p>
                                    </div>
                                </div>
                            </header>

                            <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Patient</p>
                                    <p className="font-semibold mt-1">{resolvedPatientName}</p>
                                    <p className="text-xs text-gray-500 mt-1 break-all">ID: {prescription.patientId}</p>
                                </div>
                                <div className="rounded-lg border border-gray-200 p-3">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Prescribing Doctor</p>
                                    <p className="font-semibold mt-1">{resolvedDoctorName}</p>
                                    <p className="text-xs text-gray-500 mt-1 break-all">ID: {prescription.doctorId}</p>
                                </div>
                            </section>

                            <section className="mt-5 flex items-start gap-3">
                                <span className="text-4xl font-black leading-none">℞</span>
                                <div className="flex-1 space-y-3">
                                    {prescription.medications.map((medication, index) => (
                                        <div key={`${medication.medicationName}-${index}`} className="rounded-lg border border-gray-200 p-3">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-sm flex items-center gap-2">
                                                        <Pill className="w-4 h-4 text-orange" /> {index + 1}. {medication.medicationName}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {medication.dosage} • {medication.frequency} • {medication.duration}
                                                    </p>
                                                    {medication.instructions && (
                                                        <p className="text-xs text-gray-500 mt-1">Instructions: {medication.instructions}</p>
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-orange/10 text-orange">
                                                    Refills: {medication.refillsAllowed ?? 0}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {prescription.notes && (
                                <section className="mt-5 rounded-lg border border-gray-200 p-3">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Clinical Notes</p>
                                    <p className="text-sm text-gray-700 mt-1">{prescription.notes}</p>
                                </section>
                            )}

                            <footer className="mt-6 pt-4 border-t border-dashed border-gray-300 text-xs text-gray-600 space-y-3">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p>Issued: {formatDate(prescription.issuedAt || prescription.createdAt)}</p>
                                    <p>Expires: {formatDate(prescription.expiresAt)}</p>
                                    <p>Status: {prescription.status}</p>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <div className="w-48 text-center border-t border-gray-400 pt-1 text-[11px]">Doctor Signature</div>
                                </div>
                                <p className="text-[10px] text-gray-500 text-center">
                                    Generated electronically by MediTech. This prescription is valid without handwritten signature.
                                </p>
                            </footer>
                        </article>
                    )}
                </div>
            </div>
        </div>
    );
}

import jsPDF from "jspdf";
import { format } from "date-fns";

export interface AppointmentForPDF {
    scheduledAt: string;
    patientName: string;
    status: string;
}

interface AppointmentsPDFExportProps {
    appointments: AppointmentForPDF[];
    selectedDate: Date;
}

// @ts-ignore
export const AppointmentsPDFExport = ({ appointments, selectedDate }: AppointmentsPDFExportProps) => {
    return <div style={{ display: "none" }} />;
};

// Export a utility function to trigger PDF download using jsPDF directly
export const triggerAppointmentsPDFDownload = (appointments: AppointmentForPDF[], selectedDate: Date, doctorName: string) => {
    try {
        if (!appointments || appointments.length === 0) {
            console.error("No appointments to download");
            throw new Error("No appointments to download");
        }

        // Create PDF document
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        let yPosition = 15;

        // Set font for title
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text(`Appointments: ${doctorName}`, pageWidth / 2, yPosition, { align: "center" });

        // Date
        yPosition += 8;
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(format(selectedDate, "MMMM dd, yyyy"), pageWidth / 2, yPosition, { align: "center" });

        // Generated info
        yPosition += 12;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${format(new Date(), "MMMM dd, yyyy HH:mm:ss")}`, 15, yPosition);
        yPosition += 6;
        doc.text(`Total Appointments: ${appointments.length}`, 15, yPosition);

        // Table data
        yPosition += 12;
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");

        // Table headers
        const headers = ["Time", "Patient Name", "Status"];
        const colWidths = [20, 120, 45];
        let xPosition = 15;

        // Draw header background
        doc.setFillColor(243, 244, 246);
        doc.rect(xPosition, yPosition - 5, pageWidth - 30, 8, "F");

        // Draw headers
        headers.forEach((header, index) => {
            doc.text(header, xPosition + 3, yPosition, { maxWidth: colWidths[index] });
            xPosition += colWidths[index];
        });

        // Table rows
        yPosition += 10;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        appointments.forEach((apt, rowIndex) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = 15;
            }

            // Alternate row background
            if (rowIndex % 2 === 0) {
                doc.setFillColor(249, 250, 251);
                doc.rect(15, yPosition - 5, pageWidth - 30, 7, "F");
            }

            // Row data
            xPosition = 15;
            const time = format(new Date(apt.scheduledAt), "HH:mm");
            doc.text(time, xPosition + 3, yPosition, { maxWidth: colWidths[0] });

            xPosition += colWidths[0];
            doc.text(apt.patientName, xPosition + 3, yPosition, { maxWidth: colWidths[1] });

            xPosition += colWidths[1];
            // Status with color
            const statusText = apt.status.toUpperCase();
            const statusColor = getStatusColorRGB(apt.status);
            doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
            doc.setFont("helvetica", "bold");
            doc.text(statusText, xPosition + 3, yPosition, { maxWidth: colWidths[2] });
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "normal");

            yPosition += 8;
        });

        // Footer
        doc.setTextColor(153, 153, 153);
        doc.setFontSize(8);
        doc.text("This is an automatically generated report", pageWidth / 2, pageHeight - 10, { align: "center" });

        // Save PDF
        const filename = `appointments-${format(selectedDate, "yyyy-MM-dd")}.pdf`;
        doc.save(filename);
        console.log("PDF downloaded successfully:", filename);
    } catch (error) {
        console.error("Error in triggerAppointmentsPDFDownload:", error);
        throw error;
    }
};

// Helper function to get RGB color based on status
const getStatusColorRGB = (status: string): [number, number, number] => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
        case "confirmed":
            return [16, 185, 129]; // green
        case "completed":
            return [59, 130, 246]; // blue
        case "cancelled":
            return [239, 68, 68]; // red
        case "pending":
            return [245, 158, 11]; // amber
        default:
            return [107, 114, 128]; // gray
    }
};


import api from "../../api";
import type { CreatePrescriptionPayload } from "@/types/prescription";


export const prescriptionsService = {

    // Create a prescription for an appointment By Doctor Only
    createPrescription: async (payload: CreatePrescriptionPayload) => {
        try {
            const response = await api.post("/prescriptions", payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};
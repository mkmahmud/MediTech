
import api from "../../api";
import type {
    CreatePrescriptionPayload,
    GetPrescriptionsQuery,
    GetPrescriptionsResponse,
    Prescription,
} from "@/types/prescription";


export const prescriptionsService = {

    // Create a prescription for an appointment By Doctor Only
    createPrescription: async (payload: CreatePrescriptionPayload) => {
        try {
            const response = await api.post("/prescriptions", payload);
            return response.data?.data;
        } catch (error) {
            throw error;
        }
    },

    getPrescriptions: async (query: GetPrescriptionsQuery = {}) => {
        const params: Record<string, string | number> = {};

        if (query.patientId) params.patientId = query.patientId;
        if (query.doctorId) params.doctorId = query.doctorId;
        if (query.status) params.status = query.status;
        if (typeof query.limit === "number") params.limit = query.limit;
        if (typeof query.offset === "number") params.offset = query.offset;

        const response = await api.get<GetPrescriptionsResponse>("/prescriptions", { params });
        return response.data?.data;
    },

    getPrescriptionById: async (id: string) => {
        const response = await api.get<{ status: boolean, message: string, data: Prescription }>(`/prescriptions/${id}`);
        return response.data?.data;
    },

};
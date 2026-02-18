
import api from "../api";
import type { DoctorAvailability } from "@/types/doctors";


export const doctorService = {
    // Get All Availabilities for a Doctor
    getAvailability: async (doctorId: any) => {
        const response = await api.get<DoctorAvailability>(`/doctors/${doctorId}/availability`);
        return response.data;
    },

    // Create or Update Availability for a Doctor
    setAvailability: async (doctorId: any, availabilityData: any) => {
        const response = await api.post(`/doctors/${doctorId}/availability`, availabilityData);
        return response.data;
    },

};

import api from "../api";
import type { DoctorAvailability } from "@/types/doctors";


export const doctorService = {

    // Get All Doctors
    getAllDoctors: async ({ specialization, name, days, page, limit }: { specialization?: string | null; name?: string; days?: number[]; page: number; limit: number }) => {
        const params: any = { page, limit };

        if (specialization) params.specialization = specialization;
        if (name) params.name = name;
        if (days && days.length > 0) params.days = days;

        const response = await api.get("/users/doctors", { params });
        return response.data;
    },

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

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
        return response.data?.data;
    },

    // Get Doctor Profile by ID (userId is passed)
    getDoctorById: async (userId: string) => {
        const response = await api.get(`/doctors/${userId}/profile`);
        return response.data?.data;
    },

    // Get All Availabilities for a Doctor (userId is passed)
    getAvailability: async (userId: string) => {
        const response = await api.get<DoctorAvailability>(`/doctors/${userId}/availability`);
        return response.data?.data;
    },

    // Create or Update Availability for a Doctor (userId is passed)
    setAvailability: async (userId: string, availabilityData: any) => {
        const response = await api.post(`/doctors/${userId}/availability`, availabilityData);
        return response.data?.data;
    },

};
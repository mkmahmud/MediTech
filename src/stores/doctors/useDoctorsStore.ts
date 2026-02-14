import api from '@/lib/api';
import type { User } from '@/types/user';
import { create } from 'zustand';

interface DoctorStore {
    doctors: Partial<User[]>;
    isLoading: boolean;
    fetchDoctors: () => Promise<void>;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
    doctors: [],
    isLoading: false,
    fetchDoctors: async () => {
        set({ isLoading: true });
        try {
            const response = await api.get<User[]>("/users/doctors");
            set({ doctors: response.data });
        } catch (error) {
            console.error("Error fetching doctors", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
import type { User } from "@/types/user";
import api from "../api";


export const userService = {
    // Get current user profile (includes Doctor/Patient relations)
    getProfile: async () => {
        const response = await api.get<User>("/auth/me");
        return response.data;
    },

    // Update profile data
    updateProfile: async (data: Partial<User>) => {
        const response = await api.patch<User>("/users/profile", data);
        return response.data;
    }
};
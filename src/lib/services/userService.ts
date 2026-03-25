import type { User, UserStatus } from "@/types/user";
import api from "../api";


export const userService = {

    // Get All User only admin can access this
    getAllUsers: async (params: Record<string, any>) => {
        // Remove empty params
        const filteredParams: Record<string, any> = {};
        Object.keys(params).forEach((key) => {
            if (
                params[key] !== undefined &&
                params[key] !== null &&
                params[key] !== ""
            ) {
                filteredParams[key] = params[key];
            }
        });

        const config = Object.keys(filteredParams).length > 0 ? { params: filteredParams } : undefined;
        const response = await api.get("/users", config);
        return response.data?.data;
    },

    // Update User status only admin can access this
    updateUserStatus: async (userId: string, status: UserStatus) => {
        const response = await api.patch(`/users/${userId}/status`, { status });
        return response.data?.data;
    },

    // SOft delete user only admin can access this
    deleteUser: async (userId: string) => {
        const response = await api.patch(`/users/${userId}/delete`);
        return response.data?.data;
    },

    // Get current user profile (includes Doctor/Patient relations)
    getProfile: async () => {
        const response = await api.get<any>("/auth/me");
        return response.data?.data;
    },

    // Update profile data
    updateProfile: async (data: Partial<User>) => {
        const response = await api.patch<any>("/users/profile", data);
        return response.data?.data;
    }
};
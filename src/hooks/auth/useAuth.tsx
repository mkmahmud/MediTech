import { useCallback } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/stores/auth/useAuthStore';

export const useAuth = () => {
    const { setAuth, clearAuth } = useAuthStore();


    // Create Account
    const register = useCallback(async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    }, []);


    // Login
    const login = useCallback(async (credentials: any) => {
        const { data } = await api.post('/auth/login', credentials);
        setAuth(data.user, data.accessToken, data.refreshToken);
        return data;
    }, [setAuth]);

    // Get Refresh Token 
    const refresh = useCallback(async () => {
        const token = localStorage.getItem('medi_rt_key');
        if (!token) throw new Error("No refresh token");

        const { data } = await api.post('/auth/refresh', { refreshToken: token });
        setAuth(data.user, data.accessToken, data.refreshToken);
        return data;
    }, [setAuth]);

    // Logout
    const logout = useCallback(async () => {
        await api.post('/auth/logout');
        clearAuth();
    }, [clearAuth]);


    // Create a new user (Admin only)
    const createUser = useCallback(async (userData: any) => {
        const response = await api.post('/auth/create-user', userData);
        return response.data;
    }, []);

    // Change Password
    const changePassword = useCallback(async (data: any) => {
        const response = await api.post('/auth/change-password', data);
        return response
    }, [])

    return { register, login, refresh, logout, createUser, changePassword };
};
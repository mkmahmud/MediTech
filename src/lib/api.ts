import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '../stores/auth/useAuthStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        const data = error.response?.data as any;
        const status = error.response?.status;
        const isRefreshEndpoint = error.config?.url?.includes('/auth/refresh');

        // Don't show toasts for refresh endpoint errors (handled silently in bootstrap)
        if (isRefreshEndpoint) {
            return Promise.reject(error);
        }

        if (status === 400 && data?.errors) {
            data.errors.forEach((e: any) => toast.error("VALIDATION_ERROR", { description: e.message }));
        }
        else if (status === 401) {
            toast.error("UNAUTHORIZED", { description: "Session expired." });
        }
        else if (status === 404) {
            console.error("Endpoint not found. Check if baseURL or path is correct:", error.config?.url);
        }
        else {
            toast.error("SYSTEM_ERROR", { description: data?.message || "Internal Protocol Error" });
        }

        return Promise.reject(error);
    }
);

export default api;
import api from '../api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
}

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface UserData {
    [key: string]: any;
}

interface AuthResponse {
    user: UserData;
    accessToken: string;
    refreshToken: string;
}

/**
 * Authentication Service
 * Handles all API calls related to authentication
 */
export const authService = {
    /**
     * Register a new user account
     */
    register: async (data: RegisterData) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    /**
     * Login user with email and password
     */
    login: async (credentials: LoginCredentials) => {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    /**
     * Refresh access token using refresh token
     */
    refresh: async (refreshToken: string) => {
        const response = await api.post<AuthResponse>('/auth/refresh', {
            refreshToken
        });
        return response.data;
    },

    /**
     * Logout user and invalidate token
     */
    logout: async () => {
        return await api.post('/auth/logout');
    },

    /**
     * Create a new user (Admin only)
     */
    createUser: async (userData: UserData) => {
        const response = await api.post('/auth/create-user', userData);
        return response.data;
    },

    /**
     * Change password for current user
     */
    changePassword: async (data: ChangePasswordData) => {
        const response = await api.post('/auth/change-password', data);
        return response.data;
    },

    /**
     * Verify email address
     */
    verifyEmail: async (token: string) => {
        const response = await api.post('/auth/verify-email', { token });
        return response.data;
    },

    /**
     * Request password reset
     */
    requestPasswordReset: async (email: string) => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    /**
     * Reset password with token
     */
    resetPassword: async (token: string, newPassword: string) => {
        const response = await api.post('/auth/reset-password', {
            token,
            newPassword
        });
        return response.data;
    },

    /**
     * Enable two-factor authentication
     */
    enableTwoFactor: async () => {
        const response = await api.post('/auth/2fa/enable');
        return response.data;
    },

    /**
     * Disable two-factor authentication
     */
    disableTwoFactor: async (code: string) => {
        const response = await api.post('/auth/2fa/disable', { code });
        return response.data;
    },

    /**
     * Verify two-factor code
     */
    verifyTwoFactorCode: async (code: string) => {
        const response = await api.post('/auth/2fa/verify', { code });
        return response.data;
    }
};

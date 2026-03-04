import { useCallback, useRef } from 'react';
import { useAuthStore } from '@/stores/auth/useAuthStore';
import { toast } from 'sonner';
import { getTokenExpirationTime, isTokenExpired } from '@/lib/jwt';
import { authService } from '@/lib/services/authService';

export const useAuth = () => {
    const { setAuth, clearAuth } = useAuthStore();
    // @ts-ignore
    const tokenTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    /**
     * Setup automatic logout when token expires
     */
    const setupTokenExpirationListener = useCallback((token: string) => {
        // Clear any existing timeout
        if (tokenTimeoutRef.current) {
            clearTimeout(tokenTimeoutRef.current);
        }

        // Check if token is already expired
        if (isTokenExpired(token)) {
            clearAuth();
            toast.info("Session_Expired_Please_Login_Again");
            return;
        }

        // Get remaining time
        const remainingTime = getTokenExpirationTime(token);
        if (remainingTime === null) {
            console.warn("Could not determine token expiration time");
            return;
        }

        // Set timeout to logout before token expires (5 seconds before actual expiration)
        const logoutTime = Math.max(remainingTime - 5000, 1000);

        tokenTimeoutRef.current = setTimeout(() => {
            console.log("Token expired, auto-logging out...");
            clearAuth();
            toast.warning("Token_Expired_Auto_Logout");
            window.location.href = '/auth/login';
        }, logoutTime);

        console.log(`Token expiration listener set for ${logoutTime}ms`);
    }, [clearAuth]);

    /**
     * Cleanup token expiration listener
     */
    const clearTokenExpirationListener = useCallback(() => {
        if (tokenTimeoutRef.current) {
            clearTimeout(tokenTimeoutRef.current);
            tokenTimeoutRef.current = null;
        }
    }, []);

    // Create Account
    const register = useCallback(async (data: any) => {
        return await authService.register(data);
    }, []);


    // Login
    const login = useCallback(async (credentials: any) => {
        const data = await authService.login(credentials);
        // @ts-ignore
        setAuth(data.user, data.accessToken, data.refreshToken);

        // Setup token expiration listener after successful login
        setupTokenExpirationListener(data.accessToken);

        return data;
    }, [setAuth, setupTokenExpirationListener]);

    // Get Refresh Token 
    const refresh = useCallback(async () => {
        const token = localStorage.getItem('medi_rt_key');
        if (!token) throw new Error("No refresh token");

        const data = await authService.refresh(token);
        // @ts-ignore
        setAuth(data.user, data.accessToken, data.refreshToken);

        // Setup token expiration listener for the new access token
        setupTokenExpirationListener(data.accessToken);

        return data;
    }, [setAuth, setupTokenExpirationListener]);

    // Logout
    const logout = useCallback(async () => {
        clearTokenExpirationListener();
        await authService.logout();
        clearAuth();
    }, [clearAuth, clearTokenExpirationListener]);


    // Create a new user (Admin only)
    const createUser = useCallback(async (userData: any) => {
        return await authService.createUser(userData);
    }, []);

    // Change Password
    const changePassword = useCallback(async (data: any) => {
        return await authService.changePassword(data);
    }, []);

    // Verify Email
    const verifyEmail = useCallback(async (token: string) => {
        return await authService.verifyEmail(token);
    }, []);

    // Request Password Reset
    const requestPasswordReset = useCallback(async (email: string) => {
        return await authService.requestPasswordReset(email);
    }, []);

    // Reset Password
    const resetPassword = useCallback(async (token: string, newPassword: string) => {
        return await authService.resetPassword(token, newPassword);
    }, []);

    // Enable Two-Factor Authentication
    const enableTwoFactor = useCallback(async () => {
        return await authService.enableTwoFactor();
    }, []);

    // Disable Two-Factor Authentication
    const disableTwoFactor = useCallback(async (code: string) => {
        return await authService.disableTwoFactor(code);
    }, []);

    // Verify Two-Factor Code
    const verifyTwoFactorCode = useCallback(async (code: string) => {
        return await authService.verifyTwoFactorCode(code);
    }, []);

    return {
        register,
        login,
        refresh,
        logout,
        createUser,
        changePassword,
        verifyEmail,
        requestPasswordReset,
        resetPassword,
        enableTwoFactor,
        disableTwoFactor,
        verifyTwoFactorCode,
        setupTokenExpirationListener,
        clearTokenExpirationListener
    };
};
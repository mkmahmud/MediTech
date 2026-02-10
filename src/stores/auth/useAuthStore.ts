import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isInitialized: boolean;

    // Actions
    setAuth: (user: User, access: string, refresh: string) => void;
    clearAuth: () => void;
    setInitialized: (val: boolean) => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => {
    const savedUser = localStorage.getItem('medi_user_data');
    const savedRefresh = localStorage.getItem('medi_rt_key');

    return {
        user: savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null,
        refreshToken: savedRefresh && savedRefresh !== 'undefined' ? savedRefresh : null,
        accessToken: null,
        isInitialized: false,

        setAuth: (user, access, refresh) => {
            localStorage.setItem('medi_user_data', JSON.stringify(user));
            localStorage.setItem('medi_rt_key', refresh);
            set({ user, accessToken: access, refreshToken: refresh });
        },

        clearAuth: () => {
            localStorage.removeItem('medi_user_data');
            localStorage.removeItem('medi_rt_key');
            set({ user: null, accessToken: null, refreshToken: null });
        },

        setInitialized: (val) => set({ isInitialized: val }),
        updateUser: (user) => {
            localStorage.setItem('medi_user_data', JSON.stringify(user));
            set({ user });
        },
    };
});
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

    setAuth: (user: User, access: string, refresh: string) => void;
    clearAuth: () => void;
    setInitialized: (val: boolean) => void;
    updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            refreshToken: null,
            accessToken: null,
            isInitialized: false,

            setAuth: (user, access, refresh) => {
                set({ user, accessToken: access, refreshToken: refresh });
            },

            clearAuth: () => {
                set({ user: null, accessToken: null, refreshToken: null });
            },

            setInitialized: (val) => set({ isInitialized: val }),
            updateUser: (user) => set({ user }),
        }),
        {
            name: 'medi_auth_store',
            partialize: (state) => ({
                user: state.user,
                refreshToken: state.refreshToken,
                accessToken: state.accessToken,
            }),
        }
    )
);
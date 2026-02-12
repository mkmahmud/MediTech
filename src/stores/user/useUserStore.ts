import type { User } from '@/types/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    updateUserStatus: (status: User['status']) => void;
    updateProfileImage: (url: string) => void;
    clearAuth: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            setUser: (user) => set({
                user,
                isAuthenticated: !!user,
                isLoading: false
            }),

            updateUserStatus: (status) => set((state) => ({
                user: state.user ? { ...state.user, status } : null
            })),

            updateProfileImage: (url) => set((state) => ({
                user: state.user ? { ...state.user, profileImageUrl: url } : null
            })),

            clearAuth: () => set({
                user: null,
                isAuthenticated: false
            }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
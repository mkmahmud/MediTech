import { create } from 'zustand';

interface NotificationStore {
    unreadCount: number;
    isNotificationPanelOpen: boolean;
    setUnreadCount: (count: number) => void;
    incrementUnreadCount: () => void;
    decrementUnreadCount: (amount?: number) => void;
    toggleNotificationPanel: () => void;
    closeNotificationPanel: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
    unreadCount: 0,
    isNotificationPanelOpen: false,

    setUnreadCount: (count) => set({ unreadCount: count }),

    incrementUnreadCount: () =>
        set((state) => ({ unreadCount: state.unreadCount + 1 })),

    decrementUnreadCount: (amount = 1) =>
        set((state) => ({ unreadCount: Math.max(0, state.unreadCount - amount) })),

    toggleNotificationPanel: () =>
        set((state) => ({ isNotificationPanelOpen: !state.isNotificationPanelOpen })),

    closeNotificationPanel: () =>
        set({ isNotificationPanelOpen: false }),
}));

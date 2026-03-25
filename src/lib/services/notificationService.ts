import api from '../api';
import type { Notification, NotificationFilters, NotificationResponse, UnreadCountResponse } from '../../types/notification';
import { useAuthStore } from '../../stores/auth/useAuthStore';

export const notificationService = {
    // Get current user's notifications
    getMyNotifications: async (filters?: NotificationFilters): Promise<NotificationResponse> => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) throw new Error('User not authenticated');

        const params = new URLSearchParams();
        if (filters?.type) params.append('type', filters.type);
        if (filters?.read !== undefined) params.append('read', filters.read.toString());
        if (filters?.limit) params.append('limit', filters.limit.toString());
        if (filters?.offset) params.append('offset', filters.offset.toString());

        try {
            const { data } = await api.get<any[] | any>(
                `/notifications/my-notifications?${params.toString()}`
            );

            // If backend returns { data: [...] }
            if (data && Array.isArray(data?.data)) {
                const offset = filters?.offset || 0;
                const limit = filters?.limit || 20;
                const paginatedData = data?.data.slice(offset, offset + limit);
                return {
                    data: paginatedData,
                    // @ts-ignore
                    total: data?.data.length,
                    limit,
                    offset,
                    hasMore: offset + paginatedData.length < data?.data.length,
                };
            }

            // Handle if backend returns array directly (not paginated)
            if (Array.isArray(data)) {
                const offset = filters?.offset || 0;
                const limit = filters?.limit || 20;
                const paginatedData = data.slice(offset, offset + limit);

                return {
                    // @ts-ignore
                    data: paginatedData,
                    total: data.length,
                    limit,
                    offset,
                    hasMore: offset + paginatedData.length < data.length,
                };
            }

            // Handle if backend returns paginated response
            return data as NotificationResponse;
        } catch (error) {
            console.error('Error fetching notifications:', error);
            throw error;
        }
    },

    // Get unread notification count
    getUnreadCount: async (): Promise<number> => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) throw new Error('User not authenticated');

        const { data } = await api.get<UnreadCountResponse | { count: number }>(
            `/notifications/unread-count`
        );

        // Handle both response formats
        return 'unreadCount' in data ? data.unreadCount : data.count;
    },

    // Mark specific notifications as read
    markAsRead: async (notificationIds: string[]): Promise<void> => {
        await api.put('/notifications/mark-read', { notificationIds });
    },

    // Mark all notifications as read
    markAllAsRead: async (): Promise<void> => {
        const userId = useAuthStore.getState().user?.id;
        if (!userId) throw new Error('User not authenticated');

        await api.put(`/notifications/${userId}/mark-all-read`);
    },

    // Get notification by ID
    getNotificationById: async (id: string): Promise<Notification> => {
        const { data } = await api.get<Notification>(`/notifications/${id}`);
        return data;
    },

    // Delete a notification
    deleteNotification: async (id: string): Promise<void> => {
        await api.delete(`/notifications/${id}`);
    },

    // Delete multiple notifications
    bulkDelete: async (notificationIds: string[]): Promise<void> => {
        await api.delete('/notifications/bulk', { data: { notificationIds } });
    },
};

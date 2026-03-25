// Match backend Prisma model
export type NotificationType = 'APPOINTMENT_REMINDER' | 'APPOINTMENT_CONFIRMED' | 'APPOINTMENT_CANCELLED' | 'TEST_RESULT' | 'GENERAL';

export interface Notification {
    id: string;
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    data: string | null; // JSON string for additional data
    read: boolean;
    readAt: string | null;
    scheduledFor: string | null;
    sentAt: string | null;
    createdAt: string;
    user?: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

// Helper to parse notification data
export function parseNotificationData(notification: Notification): Record<string, any> | null {
    if (!notification.data) return null;
    try {
        return JSON.parse(notification.data);
    } catch {
        return null;
    }
}

// Helper to get link from notification data
export function getNotificationLink(notification: Notification): string | null {
    const data = parseNotificationData(notification);
    return data?.link || null;
}

export interface NotificationFilters {
    userId?: string;
    type?: NotificationType;
    read?: boolean;
    limit?: number;
    offset?: number;
}

export interface NotificationResponse {
    status: boolean;
    message: string;
    data: {
        data: Notification[];
        total: number;
        limit: number;
        offset: number;
        hasMore: boolean;
    }
}

export interface UnreadCountResponse {
    userId: string;
    unreadCount: number;
}

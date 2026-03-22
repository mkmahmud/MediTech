import { useEffect, useRef, useCallback } from 'react';
import { CheckCheck, Loader2, AlertCircle, Bell } from 'lucide-react';
import { useNotificationStore } from '../../../stores/notifications/useNotificationStore';
import { useAuthStore } from '../../../stores/auth/useAuthStore';
import { useNotificationSocket } from '../../../hooks/useNotificationSocket';
import { useNotifications, useMarkAllAsRead } from '../../../hooks/useNotifications';
import { useQueryClient } from '@tanstack/react-query';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import type { Notification, NotificationResponse } from '../../../types/notification';
 

export const NotificationPanel = () => {

 

    const { isNotificationPanelOpen, closeNotificationPanel, unreadCount } = useNotificationStore();
    const incrementUnreadCount = useNotificationStore((state) => state.incrementUnreadCount);
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const panelRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = useNotifications({ limit: 20 }, isNotificationPanelOpen);
    const markAllAsRead = useMarkAllAsRead();

    // Handle incoming socket notifications

    const handleSocketNotification = useCallback((notification: Notification) => {
        // Optimistically update the notifications cache
        queryClient.setQueryData([
            'notifications', 'list', { limit: 20 }
        ], (oldData: NotificationResponse | undefined) => {
            if (!oldData) {
                return { data: [notification], total: 1, limit: 20, offset: 0, hasMore: false };
            }
            // Avoid duplicates
            if (oldData.data.some((n: Notification) => n.id === notification.id)) return oldData;
            return {
                ...oldData,
                data: [notification, ...oldData.data].slice(0, 20),
                total: (oldData.total || 0) + 1,
            };
        });
        incrementUnreadCount();
    }, [queryClient, incrementUnreadCount]);

    useNotificationSocket(handleSocketNotification, user?.id);
    

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                closeNotificationPanel();
            }
        };

        if (isNotificationPanelOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isNotificationPanelOpen, closeNotificationPanel]);

    if (!isNotificationPanelOpen) return null;

    const notifications = data?.data || [];
    const hasNotifications = notifications.length > 0;

    


    return (
        <div
            ref={panelRef}
            className={cn(
                'absolute -right-20 top-full mt-2 w-96 max-w-[calc(100vw-2rem)]',
                'bg-background border rounded-lg shadow-lg overflow-hidden z-50',
                'animate-in fade-in slide-in-from-top-2 duration-200'
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                <div>
                    <h3 className="font-semibold text-base">Notifications</h3>
                    {unreadCount > 0 && (
                        <p className="text-xs text-muted-foreground">
                            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    {hasNotifications && unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAllAsRead.mutate()}
                            disabled={markAllAsRead.isPending}
                            title="Mark all as read"
                        >
                            <CheckCheck className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="max-h-[70vh] overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
                        <p className="text-sm text-muted-foreground">Failed to load notifications</p>
                    </div>
                ) : !hasNotifications ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                            <Bell className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <p className="font-medium mb-1">No notifications</p>
                        <p className="text-sm text-muted-foreground">
                            You're all caught up! Check back later.
                        </p>
                    </div>
                ) : (
                    <div>
                        {notifications.map((notification: Notification) => (
                            <NotificationItem key={notification.id} notification={notification} />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            {hasNotifications && (
                <div className="p-3 border-t bg-muted/30">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-sm"
                        onClick={() => {
                            closeNotificationPanel();
                            // You can add navigation to a full notifications page here
                        }}
                    >
                        View all notifications
                    </Button>
                </div>
            )}
        </div>
    );
};

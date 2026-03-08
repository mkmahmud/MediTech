import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../lib/services/notificationService';
import { useNotificationStore } from '../stores/notifications/useNotificationStore';
import { toast } from 'sonner';
import type { NotificationFilters } from '../types/notification';
import { useEffect } from 'react';

const NOTIFICATION_KEYS = {
  all: ['notifications'] as const,
  list: (filters?: NotificationFilters) => [...NOTIFICATION_KEYS.all, 'list', filters] as const,
  unreadCount: () => [...NOTIFICATION_KEYS.all, 'unreadCount'] as const,
};

export const NOTIFICATION_QUERY_KEYS = NOTIFICATION_KEYS;

// Custom hook to fetch notifications with polling
export const useNotifications = (filters?: NotificationFilters, enablePolling = true) => {
  // Convert page-based to offset-based pagination
  const offset = filters?.offset || 0;
  const limit = filters?.limit || 20;
  
  return useQuery({
    queryKey: NOTIFICATION_KEYS.list(filters),
    queryFn: () => notificationService.getMyNotifications({ ...filters, offset, limit }),
    refetchInterval: enablePolling ? 30000 : false, // Poll every 30 seconds
    staleTime: 25000, // Consider data stale after 25 seconds
  });
};

// Custom hook to fetch unread count with polling
export const useUnreadCount = (enablePolling = true) => {
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  const query = useQuery({
    queryKey: NOTIFICATION_KEYS.unreadCount(),
    queryFn: notificationService.getUnreadCount,
    refetchInterval: enablePolling ? 30000 : false, // Poll every 30 seconds
    staleTime: 25000,
  });

  // Update the store whenever count changes
  useEffect(() => {
    if (query.data !== undefined) {
      setUnreadCount(query.data);
    }
  }, [query.data, setUnreadCount]);

  return query;
};

// Mutation to mark notifications as read
export const useMarkAsRead = () => {
  const queryClient = useQueryClient();
  const decrementUnreadCount = useNotificationStore((state) => state.decrementUnreadCount);

  return useMutation({
    mutationFn: (notificationIds: string[]) => notificationService.markAsRead(notificationIds),
    onSuccess: (_, notificationIds) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      decrementUnreadCount(notificationIds.length);
    },
    onError: () => {
      toast.error('Failed to mark as read');
    },
  });
};

// Mutation to mark all as read
export const useMarkAllAsRead = () => {
  const queryClient = useQueryClient();
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    },
    onError: () => {
      toast.error('Failed to mark all as read');
    },
  });
};

// Mutation to delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: string) => notificationService.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      toast.success('Notification deleted');
    },
    onError: () => {
      toast.error('Failed to delete notification');
    },
  });
};

// Mutation to bulk delete notifications
export const useBulkDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationIds: string[]) => notificationService.bulkDelete(notificationIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEYS.all });
      toast.success('Notifications deleted');
    },
    onError: () => {
      toast.error('Failed to delete notifications');
    },
  });
};

import { formatDistanceToNow } from 'date-fns';
import { X, Check, Bell, CheckCircle, AlertCircle, Info, Calendar, FileText } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { Notification, NotificationType } from '../../../types/notification';
import { getNotificationLink } from '../../../types/notification';
import { cn } from '../../../lib/utils';
import { useMarkAsRead, useDeleteNotification } from '../../../hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
}

const ICON_MAP: Record<NotificationType, typeof Bell> = {
  APPOINTMENT_REMINDER: Calendar,
  APPOINTMENT_CONFIRMED: CheckCircle,
  APPOINTMENT_CANCELLED: AlertCircle,
  TEST_RESULT: FileText,
  GENERAL: Info,
};

const ICON_COLOR_MAP: Record<NotificationType, string> = {
  APPOINTMENT_REMINDER: 'text-blue-500',
  APPOINTMENT_CONFIRMED: 'text-green-500',
  APPOINTMENT_CANCELLED: 'text-red-500',
  TEST_RESULT: 'text-purple-500',
  GENERAL: 'text-gray-500',
};

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const navigate = useNavigate();
  const markAsRead = useMarkAsRead();
  const deleteNotification = useDeleteNotification();

  const Icon = ICON_MAP[notification.type] || Bell;
  const iconColor = ICON_COLOR_MAP[notification.type] || 'text-gray-500';

  const handleClick = () => {
    if (!notification.read) {
      markAsRead.mutate([notification.id]);
    }
    const link = getNotificationLink(notification);
    if (link) {
      navigate(link);
    }
  };

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read) {
      markAsRead.mutate([notification.id]);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNotification.mutate(notification.id);
  };

  return (
    <div
      className={cn(
        'group relative flex gap-3 p-4 transition-colors hover:bg-accent cursor-pointer border-b last:border-b-0',
        !notification.read && 'bg-blue-50/50 dark:bg-blue-950/20'
      )}
      onClick={handleClick}
    >
      {/* Icon */}
      <div className={cn('flex-shrink-0 mt-1', iconColor)}>
        <Icon className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn('text-sm font-medium', !notification.read && 'font-semibold')}>
            {notification.title}
          </h4>
          
          {/* Unread indicator */}
          {!notification.read && (
            <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {notification.message}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>

          {/* Actions (visible on hover) */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!notification.read && (
              <button
                onClick={handleMarkAsRead}
                className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-foreground transition-colors"
                title="Mark as read"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-1.5 rounded-md hover:bg-background text-muted-foreground hover:text-red-500 transition-colors"
              title="Delete"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

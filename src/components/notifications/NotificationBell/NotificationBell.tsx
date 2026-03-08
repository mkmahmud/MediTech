import { Bell } from 'lucide-react';
import { useNotificationStore } from '../../../stores/notifications/useNotificationStore';
import { useUnreadCount } from '../../../hooks/useNotifications';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';

export const NotificationBell = () => {
  const { unreadCount, toggleNotificationPanel } = useNotificationStore();
  
  // Poll for unread count every 30 seconds
  useUnreadCount(true);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={toggleNotificationPanel}
      aria-label="Notifications"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white",
            unreadCount > 99 && "text-[8px]"
          )}
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Button>
  );
};

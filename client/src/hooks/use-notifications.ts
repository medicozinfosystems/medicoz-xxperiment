import { useEffect, useRef } from 'react';
import { showBrowserNotification } from '@/lib/notifications';

interface Notification {
  id: string;
  type: 'comment' | 'like';
  message: string;
  postId: string;
  postTitle: string;
  from: string;
  timestamp: string;
}

export function useNotificationPolling(isAuthenticated: boolean, pushEnabled: boolean) {
  const pollingInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    console.log('[Notifications] Poll status:', { isAuthenticated, pushEnabled });
    
    if (!isAuthenticated || !pushEnabled) {
      console.log('[Notifications] Polling disabled');
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
      return;
    }

    console.log('[Notifications] Starting notification polling...');

    // Poll for notifications every 10 seconds
    const checkNotifications = async () => {
      try {
        console.log('[Notifications] Checking for new notifications...');
        const response = await fetch('/api/notifications/pending');
        if (response.ok) {
          const data = await response.json();
          const notifications: Notification[] = data.notifications || [];

          console.log('[Notifications] Received:', notifications.length, 'notifications', notifications);

          // Show browser notification for each new notification
          if (notifications.length > 0) {
            // Check permission first
            if (Notification.permission !== 'granted') {
              console.warn('[Notifications] Permission not granted. Current permission:', Notification.permission);
              // Try to request permission
              const permission = await Notification.requestPermission();
              console.log('[Notifications] Permission result:', permission);
              if (permission !== 'granted') {
                return;
              }
            }

            notifications.forEach(notification => {
              console.log('[Notifications] Showing notification:', notification.message);
              try {
                showBrowserNotification(notification.message, {
                  body: `On: "${notification.postTitle}"`,
                  tag: notification.type,
                  icon: '/xxperiment/logo.png', // Optional icon
                  requireInteraction: false,
                  data: {
                    postId: notification.postId
                  }
                });
              } catch (err) {
                console.error('[Notifications] Error showing notification:', err);
              }
            });
          }
        }
      } catch (error) {
        console.error('[Notifications] Failed to fetch notifications:', error);
      }
    };

    // Check immediately on mount
    checkNotifications();

    // Then poll every 10 seconds
    pollingInterval.current = setInterval(checkNotifications, 10000);

    return () => {
      console.log('[Notifications] Cleaning up polling interval');
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [isAuthenticated, pushEnabled]);
}


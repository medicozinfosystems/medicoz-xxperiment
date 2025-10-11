// Notification utility functions
// For real email/push notifications, you would integrate:
// - Email: SendGrid, AWS SES, Resend, etc.
// - Push: Firebase Cloud Messaging, OneSignal, etc.

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
}

// Browser notification permission
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

// Show browser notification
export const showBrowserNotification = async (
  title: string,
  options?: NotificationOptions
): Promise<void> => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options,
    });
  }
};

// Notification types for the forum
export const notifyNewComment = (postTitle: string, enabled: boolean) => {
  if (enabled) {
    showBrowserNotification('New Comment', {
      body: `Someone commented on your post: "${postTitle}"`,
      tag: 'comment',
    });
  }
};

export const notifyPostLiked = (postTitle: string, enabled: boolean) => {
  if (enabled) {
    showBrowserNotification('Post Liked', {
      body: `Someone liked your post: "${postTitle}"`,
      tag: 'like',
    });
  }
};

export const notifyNewReply = (postTitle: string, enabled: boolean) => {
  if (enabled) {
    showBrowserNotification('New Reply', {
      body: `Someone replied to your comment on: "${postTitle}"`,
      tag: 'reply',
    });
  }
};

// For production, you would implement server-side email notifications:
// Example structure for email service
export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

// This would be implemented on the server side
export const sendEmailNotification = async (notification: EmailNotification) => {
  // Example using SendGrid:
  // const response = await fetch('/api/notifications/email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(notification),
  // });
  // return response.ok;
  
  console.log('[Email Notification] Would send:', notification);
  return true;
};



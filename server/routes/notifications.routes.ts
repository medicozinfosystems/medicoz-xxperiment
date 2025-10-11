import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getPostsCollection } from '../db/mongodb';
import { requireAuth } from '../middleware/auth';
import { getUserById } from '../utils/auth';
import { sendEmail, createCommentNotificationEmail, createLikeNotificationEmail } from '../utils/email';

const router = Router();

// Helper to check if user has email notifications enabled
async function shouldNotifyUser(userId: ObjectId): Promise<{ email: boolean; userEmail?: string; displayName?: string }> {
  const user = await getUserById(userId.toString());
  return {
    email: user?.notificationSettings?.email ?? false,
    userEmail: user?.email,
    displayName: user?.displayName || user?.username
  };
}

// Notify post author of new comment
export async function notifyNewComment(postId: ObjectId, commenterId: ObjectId, commenterName: string, commentContent: string) {
  try {
    const postsCollection = await getPostsCollection();
    const post = await postsCollection.findOne({ _id: postId });
    
    if (!post || post.userId.equals(commenterId)) {
      // Don't notify if commenter is the post author
      return;
    }
    
    const notifications = await shouldNotifyUser(post.userId);
    
    if (notifications.email && notifications.userEmail && notifications.displayName) {
      // Send email notification
      const postUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/forum/post/${postId.toString()}`;
      const emailHtml = createCommentNotificationEmail(
        notifications.displayName,
        commenterName,
        post.title,
        commentContent,
        postUrl
      );
      
      await sendEmail({
        to: notifications.userEmail,
        subject: `${commenterName} commented on your post: "${post.title}"`,
        html: emailHtml
      });
      
      console.log(`[EMAIL] Sent comment notification to ${notifications.userEmail} for post "${post.title}"`);
    }
  } catch (error) {
    console.error('Error sending new comment notification:', error);
  }
}

// Notify post author of new like
export async function notifyPostLiked(postId: ObjectId, likerId: ObjectId, likerName: string) {
  try {
    const postsCollection = await getPostsCollection();
    const post = await postsCollection.findOne({ _id: postId });
    
    if (!post || post.userId.equals(likerId)) {
      // Don't notify if liker is the post author
      return;
    }
    
    const notifications = await shouldNotifyUser(post.userId);
    
    if (notifications.email && notifications.userEmail && notifications.displayName) {
      // Send email notification
      const postUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/forum/post/${postId.toString()}`;
      const emailHtml = createLikeNotificationEmail(
        notifications.displayName,
        likerName,
        post.title,
        postUrl
      );
      
      await sendEmail({
        to: notifications.userEmail,
        subject: `${likerName} liked your post: "${post.title}"`,
        html: emailHtml
      });
      
      console.log(`[EMAIL] Sent like notification to ${notifications.userEmail} for post "${post.title}"`);
    }
  } catch (error) {
    console.error('Error sending post liked notification:', error);
  }
}

export default router;


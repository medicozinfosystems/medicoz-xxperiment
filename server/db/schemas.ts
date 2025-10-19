import { ObjectId } from 'mongodb';

// User Schema
export interface User {
  _id?: ObjectId;
  username: string;
  email: string;
  passwordHash?: string; // Optional for OAuth users
  displayName?: string;
  avatar?: string;
  bio?: string;
  role: 'user' | 'moderator' | 'admin';
  isVerified: boolean; // Email verified
  isBanned: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  googleId?: string; // For Google OAuth
  authProvider: 'local' | 'google'; // How they signed up
  notificationSettings?: {
    email: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

// Episode Schema
export interface Episode {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  episodeNumber: number;
  releaseDate: Date;
  coverImage?: string;
  audioUrl?: string;
  duration?: number; // in seconds
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Post Schema
export interface Post {
  _id?: ObjectId;
  userId: ObjectId;
  episodeId?: ObjectId | null; // null for general discussions
  title: string;
  content: string;
  type: 'general' | 'episode'; // general discussion or episode-specific
  isAnonymous: boolean; // whether the post is anonymous
  isModerated: boolean;
  moderatedBy?: ObjectId;
  moderatedAt?: Date;
  moderationReason?: string;
  isPinned: boolean;
  isLocked: boolean;
  likes: number;
  likedBy: ObjectId[];
  commentCount: number;
  views: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  lastActivityAt: Date;
}

// Comment Schema
export interface Comment {
  _id?: ObjectId;
  postId: ObjectId;
  userId: ObjectId;
  content: string;
  isAnonymous: boolean; // whether the comment is anonymous
  parentCommentId?: ObjectId | null; // for nested replies
  isModerated: boolean;
  moderatedBy?: ObjectId;
  moderatedAt?: Date;
  moderationReason?: string;
  likes: number;
  likedBy: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Moderation Log Schema
export interface ModerationLog {
  _id?: ObjectId;
  moderatorId: ObjectId;
  action: 'flag' | 'remove' | 'ban' | 'warn' | 'approve';
  targetType: 'post' | 'comment' | 'user';
  targetId: ObjectId;
  reason: string;
  flaggedContent?: string;
  createdAt: Date;
}

// Session Schema (for user sessions)
export interface Session {
  _id?: ObjectId;
  userId: ObjectId;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Contact Form Schema
export interface ContactForm {
  _id?: ObjectId;
  name: string;
  email: string;
  message: string;
  intent: 'partnership' | 'pilot' | 'sponsorship' | 'careers';
  links?: string;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  isReplied: boolean;
  replyMessage?: string;
  repliedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Helper types for API responses
export type UserPublic = Omit<User, 'passwordHash' | 'email'>;

export interface PostWithUser extends Post {
  user: UserPublic;
  episode?: Episode;
}

export interface CommentWithUser extends Comment {
  user: UserPublic;
  replies?: CommentWithUser[];
}



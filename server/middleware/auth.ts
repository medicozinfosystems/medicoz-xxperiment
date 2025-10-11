import { Request, Response, NextFunction } from 'express';
import { getUserById } from '../utils/auth';
import type { User } from '../db/schemas';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
    interface User {
      _id?: import('mongodb').ObjectId;
      username: string;
      email: string;
      passwordHash?: string;
      displayName?: string;
      avatar?: string;
      bio?: string;
      role: 'user' | 'moderator' | 'admin';
      isVerified: boolean;
      isBanned: boolean;
      emailVerificationToken?: string;
      emailVerificationExpires?: Date;
      googleId?: string;
      authProvider: 'local' | 'google';
      notificationSettings?: {
        email: boolean;
      };
      createdAt: Date;
      updatedAt: Date;
      lastLogin?: Date;
    }
  }
}

/**
 * Middleware to check if user is authenticated
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const user = await getUserById(req.session.userId);
    
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: 'User not found' });
    }
    
    if (user.isBanned) {
      return res.status(403).json({ error: 'Account has been banned' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error' });
  }
}

/**
 * Middleware to check if user is a moderator or admin
 */
export async function requireModerator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'moderator' && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Moderator access required' });
  }
  
  next();
}

/**
 * Middleware to check if user is an admin
 */
export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  next();
}

/**
 * Optional auth - adds user to request if authenticated, but doesn't require it
 */
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session && req.session.userId) {
    try {
      const user = await getUserById(req.session.userId);
      if (user && !user.isBanned) {
        req.user = user;
      }
    } catch (error) {
      console.error('Optional auth error:', error);
    }
  }
  
  next();
}



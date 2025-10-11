import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import passport from 'passport';
import {
  createUser,
  authenticateUser,
  getPublicUserData,
  getUserById,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  verifyEmail
} from '../utils/auth';
import { requireAuth } from '../middleware/auth';
import { getPostsCollection, getCommentsCollection, getUsersCollection } from '../db/mongodb';
import { sendEmail, createEmailVerificationEmail } from '../utils/email';

const router = Router();

// Sign up
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, email, password, displayName } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    if (!isValidUsername(username)) {
      return res.status(400).json({ error: 'Username must be 3-20 characters, alphanumeric and underscore only' });
    }
    
    const passwordValidation = isValidPassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.message });
    }
    
    // Create user and get verification token
    const { user, verificationToken } = await createUser({ username, email, password, displayName });
    
    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/auth/verify-email?token=${verificationToken}`;
    const emailHtml = createEmailVerificationEmail(user.displayName || user.username, verificationUrl);
    
    // Send email (async, don't wait)
    sendEmail({
      to: user.email,
      subject: 'Verify your email - The XXperiment',
      html: emailHtml
    }).catch(err => console.error('[Signup] Failed to send verification email:', err));
    
    // Create session
    req.session.userId = user._id!.toString();
    req.session.role = user.role;
    
    res.status(201).json({
      message: 'Account created! Please check your email to verify your account.',
      user: getPublicUserData(user)
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message || 'Failed to create account' });
  }
});

// Sign in
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    if (!emailOrUsername || !password) {
      return res.status(400).json({ error: 'Email/username and password are required' });
    }
    
    const user = await authenticateUser(emailOrUsername, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create session
    req.session.userId = user._id!.toString();
    req.session.role = user.role;
    
    // Explicitly save session before sending response
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ error: 'Failed to save session' });
      }
      
      res.json({
        message: 'Signed in successfully',
        user: getPublicUserData(user)
      });
    });
  } catch (error: any) {
    console.error('Signin error:', error);
    res.status(400).json({ error: error.message || 'Failed to sign in' });
  }
});

// Sign out
router.post('/signout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Signout error:', err);
      return res.status(500).json({ error: 'Failed to sign out' });
    }
    res.json({ message: 'Signed out successfully' });
  });
});

// Get current user
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  res.json({ user: getPublicUserData(req.user!) });
});

// Check authentication status
router.get('/status', async (req: Request, res: Response) => {
  if (req.session && req.session.userId) {
    try {
      const user = await getUserById(req.session.userId);
      
      if (user && !user.isBanned) {
        return res.json({ authenticated: true, user: getPublicUserData(user) });
      }
    } catch (error) {
      console.error('Status check error:', error);
    }
  }
  
  res.json({ authenticated: false });
});

// Get user's posts
router.get('/me/posts', requireAuth, async (req: Request, res: Response) => {
  try {
    const postsCollection = await getPostsCollection();
    const userId = new ObjectId(req.user!._id!);
    const posts = await postsCollection
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    res.json({ posts });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Get user's comments
router.get('/me/comments', requireAuth, async (req: Request, res: Response) => {
  try {
    const commentsCollection = await getCommentsCollection();
    const postsCollection = await getPostsCollection();
    const userId = new ObjectId(req.user!._id!);
    
    const comments = await commentsCollection
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Populate with post information
    const commentsWithPosts = await Promise.all(
      comments.map(async (comment) => {
        const post = await postsCollection.findOne({ _id: comment.postId });
        return {
          ...comment,
          post: post ? { _id: post._id, title: post.title } : null
        };
      })
    );
    
    res.json({ comments: commentsWithPosts });
  } catch (error) {
    console.error('Get user comments error:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Get user's liked posts
router.get('/me/liked-posts', requireAuth, async (req: Request, res: Response) => {
  try {
    const postsCollection = await getPostsCollection();
    const userId = new ObjectId(req.user!._id!);
    const posts = await postsCollection
      .find({ likedBy: userId })
      .sort({ createdAt: -1 })
      .toArray();
    
    // Populate with user information
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const user = await getUserById(post.userId.toString());
        return {
          ...post,
          user: user ? getPublicUserData(user) : null
        };
      })
    );
    
    res.json({ posts: postsWithUsers });
  } catch (error) {
    console.error('Get liked posts error:', error);
    res.status(500).json({ error: 'Failed to fetch liked posts' });
  }
});

// Update user profile
router.patch('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const { displayName, bio } = req.body;
    const usersCollection = await getUsersCollection();
    
    const updates: any = {};
    
    if (displayName !== undefined) {
      if (displayName.length > 50) {
        return res.status(400).json({ error: 'Display name must be 50 characters or less' });
      }
      updates.displayName = displayName.trim();
    }
    
    if (bio !== undefined) {
      if (bio.length > 500) {
        return res.status(400).json({ error: 'Bio must be 500 characters or less' });
      }
      updates.bio = bio.trim();
    }
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid updates provided' });
    }
    
    updates.updatedAt = new Date();
    
    await usersCollection.updateOne(
      { _id: req.user!._id },
      { $set: updates }
    );
    
    const updatedUser = await getUserById(req.user!._id!.toString());
    
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser ? getPublicUserData(updatedUser) : null
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Update notification preferences
router.patch('/me/notifications', requireAuth, async (req: Request, res: Response) => {
  try {
    const { emailNotifications, pushNotifications } = req.body;
    const usersCollection = await getUsersCollection();
    
    const notificationSettings: any = {};
    
    if (emailNotifications !== undefined) {
      notificationSettings['notificationSettings.email'] = Boolean(emailNotifications);
    }
    
    if (pushNotifications !== undefined) {
      notificationSettings['notificationSettings.push'] = Boolean(pushNotifications);
    }
    
    if (Object.keys(notificationSettings).length === 0) {
      return res.status(400).json({ error: 'No valid notification settings provided' });
    }
    
    await usersCollection.updateOne(
      { _id: req.user!._id },
      { $set: notificationSettings }
    );
    
    const updatedUser = await getUserById(req.user!._id!.toString());
    
    res.json({
      message: 'Notification preferences updated',
      user: updatedUser ? getPublicUserData(updatedUser) : null
    });
  } catch (error) {
    console.error('Update notifications error:', error);
    res.status(500).json({ error: 'Failed to update notification preferences' });
  }
});

export default router;



// Email verification
router.get('/verify-email', async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Invalid verification token' });
    }
    
    const user = await verifyEmail(token);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }
    
    res.json({
      message: 'Email verified successfully! You can now access all features.',
      user: getPublicUserData(user)
    });
  } catch (error) {
    console.error('[Email Verification] Error:', error);
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// Google OAuth - Initiate
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth - Callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/signin?error=google_auth_failed' }),
  (req: Request, res: Response) => {
    // Successful authentication
    if (req.user) {
      const user = req.user as any;
      req.session.userId = user._id.toString();
      req.session.role = user.role;
      
      // Explicitly save session before redirecting
      req.session.save((err) => {
        if (err) {
          console.error('Google OAuth session save error:', err);
          return res.redirect('/auth/signin?error=session_error');
        }
        res.redirect('/forum');
      });
    } else {
      res.redirect('/auth/signin?error=no_user');
    }
  }
);


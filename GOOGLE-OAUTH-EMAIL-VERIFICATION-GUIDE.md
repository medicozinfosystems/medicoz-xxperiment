# 🔐 Google OAuth & Email Verification Setup Guide

This is a comprehensive guide to implement:
1. **Google OAuth** for sign-up/sign-in
2. **Email Verification** with confirmation emails

---

## 📋 What's Already Done

✅ **Database Schema Updated**
- Added `emailVerificationToken` field
- Added `emailVerificationExpires` field  
- Added `googleId` field for Google OAuth
- Added `authProvider` field ('local' | 'google')
- Made `passwordHash` optional (for OAuth users)

✅ **Email Template Created**
- Beautiful verification email template in `server/utils/email.ts`
- `createEmailVerificationEmail()` function ready

✅ **Packages Installed**
- `passport`
- `passport-google-oauth20`
- Type definitions

---

## 🚀 Implementation Steps

### STEP 1: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen:
   - App name: "The XXperiment"
   - User support email: your email
   - Developer contact: your email
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://yourdomain.com` (for production)
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback`
     - `https://yourdomain.com/api/auth/google/callback`
7. Copy **Client ID** and **Client Secret**

### STEP 2: Update Environment Variables

Add to `.env`:
```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

### STEP 3: Create Passport Configuration

Create `server/config/passport.ts`:

```typescript
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../db/mongodb';
import type { User } from '../db/schemas';

export function configurePassport() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const usersCollection = await getUsersCollection();
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error('No email found from Google'), undefined);
          }

          // Check if user exists
          let user = await usersCollection.findOne({ email: email.toLowerCase() });

          if (!user) {
            // Create new user from Google profile
            const newUser: Omit<User, '_id'> = {
              username: email.split('@')[0].toLowerCase() + Math.random().toString(36).substr(2, 4),
              email: email.toLowerCase(),
              displayName: profile.displayName,
              avatar: profile.photos?.[0]?.value,
              googleId: profile.id,
              authProvider: 'google',
              role: 'user',
              isVerified: true, // Auto-verify Google users
              isBanned: false,
              notificationSettings: {
                email: true,
                push: true,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            const result = await usersCollection.insertOne(newUser as any);
            user = { ...newUser, _id: result.insertedId } as User;
          } else if (!user.googleId) {
            // Link existing account with Google
            await usersCollection.updateOne(
              { _id: user._id },
              {
                $set: {
                  googleId: profile.id,
                  isVerified: true,
                  avatar: profile.photos?.[0]?.value || user.avatar,
                  updatedAt: new Date(),
                },
              }
            );
          }

          // Update last login
          await usersCollection.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
          );

          return done(null, user);
        } catch (error) {
          return done(error as Error, undefined);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user._id.toString());
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const usersCollection = await getUsersCollection();
      const user = await usersCollection.findOne({ _id: new ObjectId(id) });
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}
```

### STEP 4: Update Auth Utilities

Add to `server/utils/auth.ts`:

```typescript
import crypto from 'crypto';

// Generate verification token
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Update createUser to add verification token
export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}): Promise<{ user: User; verificationToken: string }> {
  const usersCollection = await getUsersCollection();
  
  // Check if user already exists
  const existingUser = await usersCollection.findOne({
    $or: [
      { email: userData.email.toLowerCase() },
      { username: userData.username.toLowerCase() }
    ]
  });
  
  if (existingUser) {
    throw new Error('User with this email or username already exists');
  }
  
  const passwordHash = await hashPassword(userData.password);
  const verificationToken = generateVerificationToken();
  const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  const newUser: Omit<User, '_id'> = {
    username: userData.username.toLowerCase(),
    email: userData.email.toLowerCase(),
    passwordHash,
    displayName: userData.displayName || userData.username,
    role: 'user',
    isVerified: false,
    isBanned: false,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: verificationExpires,
    authProvider: 'local',
    notificationSettings: {
      email: true,
      push: true
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const result = await usersCollection.insertOne(newUser as any);
  
  return {
    user: { ...newUser, _id: result.insertedId } as User,
    verificationToken
  };
}

// Verify email token
export async function verifyEmail(token: string): Promise<User | null> {
  const usersCollection = await getUsersCollection();
  
  const user = await usersCollection.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() }
  });
  
  if (!user) {
    return null;
  }
  
  await usersCollection.updateOne(
    { _id: user._id },
    {
      $set: {
        isVerified: true,
        updatedAt: new Date()
      },
      $unset: {
        emailVerificationToken: '',
        emailVerificationExpires: ''
      }
    }
  );
  
  return { ...user, isVerified: true };
}
```

### STEP 5: Update Auth Routes

Update `server/routes/auth.routes.ts`:

```typescript
import { sendEmail, createEmailVerificationEmail } from '../utils/email';

// Update signup route
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { username, email, password, displayName } = req.body;
    
    // ... validation ...
    
    const { user, verificationToken } = await createUser({
      username,
      email,
      password,
      displayName
    });
    
    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email?token=${verificationToken}`;
    const emailHtml = createEmailVerificationEmail(user.displayName || user.username, verificationUrl);
    
    await sendEmail({
      to: user.email,
      subject: 'Verify your email - The XXperiment',
      html: emailHtml
    });
    
    req.session.userId = user._id!.toString();
    req.session.role = user.role;
    
    res.status(201).json({
      message: 'Account created! Please check your email to verify your account.',
      user: getPublicUserData(user)
    });
  } catch (error) {
    // ... error handling ...
  }
});

// Add email verification route
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
    res.status(500).json({ error: 'Failed to verify email' });
  }
});

// Add Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/signin' }),
  (req: Request, res: Response) => {
    // Successful authentication
    res.redirect('/forum');
  }
);
```

### STEP 6: Update Server Index

Update `server/index.ts`:

```typescript
import passport from 'passport';
import { configurePassport } from './config/passport';

// ... after session middleware ...
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
configurePassport();
```

### STEP 7: Create Verification Page (Frontend)

Create `client/src/pages/auth/verify-email.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { useLocation, useSearch } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }
    
    fetch(`/api/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus('error');
          setMessage(data.error);
        } else {
          setStatus('success');
          setMessage(data.message);
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Failed to verify email');
      });
  }, [token]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7f1e16] to-[#5a120e] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-[#e2d6c7] border-[#3d1d19]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl text-[#0c0b0b]">
            Email Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === 'loading' && (
            <>
              <Loader2 className="w-16 h-16 mx-auto text-[#7f1e16] animate-spin" />
              <p className="text-[#6b5751]">Verifying your email...</p>
            </>
          )}
          
          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
              <p className="text-[#0c0b0b] font-semibold text-lg">{message}</p>
              <Button
                onClick={() => setLocation('/forum')}
                className="bg-[#7f1e16] hover:bg-[#6b1712] text-[#e2d6c7] w-full"
              >
                Go to Forum
              </Button>
            </>
          )}
          
          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 mx-auto text-red-600" />
              <p className="text-red-700 font-semibold">{message}</p>
              <Button
                onClick={() => setLocation('/auth/signin')}
                variant="outline"
                className="border-[#7f1e16] text-[#7f1e16] w-full"
              >
                Back to Sign In
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
```

### STEP 8: Add Google Sign-In Button to Frontend

Update `client/src/pages/auth/signin.tsx`:

```typescript
// Add Google Sign-In button
<div className="space-y-4">
  <Button
    type="button"
    variant="outline"
    className="w-full border-[#6b5751] text-[#0c0b0b] hover:bg-[#6b5751]/10"
    onClick={() => window.location.href = '/api/auth/google'}
  >
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    Continue with Google
  </Button>
  
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t border-[#6b5751]/30" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-[#e2d6c7] px-2 text-[#6b5751]">Or continue with email</span>
    </div>
  </div>
</div>

{/* Then show the regular email/password form */}
```

### STEP 9: Add Route to App

Update `client/src/App.tsx`:

```typescript
import VerifyEmail from "@/pages/auth/verify-email";

// In Router:
<Route path="/auth/verify-email" component={VerifyEmail} />
```

---

## 🧪 Testing

### Test Email Verification:
1. Sign up with a new account
2. Check email (cto@medicoz.info in test mode)
3. Click "Verify Email Address" button
4. Should redirect to success page
5. Try signing in - should work!

### Test Google OAuth:
1. Click "Continue with Google" on sign-in page
2. Select Google account
3. Grant permissions
4. Should redirect to forum
5. Check database - user should have `googleId` and `authProvider: 'google'`

---

## 📝 Additional Features to Consider

1. **Resend Verification Email**: Add button to resend if expired
2. **Email Change Verification**: Require verification when changing email
3. **Social Login Icons**: Add Facebook, Twitter, etc.
4. **Account Linking**: Let users link multiple auth providers
5. **Unverified User Restrictions**: Limit features until verified

---

## 🔒 Security Best Practices

✅ Verification tokens expire in 24 hours
✅ Tokens are cryptographically random
✅ Passwords hashed with bcrypt
✅ OAuth tokens handled by Passport
✅ HTTPS required in production
✅ Secure session cookies

---

**This is a complete implementation guide. Would you like me to implement any specific part first?**


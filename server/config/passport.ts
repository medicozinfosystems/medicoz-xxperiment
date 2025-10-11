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
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const usersCollection = await getUsersCollection();
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error('No email found from Google'), undefined);
          }

          // Check if user exists
          let user = await usersCollection.findOne({ email: email.toLowerCase() }) as User | null;

          if (!user) {
            // Create new user from Google profile
            const username = email.split('@')[0].toLowerCase() + Math.random().toString(36).substr(2, 4);
            
            const newUser: Omit<User, '_id'> = {
              username,
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
                  isVerified: true, // Auto-verify when linked with Google
                  avatar: profile.photos?.[0]?.value || user.avatar,
                  updatedAt: new Date(),
                },
              }
            );
            user.googleId = profile.id;
            user.isVerified = true;
          }

          // Update last login
          await usersCollection.updateOne(
            { _id: user._id },
            { $set: { lastLogin: new Date() } }
          );

          return done(null, user);
        } catch (error) {
          console.error('[Google OAuth] Error:', error);
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
      const user = await usersCollection.findOne({ _id: new ObjectId(id) }) as User | null;
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}


import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    role?: 'user' | 'moderator' | 'admin';
  }
}



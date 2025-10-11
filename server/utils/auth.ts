import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { getUsersCollection } from '../db/mongodb';
import type { User } from '../db/schemas';

const SALT_ROUNDS = 10;

/**
 * Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

/**
 * Generate a random verification token
 */
export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Create a new user
 */
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

/**
 * Authenticate a user
 */
export async function authenticateUser(
  emailOrUsername: string,
  password: string
): Promise<User | null> {
  const usersCollection = await getUsersCollection();
  
  const user = await usersCollection.findOne({
    $or: [
      { email: emailOrUsername.toLowerCase() },
      { username: emailOrUsername.toLowerCase() }
    ]
  }) as User | null;
  
  if (!user) {
    return null;
  }
  
  if (user.isBanned) {
    throw new Error('This account has been banned');
  }
  
  if (!user.passwordHash) {
    return null; // OAuth user trying to login with password
  }
  
  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    return null;
  }
  
  // Update last login
  await usersCollection.updateOne(
    { _id: user._id },
    { $set: { lastLogin: new Date() } }
  );
  
  return user;
}

/**
 * Get user by ID
 */
export async function getUserById(userId: string | ObjectId): Promise<User | null> {
  const usersCollection = await getUsersCollection();
  const id = typeof userId === 'string' ? new ObjectId(userId) : userId;
  
  return await usersCollection.findOne({ _id: id }) as User | null;
}

/**
 * Get public user data (without sensitive info)
 */
export function getPublicUserData(user: User) {
  const { passwordHash, email, ...publicData } = user;
  return publicData;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate username format
 */
export function isValidUsername(username: string): boolean {
  // Username: 3-20 characters, alphanumeric and underscore only
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true };
}



/**
 * Verify email using token
 */
export async function verifyEmail(token: string): Promise<User | null> {
  const usersCollection = await getUsersCollection();
  
  const user = await usersCollection.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() }
  }) as User | null;
  
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

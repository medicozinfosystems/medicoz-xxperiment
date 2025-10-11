# Quick Start Guide

Get The XXperiment forum up and running in 5 minutes!

## Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas Free Tier](https://www.mongodb.com/cloud/atlas)

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp env.example .env
```

Edit `.env` and update:

```env
PORT=3000
NODE_ENV=development

# For local MongoDB (default):
MONGODB_URI=mongodb://localhost:27017

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/

MONGODB_DB_NAME=xxperiment
SESSION_SECRET=change-this-to-a-random-secret-key
```

**Generate a secure session secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Start MongoDB (if using local)

**macOS:**
```bash
brew services start mongodb-community
```

**Windows:**
```bash
net start MongoDB
```

**Linux:**
```bash
sudo systemctl start mongod
```

### 4. Seed Sample Episodes (Optional)

Add sample podcast episodes to test the forum:

```bash
npm run seed:episodes
```

This will create 5 sample episodes that users can discuss.

### 5. Start the Application

```bash
npm run dev
```

The app will start on `http://localhost:3000`

## First Steps

### 1. Create Your Account

1. Navigate to `http://localhost:3000/auth/signup`
2. Create an account with:
   - Username (3-20 characters, alphanumeric)
   - Email
   - Password (min 8 characters, with uppercase, lowercase, and numbers)
3. You'll be automatically logged in

### 2. Create Your First Admin User

After creating your account, manually set your role to admin in MongoDB:

**Using MongoDB Shell:**
```bash
mongosh xxperiment

db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Navigate to `xxperiment` → `users` collection
4. Find your user and edit the `role` field to `"admin"`

### 3. Explore the Forum

- **Browse Posts**: Visit `/forum` to see all discussions
- **Create Post**: Click "New Post" to start a conversation
- **Comment**: Click on any post to read and comment
- **Like**: Heart icon to like posts
- **Profile**: Access your profile from the forum header

## Testing the Forum

### Create a General Discussion

1. Go to `/forum/new`
2. Select "General Discussion"
3. Add a title: "Welcome to The XXperiment Community!"
4. Write content: "Let's start a conversation about women's health..."
5. Click "Publish Post"

### Create an Episode Discussion

1. Go to `/forum/new`
2. Select "Episode Discussion"
3. Choose an episode from the dropdown
4. Add your thoughts about the episode
5. Publish and engage!

## Content Moderation Features

The forum automatically:

✅ **Allows** health-related terms:
- pregnancy, period, menstruation
- fertility, contraception
- reproductive health terms
- medical terminology

❌ **Filters** inappropriate content:
- Profanity and vulgar language
- Spam patterns
- Excessive repetition

🛡️ **Protects** the community:
- All posts are checked before submission
- Flagged content is rejected with explanation
- No manual moderation needed for most cases

## Common Issues

### Port Already in Use

If port 3000 is busy:

```bash
# Option 1: Use different port
PORT=8080 npm run dev

# Option 2: Kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### MongoDB Connection Failed

**Check MongoDB is running:**
```bash
# macOS:
brew services list | grep mongodb

# Linux:
systemctl status mongod

# Windows:
sc query MongoDB
```

**Verify connection string:**
- Local: `mongodb://localhost:27017`
- Atlas: Should include your username, password, and cluster URL

### Session Issues

If you can't stay logged in:
1. Clear browser cookies
2. Restart the server
3. Make sure `SESSION_SECRET` is set in `.env`

## Next Steps

1. **Customize** - Update colors, branding, and content
2. **Deploy** - Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for production hosting
3. **Moderate** - Set up moderator accounts for community management
4. **Extend** - Add features like user profiles, badges, notifications

## Resources

- **Full Documentation**: [README.md](./README.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **MongoDB Docs**: https://docs.mongodb.com/
- **Express.js Docs**: https://expressjs.com/

## Support

- Check documentation files
- Review error messages in terminal
- Verify environment variables
- Ensure MongoDB is running

## Features Overview

### User Features
- 🔐 Secure authentication
- 💬 Create posts and comments
- ❤️ Like and engage with content
- 👤 Personal profile page
- 📱 Mobile-optimized experience

### Forum Structure
- **General Discussions** - Open topics
- **Episode Discussions** - Episode-specific threads
- **Nested Comments** - Reply to comments
- **View Tracking** - See post popularity
- **Real-time Updates** - Latest posts first

### Admin/Moderator Features
- Content moderation tools
- User management
- Post pinning and locking (coming soon)
- Ban/unban users (coming soon)
- Moderation logs

---

Happy posting! 🎉

For questions or issues, check the documentation or contact the development team.




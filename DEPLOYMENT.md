# Deployment Guide for The XXperiment Forum

This guide will help you deploy The XXperiment website with the community forum feature.

## Prerequisites

Before deploying, ensure you have:
- Node.js 18+ installed
- MongoDB database (local or cloud-based like MongoDB Atlas)
- A server or hosting platform (Heroku, DigitalOcean, AWS, Railway, Render, etc.)

## Environment Setup

### 1. MongoDB Setup

#### Option A: MongoDB Atlas (Recommended for Production)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Whitelist your application's IP address (or use 0.0.0.0/0 for all IPs during testing)
5. Get your connection string from the "Connect" button
6. Replace `<password>` with your database user password

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/xxperiment?retryWrites=true&w=majority
```

#### Option B: Local MongoDB

1. Install MongoDB locally: https://www.mongodb.com/docs/manual/installation/
2. Start MongoDB service: `mongod`
3. Use connection string: `mongodb://localhost:27017`

### 2. Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB_NAME=xxperiment

# Session Secret (IMPORTANT: Generate a random secure string!)
SESSION_SECRET=your-super-secret-random-string-here
```

**Important:** Generate a secure random string for `SESSION_SECRET`. You can use:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment Options

### Option 1: Railway (Easiest)

1. Push your code to GitHub
2. Go to [Railway](https://railway.app/)
3. Create new project from GitHub repo
4. Add MongoDB plugin or connect to MongoDB Atlas
5. Set environment variables in Railway dashboard
6. Deploy!

Railway will automatically:
- Install dependencies
- Build the project
- Start the server

### Option 2: Render

1. Push your code to GitHub
2. Go to [Render](https://render.com/)
3. Create a new Web Service
4. Connect your GitHub repo
5. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Add environment variables in the dashboard
7. Deploy!

### Option 3: Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Add MongoDB addon or use MongoDB Atlas
5. Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=your_connection_string
   heroku config:set SESSION_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```
6. Deploy:
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean / AWS / VPS

1. SSH into your server
2. Install Node.js and MongoDB (if not using Atlas)
3. Clone your repository
4. Install dependencies: `npm install`
5. Create `.env` file with your environment variables
6. Build the project: `npm run build`
7. Use PM2 to run the server:
   ```bash
   npm install -g pm2
   pm2 start npm --name "xxperiment" -- start
   pm2 save
   pm2 startup
   ```
8. Set up Nginx as reverse proxy (optional but recommended)

## Database Initialization

The application will automatically:
- Connect to MongoDB on startup
- Create necessary indexes
- Set up collections when first post/user is created

No manual database setup is required!

## Post-Deployment Checklist

- [ ] Verify MongoDB connection is working
- [ ] Test user registration and login
- [ ] Create a test post
- [ ] Test comment functionality
- [ ] Verify content moderation is working
- [ ] Check mobile responsiveness
- [ ] Set up SSL/HTTPS (use Let's Encrypt or your hosting platform's SSL)
- [ ] Configure CORS if needed
- [ ] Set up monitoring (optional)
- [ ] Create admin user (manually set role to 'admin' in MongoDB)

## Creating an Admin User

After deployment, create your first user through the signup page, then manually update their role in MongoDB:

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "your-admin-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Troubleshooting

### Connection Issues
- Verify MongoDB URI is correct
- Check if IP is whitelisted in MongoDB Atlas
- Ensure MongoDB service is running

### Session Issues
- Make sure SESSION_SECRET is set
- For production, ensure `secure: true` is set in session config (requires HTTPS)

### Build Errors
- Clear node_modules and package-lock.json, then reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure Node.js version is 18+

## Security Recommendations

1. **Use HTTPS** - Enable SSL on your hosting platform
2. **Strong Session Secret** - Use a random, long string
3. **MongoDB Authentication** - Use strong passwords
4. **Rate Limiting** - Consider adding rate limiting for API endpoints
5. **Regular Backups** - Set up automated MongoDB backups
6. **Update Dependencies** - Regularly update npm packages
7. **Monitor Logs** - Set up error tracking (e.g., Sentry)

## Features

### Content Moderation
- Automatic profanity filtering
- Women's health terms are allowed (period, pregnancy, etc.)
- Spam detection
- Moderator tools (requires moderator/admin role)

### Forum Structure
- General discussions
- Episode-specific discussions
- Comments with nested replies
- Like/unlike posts
- View counts
- User profiles

## Support

For issues or questions, please contact the development team or create an issue in the repository.

## License

See LICENSE file for details.




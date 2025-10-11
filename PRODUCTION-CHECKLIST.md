# Production Deployment Checklist

Use this checklist before deploying The XXperiment forum to production.

## Pre-Deployment

### Security Configuration

- [ ] **Generate secure SESSION_SECRET**
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  - Update in `.env` or hosting platform environment variables
  - Never commit this to version control

- [ ] **Set NODE_ENV to production**
  ```env
  NODE_ENV=production
  ```

- [ ] **Configure MongoDB Atlas** (recommended for production)
  - Create production cluster
  - Set up database user with strong password
  - Configure IP whitelist (or 0.0.0.0/0 for cloud hosting)
  - Get connection string
  - Test connection before deployment

- [ ] **Review CORS settings** (if needed)
  - Configure allowed origins in `server/index.ts`
  - Add CORS middleware if serving frontend separately

- [ ] **Update session cookie settings**
  ```javascript
  cookie: {
    secure: true,  // Requires HTTPS
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
  ```

### Environment Variables

Required for production:

```env
# Server
PORT=3000
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/
MONGODB_DB_NAME=xxperiment

# Security
SESSION_SECRET=<your-secure-random-string>
```

- [ ] All environment variables set on hosting platform
- [ ] No sensitive data in code or commits
- [ ] `.env` file added to `.gitignore`

### Database Setup

- [ ] **MongoDB production database ready**
  - MongoDB Atlas cluster created
  - Connection tested successfully
  - Backups configured (automatic with Atlas)

- [ ] **Seed initial data** (optional)
  ```bash
  npm run seed:episodes
  ```

- [ ] **Create admin user**
  - Sign up through the website
  - Manually set role to 'admin' in MongoDB
  ```javascript
  db.users.updateOne(
    { email: "admin@example.com" },
    { $set: { role: "admin" } }
  )
  ```

### Code Review

- [ ] **Build succeeds without errors**
  ```bash
  npm run build
  ```

- [ ] **TypeScript checks pass**
  ```bash
  npm run check
  ```

- [ ] **No console.logs in production code** (or use proper logger)

- [ ] **Error handling in place**
  - All API routes have try-catch blocks
  - User-friendly error messages
  - Sensitive errors not exposed to client

### Testing

- [ ] **Test authentication flow**
  - Sign up new account
  - Sign in existing account
  - Sign out
  - Session persistence

- [ ] **Test forum features**
  - Create general discussion post
  - Create episode discussion post
  - Comment on posts
  - Reply to comments
  - Like posts
  - View profile

- [ ] **Test content moderation**
  - Try posting inappropriate content (should be blocked)
  - Post with health terms (should be allowed)
  - Verify moderation messages are clear

- [ ] **Test mobile responsiveness**
  - All pages work on mobile devices
  - Touch interactions work properly
  - Forms are usable on small screens

## Deployment Steps

### Option 1: Railway

1. [ ] Push code to GitHub
2. [ ] Create new Railway project
3. [ ] Connect GitHub repository
4. [ ] Add MongoDB plugin or external MongoDB
5. [ ] Set environment variables
6. [ ] Deploy
7. [ ] Verify deployment URL works

### Option 2: Render

1. [ ] Push code to GitHub
2. [ ] Create new Web Service on Render
3. [ ] Configure build settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. [ ] Add environment variables
5. [ ] Deploy
6. [ ] Verify deployment

### Option 3: Heroku

1. [ ] Install Heroku CLI
2. [ ] Create Heroku app: `heroku create app-name`
3. [ ] Set environment variables:
   ```bash
   heroku config:set MONGODB_URI=...
   heroku config:set SESSION_SECRET=...
   heroku config:set NODE_ENV=production
   ```
4. [ ] Deploy: `git push heroku main`
5. [ ] Open app: `heroku open`

### Option 4: VPS (DigitalOcean, AWS, etc.)

1. [ ] Set up server with Node.js 18+
2. [ ] Install MongoDB or use Atlas
3. [ ] Clone repository
4. [ ] Install dependencies: `npm install`
5. [ ] Create `.env` file with production values
6. [ ] Build application: `npm run build`
7. [ ] Set up PM2:
   ```bash
   npm install -g pm2
   pm2 start npm --name "xxperiment" -- start
   pm2 save
   pm2 startup
   ```
8. [ ] Configure Nginx reverse proxy (recommended)
9. [ ] Set up SSL with Let's Encrypt

## Post-Deployment

### SSL/HTTPS

- [ ] **Enable HTTPS** (required for secure cookies)
  - Use platform SSL (Railway/Render/Heroku)
  - Or configure Let's Encrypt on VPS
  - Update session config: `secure: true`

### Domain Configuration

- [ ] **Set up custom domain** (optional)
  - Configure DNS records
  - Update platform domain settings
  - Verify SSL works with custom domain

### Monitoring

- [ ] **Set up error tracking** (recommended)
  - Consider: Sentry, LogRocket, or similar
  - Track server errors
  - Monitor client-side errors

- [ ] **Configure logging**
  - Use proper logging library (Winston, Pino)
  - Log important events
  - Don't log sensitive data

- [ ] **Set up uptime monitoring** (optional)
  - UptimeRobot, Pingdom, or similar
  - Get alerts if site goes down

### Database Management

- [ ] **Verify automated backups** (MongoDB Atlas does this)
- [ ] **Test database restore process**
- [ ] **Set up database monitoring**
- [ ] **Configure connection pooling limits**

### Performance

- [ ] **Enable gzip compression** (usually handled by hosting platform)
- [ ] **Configure caching headers** (optional)
- [ ] **Test page load speeds**
  - Use Chrome DevTools
  - Check Lighthouse scores
  - Optimize if needed

### Security Hardening

- [ ] **Add rate limiting** (optional but recommended)
  ```bash
  npm install express-rate-limit
  ```

- [ ] **Add helmet middleware** (security headers)
  ```bash
  npm install helmet
  ```

- [ ] **Review and update dependencies**
  ```bash
  npm audit
  npm audit fix
  ```

- [ ] **Set up automated security updates** (Dependabot, Snyk)

### User Management

- [ ] **Create admin accounts**
  - Set roles in database
  - Test admin features

- [ ] **Create moderator accounts** (if needed)
  - Set roles in database
  - Document moderator guidelines

- [ ] **Test user registration flow**
  - Email validation
  - Password requirements
  - Welcome message

### Documentation

- [ ] **Update README with production URL**
- [ ] **Document any custom configuration**
- [ ] **Create incident response plan**
- [ ] **Document backup/restore procedures**

### Communication

- [ ] **Announce launch** to users
- [ ] **Provide community guidelines** link
- [ ] **Set up support channel** (email, Discord, etc.)
- [ ] **Monitor initial feedback**

## Ongoing Maintenance

### Regular Tasks

- [ ] **Weekly**: Review moderation logs
- [ ] **Weekly**: Check error logs
- [ ] **Monthly**: Update dependencies
- [ ] **Monthly**: Review database size/growth
- [ ] **Quarterly**: Security audit
- [ ] **Quarterly**: Performance review

### Backup Strategy

- [ ] **Database**: Automated daily backups (MongoDB Atlas)
- [ ] **Test restore**: Monthly
- [ ] **Retention**: Keep 30 days minimum

### Scaling Considerations

When traffic grows, consider:

- [ ] Upgrade MongoDB cluster tier
- [ ] Add Redis for session storage
- [ ] Implement CDN for static assets
- [ ] Add caching layer
- [ ] Optimize database queries
- [ ] Consider read replicas

## Emergency Procedures

### If Site Goes Down

1. Check hosting platform status
2. Review error logs
3. Verify MongoDB connection
4. Check environment variables
5. Restart application if needed
6. Contact hosting support if platform issue

### If Database Issues

1. Check MongoDB Atlas status
2. Verify connection string
3. Check IP whitelist
4. Review database logs
5. Contact MongoDB support if needed

### If Security Breach Suspected

1. Immediately rotate SESSION_SECRET
2. Force logout all users
3. Review access logs
4. Check for unauthorized admin accounts
5. Update all passwords
6. Investigate and patch vulnerability
7. Notify users if needed

## Success Metrics

Track these metrics post-launch:

- [ ] User registration rate
- [ ] Daily active users
- [ ] Posts created per day
- [ ] Comments per post
- [ ] Moderation actions per week
- [ ] Page load times
- [ ] Server response times
- [ ] Error rates
- [ ] Uptime percentage

## Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Security](https://expressjs.com/en/advanced/best-practice-security.html)
- [Node.js Production Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Let's Encrypt](https://letsencrypt.org/)
- [PM2 Documentation](https://pm2.keymetrics.io/)

---

**Remember**: Start small, monitor closely, and scale as needed. Don't over-engineer for traffic you don't have yet!

Good luck with your deployment! 🚀




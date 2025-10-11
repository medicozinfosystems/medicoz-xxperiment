# 📧 Email Notifications Setup

## ✅ What's Implemented

Email notifications are now fully functional! Users receive beautiful HTML emails when:
- Someone comments on their post
- Someone likes their post

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for free (100 emails/day free tier)
3. Verify your email
4. Go to API Keys section
5. Create a new API key
6. Copy the key (starts with `re_...`)

### Step 2: Add to Environment Variables

1. Open your `.env` file (create it if it doesn't exist)
2. Add this line:
```
RESEND_API_KEY=re_your_actual_api_key_here
CLIENT_URL=http://localhost:3000
```

3. For production, also add:
```
CLIENT_URL=https://yourdomain.com
```

### Step 3: Restart the Server

```bash
npm run dev
```

That's it! ✨

---

## 🧪 Testing

### 1. Enable Email Notifications
- Sign in to your account
- Go to Profile → Settings ⚙️
- Turn ON "Email Notifications"
- Save settings

### 2. Test It Out
**You need 2 users:**

- **User A**: Create a post
- **User B**: Comment on or like User A's post
- **User A**: Check your email inbox! 📬

---

## 📧 Email Examples

### Comment Notification
```
Subject: John Doe commented on your post: "My Post Title"

Hi Alice,

John Doe just commented on your post:
"My Post Title"

┌─────────────────────────────┐
│ This is the comment text... │
└─────────────────────────────┘

[View Discussion Button]
```

### Like Notification
```
Subject: Jane Smith liked your post: "My Post Title"

Hi Alice,

❤️

Jane Smith liked your post:
"My Post Title"

[View Your Post Button]
```

---

## 🛠️ Server Logs

When an email is sent, you'll see in terminal:
```
[EMAIL] Sent comment notification to user@email.com for post "Post Title"
[EMAIL] Sent like notification to user@email.com for post "Post Title"
```

If Resend is not configured:
```
[EMAIL - Not Configured] Would send email:
  To: user@email.com
  Subject: ...
```

---

## ⚙️ Advanced Configuration

### Custom "From" Email

By default, emails are sent from `onboarding@resend.dev`.

To use your own domain:

1. **Add your domain in Resend:**
   - Go to Resend dashboard → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Update DNS records as shown

2. **Update the code:**
   In `server/utils/email.ts`, change:
   ```typescript
   from: 'The XXperiment <noreply@yourdomain.com>'
   ```

### Email Templates

Email templates are in `server/utils/email.ts`:
- `createCommentNotificationEmail()`
- `createLikeNotificationEmail()`

Customize the HTML/CSS to match your brand!

---

## 📊 Email Limits

### Resend Free Tier:
- 100 emails/day
- 3,000 emails/month
- Perfect for getting started!

### Paid Plans:
- $20/month: 50,000 emails
- $80/month: 100,000 emails
- Enterprise: Custom

---

## 🔧 Troubleshooting

### "Email not received"
1. Check spam folder
2. Verify email address is correct
3. Check server logs for errors
4. Confirm `RESEND_API_KEY` is set correctly

### "Not Configured" in logs
- Make sure `RESEND_API_KEY` is in your `.env` file
- Restart the server after adding the key
- Check the key starts with `re_`

### Emails going to spam
- Verify your domain in Resend
- Set up SPF, DKIM, and DMARC records
- Use a custom "from" email address

---

## 🎯 Production Checklist

Before going live:

- [ ] Add `RESEND_API_KEY` to production environment
- [ ] Set `CLIENT_URL` to your production domain
- [ ] Verify your custom domain in Resend
- [ ] Test with real email addresses
- [ ] Check spam score of emails
- [ ] Set up email analytics in Resend dashboard

---

## 💡 Features

✅ Beautiful HTML email templates
✅ Responsive design (mobile-friendly)
✅ Direct links to posts
✅ Respects user notification preferences
✅ No self-notifications (won't email you for your own actions)
✅ Anonymous post handling
✅ Graceful fallback (logs if not configured)

---

**Ready to send emails!** 🚀

For more info, visit [Resend Documentation](https://resend.com/docs)



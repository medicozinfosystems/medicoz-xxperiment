# ⚡ Quick Start: Test Google OAuth + Email Verification

## ✅ Server is Running

**URL**: http://localhost:3000

---

## 🧪 Test Email Verification (2 minutes)

1. **Sign Up**: http://localhost:3000/auth/signup
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Password123`
   - Click "Sign Up"

2. **Check Email**: `cto@medicoz.info`
   - Subject: `[TEST] Verify your email - The XXperiment`
   - Click "Verify Email Address" button

3. **Verified!** → Click "Go to Forum"

---

## 🔐 Enable Google OAuth (5 minutes)

### Step 1: Add Redirect URI
1. Go to: https://console.cloud.google.com/
2. Select: **"the-xxperiment"** project
3. Go to: **APIs & Services** → **Credentials**
4. Click your **OAuth 2.0 Client ID**
5. Under **"Authorized redirect URIs"**, click **"ADD URI"**
6. Paste: `http://localhost:3000/api/auth/google/callback`
7. Click **"SAVE"**

### Step 2: Test Google Sign-In
1. Go to: http://localhost:3000/auth/signin
2. Click **"Continue with Google"**
3. Select Google account
4. Grant permissions
5. **Done!** → Redirected to forum

---

## 📧 Emails in TEST MODE

All emails go to: **`cto@medicoz.info`**

Why? Resend requires domain verification to send to any email. In TEST MODE:
- Subject has `[TEST]` prefix
- Banner shows intended recipient
- You can test without domain verification

**To exit TEST MODE**:
1. Verify domain at https://resend.com/domains
2. Set `RESEND_DOMAIN_VERIFIED=true` in `.env`

---

## 🎯 What Works Now

✅ **Email Verification**
- Sign up → email sent
- Click link → verified
- Auto-login after verification

✅ **Google OAuth** (after adding redirect URI)
- One-click sign in/sign up
- Auto-verified accounts
- Saves Google profile picture

✅ **User Profiles**
- View posts/comments
- Edit profile
- Notification settings

✅ **Forum**
- Create posts
- Comment
- Like posts
- Anonymous posting

---

## 🐛 Troubleshooting

**Google OAuth Not Working?**
→ Add redirect URI in Google Console (see above)

**Email Not Received?**
→ Check `cto@medicoz.info` inbox
→ Look for `[TEST]` prefix

**Server Not Running?**
```bash
cd "/Users/harshiv/Downloads/MedicozModern 3"
PORT=3000 npm run dev
```

---

## 📚 Full Documentation

- **Testing Guide**: `GOOGLE-OAUTH-TESTING-GUIDE.md`
- **Full Setup**: `GOOGLE-OAUTH-EMAIL-VERIFICATION-GUIDE.md`
- **Implementation**: `IMPLEMENTATION-SUMMARY.md`

---

**Ready to test! 🚀**



# 🚀 Deployment Guide - Medicoz & XXperiment

## Overview
This is a full-stack application with:
- **Frontend**: React + Vite (static site)
- **Backend**: Express.js (Node.js server)
- **Database**: MongoDB Atlas (cloud database)
- **Features**: Authentication, Forum, Email notifications, Google OAuth

---

## 🏆 **RECOMMENDED: Vercel (Frontend) + Railway/Render (Backend)**

### Why This Combo?
- ✅ **Free tier available** for both
- ✅ **Easy deployment** (Git-based)
- ✅ **Automatic HTTPS**
- ✅ **Custom domain support**
- ✅ **Environment variables**
- ✅ **Zero config needed**
- ✅ **Great performance**

---

## 📋 **OPTION 1: Vercel + Railway (RECOMMENDED)**

### **Step 1: Prepare Your Repository**

1. **Create a GitHub repository** (if you haven't already):
```bash
cd "/Users/harshiv/Downloads/MedicozModern 3"
git init
git add .
git commit -m "Initial commit - production ready"
git branch -M main
git remote add origin https://github.com/medicozinfosystems/medicoz-xxperiment.git
git push -u origin main
```

### **Step 2: Deploy Backend to Railway**

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up** with GitHub
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**
5. **Railway will auto-detect** your Node.js app

6. **Add Environment Variables** (Settings → Variables):
```
NODE_ENV=production
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
MONGODB_DB_NAME=xxperiment_forum
SESSION_SECRET=your_super_secret_session_key_here
RESEND_API_KEY=re_HqoqfXPL_MtDsFsJvRvmb5BdbUfPNsDk3
CLIENT_URL=https://yourdomain.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-backend-url.railway.app/api/auth/google/callback
```

7. **Deploy** - Railway will automatically build and deploy
8. **Copy your Railway URL** (e.g., `https://medicoz-production.up.railway.app`)

### **Step 3: Deploy Frontend to Vercel**

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up** with GitHub
3. **Click "Add New Project"** → **Import your repo**
4. **Configure Build Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`

5. **Add Environment Variables** (if you have any client-side env vars):
```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
```

6. **Deploy** - Vercel will build and deploy automatically
7. **Copy your Vercel URL** (e.g., `https://medicoz-xxperiment.vercel.app`)

### **Step 4: Update Backend API URL**

Since your frontend is now on Vercel, update the backend URL in your client code:

**Option A: Use relative URLs** (if backend is on same domain with proxy)
**Option B: Use environment variable** `VITE_API_URL`

Update `client/src/pages/auth/signin.tsx`, `client/src/pages/forum/index.tsx`, etc. to use:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
```

Then update all API calls:
```typescript
fetch(`${API_URL}/api/auth/signin`, { ... })
```

### **Step 5: Link Your GoDaddy Domain**

#### **For Frontend (Vercel):**

1. **In Vercel Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your domain (e.g., `medicoz.com`)

2. **In GoDaddy DNS Settings**:
   - Go to **DNS Management**
   - Add these records:

   **For root domain (medicoz.com):**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600
   ```

   **Vercel will also provide specific records** - follow their instructions exactly.

3. **Wait for DNS propagation** (5-60 minutes)

#### **For Backend (Railway):**

1. **In Railway Dashboard**:
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter your subdomain (e.g., `api.medicoz.com`)

2. **In GoDaddy DNS Settings**:
   - Add a CNAME record:
   ```
   Type: CNAME
   Name: api
   Value: your-app.up.railway.app
   TTL: 600
   ```

3. **Update CLIENT_URL** in Railway env vars:
   ```
   CLIENT_URL=https://medicoz.com
   ```

4. **Update VITE_API_URL** in Vercel env vars:
   ```
   VITE_API_URL=https://api.medicoz.com
   ```

5. **Redeploy both** frontend and backend

---

## 📋 **OPTION 2: Render (All-in-One)**

### Why Render?
- ✅ **Free tier** for both frontend and backend
- ✅ **One platform** for everything
- ✅ **Easy to manage**

### **Step 1: Deploy Backend to Render**

1. **Go to [Render.com](https://render.com)**
2. **Sign up** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repo**
5. **Configure**:
   - **Name**: medicoz-backend
   - **Root Directory**: `./`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node

6. **Add Environment Variables** (same as Railway above)

7. **Deploy** - Copy your Render backend URL

### **Step 2: Deploy Frontend to Render**

1. **Click "New +"** → **"Static Site"**
2. **Connect your GitHub repo**
3. **Configure**:
   - **Name**: medicoz-frontend
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `client/dist`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

5. **Deploy**

### **Step 3: Link GoDaddy Domain**

Follow the same DNS setup as in Option 1, but use Render's DNS values.

---

## 📋 **OPTION 3: DigitalOcean App Platform**

### Why DigitalOcean?
- ✅ **$5/month** (affordable)
- ✅ **Reliable** and fast
- ✅ **Easy scaling**

1. **Go to [DigitalOcean.com](https://digitalocean.com)**
2. **Create an App**
3. **Connect GitHub repo**
4. **DigitalOcean auto-detects** Node.js app
5. **Add environment variables**
6. **Deploy**
7. **Add custom domain** in settings

---

## 📋 **OPTION 4: Traditional VPS (Advanced)**

### If you want full control:

**Providers:**
- **DigitalOcean Droplet** ($6/month)
- **Linode** ($5/month)
- **AWS EC2** (free tier for 1 year)
- **Hetzner** ($4/month - cheapest)

**Setup:**
1. Create Ubuntu server
2. Install Node.js, Nginx, PM2
3. Clone your repo
4. Set up Nginx as reverse proxy
5. Configure SSL with Let's Encrypt
6. Use PM2 to run your Node.js server

**This requires more technical knowledge** but gives you full control.

---

## 🎯 **MY RECOMMENDATION FOR YOU:**

### **Best Choice: Vercel + Railway**

**Why?**
1. **FREE** to start
2. **Easiest setup** (no server management)
3. **Auto-scaling** (handles traffic spikes)
4. **Auto HTTPS** (SSL certificates included)
5. **Git-based deployment** (push to deploy)
6. **Professional CDN** (fast worldwide)
7. **Easy custom domain** setup

**Domain Structure:**
- `medicoz.com` → Frontend (Vercel)
- `api.medicoz.com` → Backend (Railway)
- `xxperiment.medicoz.com` → Can redirect to `/xxperiment/index.html`

---

## 📁 **File Structure Check**

Your app is already production-ready! Here's what you have:

```
✅ client/dist - Frontend build output
✅ server/ - Backend Express app
✅ .env.example - Environment template
✅ package.json - Dependencies and scripts
✅ MongoDB Atlas - Already configured
✅ Google OAuth - Already set up
✅ Email notifications - Resend configured
```

---

## 🔧 **Pre-Deployment Checklist**

### 1. **Update `package.json` scripts** (already done):
```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx --env-file=.env server/index.ts",
    "build": "npm install && cd client && npm install && npm run build",
    "start": "NODE_ENV=production node server/index.js"
  }
}
```

### 2. **Verify `.gitignore`** (already done):
```
node_modules/
.env
dist/
*.log
```

### 3. **Update CORS settings** in `server/index.ts`:
```typescript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
```

### 4. **Update MongoDB connection string** (URL encode special characters)

### 5. **Update Google OAuth callback URLs** in Google Console:
```
https://medicoz.com
https://api.medicoz.com/api/auth/google/callback
```

---

## 🚀 **Quick Start Deployment**

### **Railway + Vercel (10 minutes)**

```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# 2. Deploy Backend to Railway
# - Go to railway.app
# - New Project → GitHub repo
# - Add environment variables
# - Deploy!

# 3. Deploy Frontend to Vercel
# - Go to vercel.com
# - New Project → GitHub repo
# - Framework: Vite
# - Deploy!

# 4. Add Custom Domain
# Railway: api.medicoz.com → CNAME to railway
# Vercel: medicoz.com → A record + CNAME

# 5. Update environment variables
# Railway: CLIENT_URL=https://medicoz.com
# Vercel: VITE_API_URL=https://api.medicoz.com

# 6. Redeploy (push to GitHub triggers auto-deploy)
```

---

## 📞 **Need Help?**

**Railway Docs**: https://docs.railway.app  
**Vercel Docs**: https://vercel.com/docs  
**GoDaddy DNS**: https://www.godaddy.com/help/manage-dns-680

---

## 💰 **Cost Breakdown**

### **Option 1: Vercel + Railway (FREE)**
- Vercel: **Free** (hobby plan)
- Railway: **Free** ($5 credit/month, ~500 hours)
- Total: **$0/month** (within free tier limits)

### **When to Upgrade?**
- More than 100GB bandwidth/month → Vercel Pro ($20/month)
- Backend needs more resources → Railway Pro ($5/month)
- **Expected cost at scale**: $10-25/month

### **MongoDB Atlas**: FREE (512MB storage)

### **Domain**: ~$15/year (already purchased from GoDaddy)

---

## ✅ **Final Checklist**

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] Custom domain linked in Railway
- [ ] Custom domain linked in Vercel
- [ ] DNS records added in GoDaddy
- [ ] HTTPS working (auto-configured)
- [ ] Test forum signup/signin
- [ ] Test Google OAuth
- [ ] Test email notifications
- [ ] Test XXperiment preloader

---

**Ready to deploy? Let me know which option you'd like to proceed with!** 🚀

# 🎙️ The XXperiment - Community Forum Platform

A modern, full-stack community forum application built for "The XXperiment" podcast, featuring user authentication, episode discussions, anonymous posting, and email notifications.

## ✨ Features

### 🔐 Authentication
- Email/Password registration with verification
- Google OAuth 2.0 integration
- Secure session management
- Email verification for new accounts

### 💬 Forum Features
- **General Discussions** - Community-wide conversations
- **Episode Discussions** - Episode-specific threads
- **Anonymous Posting** - Post and comment anonymously
- **Like System** - Like posts and track liked content
- **Nested Comments** - Reply to comments
- **Content Moderation** - Automatic profanity filtering with allowlist for health-related terms

### 👤 User Profiles
- View your posts and comments
- Track liked posts
- Edit profile (display name, bio)
- Email notification preferences
- View account information

### 📧 Email Notifications
- New comment notifications
- Post like notifications
- Email verification
- Powered by Resend

### 📱 Mobile Responsive
- Fully responsive design
- Mobile-first approach
- Touch-optimized interface
- Side-sliding mobile navigation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Wouter** for routing
- **Tailwind CSS** for styling
- **Radix UI** components
- **Framer Motion** for animations
- **Vite** for build tooling

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with native driver
- **Express Session** for authentication
- **Passport.js** for OAuth
- **Resend** for email delivery
- **bcryptjs** for password hashing

### Development
- **tsx** for TypeScript execution
- **esbuild** for production builds
- **Drizzle ORM** configuration (optional)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Resend API key (for emails)
- Google OAuth credentials (optional)

### Setup

1. **Clone the repository**
```bash
git clone your-repo-url
cd "MedicozModern 3"
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Copy `env.example` to `.env` and fill in your values:
```bash
cp env.example .env
```

Required variables:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=xxperiment
SESSION_SECRET=generate_random_string
CLIENT_URL=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
```

4. **Generate a secure session secret**
```bash
openssl rand -base64 32
```

5. **Seed episode data** (optional)
```bash
npm run seed:episodes
```

6. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🚀 Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run check        # TypeScript type checking
npm run seed:episodes # Seed episode data to database

# Database
npm run db:push      # Push Drizzle schema (if using Drizzle)
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   │   ├── auth/      # Authentication pages
│   │   │   └── forum/     # Forum pages
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   └── App.tsx        # Main app component
│   └── index.html         # HTML entry point
│
├── server/                # Express backend
│   ├── config/           # Configuration (Passport, etc.)
│   ├── db/              # Database schemas and connection
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts       # Authentication
│   │   ├── forum.routes.ts      # Forum operations
│   │   └── notifications.routes.ts
│   ├── utils/           # Utility functions
│   │   ├── auth.ts      # Auth helpers
│   │   ├── email.ts     # Email templates
│   │   ├── moderation.ts # Content moderation
│   │   └── seed-episodes.ts
│   ├── types/           # TypeScript type definitions
│   └── index.ts         # Server entry point
│
├── xxperiment/          # Static XXperiment site
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── shared/             # Shared types (frontend/backend)
│
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
└── tailwind.config.ts # Tailwind configuration
```

## 🗄️ Database Schema

### Collections

#### Users
- Authentication (email/password, Google OAuth)
- Profile information (display name, bio, avatar)
- Notification preferences
- Role-based access (user, moderator, admin)

#### Posts
- General and episode-specific discussions
- Anonymous posting support
- Like system with user tracking
- View counter
- Moderation status

#### Comments
- Nested comment support
- Anonymous commenting
- Like system
- Post association

#### Episodes
- Episode metadata
- SEO-optimized slugs
- Release information
- Tags

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Session Management** - Secure HTTP-only cookies
- **CSRF Protection** - Session-based CSRF tokens
- **Content Moderation** - Automatic profanity filtering
- **Email Verification** - Required for new accounts
- **Rate Limiting** - (Add if needed for production)
- **Input Validation** - Comprehensive validation on all inputs

## 🎨 Design System

- **Color Scheme**: Warm earth tones (#7f1e16, #e2d6c7, #0c0b0b)
- **Typography**: Alfa Slab One for headings, system fonts for body
- **Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion for smooth transitions
- **Mobile**: 768px breakpoint, mobile-first design

## 📱 API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Register new user
- `POST /signin` - Sign in with credentials
- `POST /signout` - Sign out
- `GET /status` - Check authentication status
- `GET /me` - Get current user profile
- `GET /verify-email` - Verify email with token
- `GET /google` - Initiate Google OAuth
- `GET /google/callback` - Google OAuth callback

### Profile (`/api/auth/me`)
- `GET /posts` - Get user's posts
- `GET /comments` - Get user's comments
- `GET /liked-posts` - Get liked posts
- `PATCH /` - Update profile
- `PATCH /notifications` - Update notification settings

### Forum (`/api/forum`)
- `GET /episodes` - Get all episodes
- `GET /posts` - Get posts (with filters)
- `POST /posts` - Create new post
- `GET /posts/:id` - Get post details
- `POST /posts/:id/like` - Toggle like on post
- `POST /posts/:id/comments` - Add comment
- `GET /posts/:id/comments` - Get comments
- `DELETE /posts/:id/comments/:commentId` - Delete comment

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications (Coming Soon)

## 🌐 Deployment

See [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for comprehensive deployment instructions for:
- Vercel
- Railway
- DigitalOcean App Platform
- Custom VPS

## 🧪 Testing

```bash
# Type checking
npm run check

# Build test
npm run build

# Manual testing checklist in DEPLOYMENT-GUIDE.md
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- The XXperiment podcast team
- Medicoz Infosystems
- All contributors and community members

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check [DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md) for deployment help
- Review [FORUM-IMPLEMENTATION.md](./FORUM-IMPLEMENTATION.md) for technical details

---

**Built with ❤️ for The XXperiment community**

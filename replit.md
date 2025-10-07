# Medicoz Infosystems - Project Documentation

## Overview

Medicoz Infosystems is a healthcare technology platform focused on making healthcare more accessible, conversations more meaningful, and technology more human. The application features a modern, story-driven landing page with animated frames that communicate the company's mission and values. Built with React, Express, and PostgreSQL (via Drizzle ORM), it emphasizes clean design, trustworthy aesthetics, and user engagement through parallax effects and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for component-based UI development
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- **Wouter** for lightweight client-side routing (SPA architecture)
- Client code located in `client/src/` with entry point at `main.tsx`

**Styling & Design System**
- **Tailwind CSS** with custom configuration for utility-first styling
- **shadcn/ui** component library (New York variant) providing pre-built, customizable React components
- Custom healthcare-themed color palette defined in CSS variables:
  - Primary colors: Forest Green (#80A586), Sage Green (#CAD9C2), Mint Cream (#EAF3DE)
  - Accent colors: Teal (#74B3BC), Deep Teal (#27515F)
  - Light-only theme (no dark mode) for approachable healthcare aesthetic
- Typography: Inter for headings/body, Playfair Display for accent text
- Design system emphasizes accessibility, trust, and medical professionalism

**Animation & Interactions**
- **Framer Motion** for complex animations, parallax effects, and scroll-based interactions
- Story-driven landing page with 6 sequential animated frames (Frame1Pulse through Frame6Closing)
- Each frame uses scroll progress, viewport detection, and motion values for cinematic storytelling
- Smooth scrolling and view-based animations to guide user attention

**State Management**
- **TanStack Query (React Query)** for server state management and data fetching
- Custom `queryClient` configuration with credentials-based API requests
- No global client state library (lightweight approach for current needs)

### Backend Architecture

**Server Framework**
- **Express.js** running on Node.js with TypeScript
- ESM (ES Modules) format throughout the application
- Custom middleware for request logging and error handling
- Development and production modes with conditional Vite integration

**API Design**
- RESTful API structure with routes prefixed with `/api`
- Route registration system in `server/routes.ts` (currently minimal, ready for expansion)
- Centralized error handling middleware
- Request/response logging with duration tracking

**Development Setup**
- Vite middleware mode for seamless HMR during development
- Custom logging system with timestamp formatting
- Replit-specific plugins for development (cartographer, dev-banner, runtime error overlay)
- Separate build processes for client (Vite) and server (esbuild)

### Data Storage Solutions

**Database**
- **PostgreSQL** as the primary relational database
- **Neon Database** serverless PostgreSQL service (via `@neondatabase/serverless`)
- Connection configured via `DATABASE_URL` environment variable

**ORM & Schema Management**
- **Drizzle ORM** for type-safe database operations
- Schema definitions in `shared/schema.ts` using Drizzle's pgTable syntax
- **drizzle-zod** integration for automatic schema validation
- Migration management via `drizzle-kit` with migrations stored in `migrations/` directory
- Current schema includes basic user table with UUID primary keys

**Storage Abstraction**
- `IStorage` interface in `server/storage.ts` for CRUD operations
- In-memory storage implementation (`MemStorage`) for development/testing
- Design allows easy swapping to database-backed storage without changing route logic
- User management methods: `getUser`, `getUserByUsername`, `createUser`

### Authentication & Authorization

**Current State**
- Basic user schema with username/password fields
- Authentication infrastructure prepared but not fully implemented
- Session management setup via `connect-pg-simple` for PostgreSQL-backed sessions
- Cookie-based credentials included in API requests (`credentials: "include"`)

**Planned Implementation**
- Password hashing and validation (dependencies available)
- Session-based authentication flow
- User registration and login endpoints
- Protected route middleware

### External Dependencies

**UI Component Libraries**
- **Radix UI Primitives** - Unstyled, accessible component primitives (Accordion, Dialog, Dropdown, Select, Toast, etc.)
- **Lucide React** - Icon library for consistent iconography
- **cmdk** - Command menu component for keyboard-driven interactions
- **embla-carousel-react** - Carousel/slider functionality
- **react-day-picker** - Calendar/date picker component
- **input-otp** - OTP input component for authentication flows
- **vaul** - Drawer component primitives

**Form Management & Validation**
- **React Hook Form** - Form state management and validation
- **@hookform/resolvers** - Validation schema resolvers
- **Zod** - TypeScript-first schema validation

**Utility Libraries**
- **class-variance-authority** - Type-safe variant styling
- **clsx** & **tailwind-merge** - Conditional CSS class composition
- **date-fns** - Date manipulation and formatting
- **nanoid** - Unique ID generation

**Development Tools**
- **tsx** - TypeScript execution for Node.js
- **esbuild** - Fast JavaScript bundler for production builds
- **PostCSS** with Autoprefixer for CSS processing
- Replit-specific development plugins for enhanced DX

**Third-Party Services**
- **Neon Database** - Serverless PostgreSQL hosting
- Google Fonts API - Web font delivery (Inter, DM Sans, Geist Mono, Architects Daughter, Fira Code)

**Build & Type System**
- TypeScript with strict mode enabled
- Path aliases configured: `@/` (client), `@shared/` (shared code), `@assets/` (static assets)
- Incremental TypeScript compilation for faster builds
- ESNext module resolution with bundler strategy
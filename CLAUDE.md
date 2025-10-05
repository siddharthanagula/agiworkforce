# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AGI Workforce is a React SPA built with Vite, TypeScript, and Tailwind CSS that provides a platform for managing AI employees. The application uses Auth0 for authentication and features a modern, animated UI with 3D elements.

## Development Commands

```bash
# Start development server (localhost:5173)
npm run dev

# Build for production (compiles TypeScript then builds with Vite)
npm run build

# Build for Vercel deployment (cleans dependencies then builds)
npm run build:vercel

# Lint the codebase
npm run lint

# Preview production build locally
npm run preview

# Setup Auth0 environment (interactive helper script)
npm run setup-auth0
```

## Architecture

### Routing Structure
- **Public Routes**: `/` (landing), `/login`, `/register`, `/marketplace`
- **Protected Routes**: `/dashboard`, `/chat`, `/chat/:id` (require Auth0 authentication)
- Routes are defined in `src/App.tsx` with `react-router-dom`
- Protected routes use `ProtectedRoute` component wrapper (`src/components/auth/ProtectedRoute.tsx`)

### Authentication Flow
- Auth0 is conditionally initialized based on environment variables
- App checks `isAuth0Configured()` to determine if Auth0 credentials are valid
- If Auth0 is not configured, the app runs without authentication but protected routes will redirect to login
- Auth0 config is in `src/lib/auth0.ts`
- Uses `@auth0/auth0-react` with refresh tokens and localStorage caching

### Component Structure
- **Pages**: `src/pages/` - Full page components organized by feature
  - `auth/` - Login and register pages
  - `chat/` - Chat interface for AI employees
  - `dashboard/` - Main dashboard with AI employee management
  - `LandingPage.tsx`, `MarketplacePage.tsx` - Public pages
- **Components**: `src/components/`
  - `ui/` - Reusable UI components (Radix UI + custom animations)
  - `auth/` - Authentication-related components
- **Lib**: `src/lib/` - Utilities and configurations
  - `auth0.ts` - Auth0 configuration and helpers
  - `utils.ts` - General utility functions (e.g., `cn()` for className merging)

### Styling System
- Uses Tailwind CSS with custom theme extensions
- CSS variables for colors defined in `src/index.css` (HSL color system)
- Custom animations: rainbow, marquee, spotlight, fade-in, slide-in
- Dark mode supported via `class` strategy
- Theme colors use HSL format with CSS variables (e.g., `--primary`, `--background`)

### Build Configuration
- Vite with custom chunk splitting:
  - `react-vendors` - React, React-DOM, React-Router
  - `ui-components` - Radix UI, Framer Motion, Lucide React
  - `spline-3d` - Spline 3D library (heavy, separate chunk)
  - `spline-runtime` - Spline runtime (separate from react-spline)
  - `vendor` - Other dependencies
- Path alias: `@/` maps to `./src/`
- Build target: `esnext` with esbuild minification

### Environment Variables
Required for Auth0 authentication:
- `VITE_AUTH0_DOMAIN` - Auth0 tenant domain
- `VITE_AUTH0_CLIENT_ID` - Auth0 application client ID
- `VITE_AUTH0_AUDIENCE` - Auth0 API identifier (optional)

Development uses `.env`, production uses `.env.production`. See `.env.example` for template.

### Deployment
- Deployed to Vercel at `agiworkforce.vercel.app` with custom domain `agiworkforce.com`
- Auth0 must be configured with production callback URLs before deployment
- Use `npm run build:vercel` for Vercel deployments (cleans node_modules first)
- See `DEPLOYMENT_GUIDE.md` and `AUTH0_SETUP_GUIDE.md` for detailed deployment instructions

## UI Component Library

The app uses shadcn/ui pattern with Radix UI primitives. Custom UI components include:
- **Animation Components**: `scroll-expansion-hero`, `vapour-text-effect`, `bento-grid`, `testimonials-with-marquee`
- **AI-Specific**: `ai-prompt-box`, `ai-voice-input`
- **Standard**: `button`, `card`, `input`, `label`, `avatar`, `badge`, `sonner` (toasts)

## Key Technical Details

- **TypeScript**: Strict mode enabled via project references (`tsconfig.json`)
- **React**: Version 19.1.1 with modern features
- **State Management**: Zustand for client state
- **3D Graphics**: Spline library for 3D animations on landing page
- **Icons**: Lucide React + Radix Icons
- **Notifications**: Sonner for toast notifications (global `<Toaster />` in App.tsx)

## Auth0 Setup

If Auth0 is not configured, run `npm run setup-auth0` to get setup instructions. The app will still run but authentication will not work. For production deployment, Auth0 callback URLs must include:
- `https://agiworkforce.com`
- `https://agiworkforce.com/callback`

Allowed origins must include `https://agiworkforce.com`.

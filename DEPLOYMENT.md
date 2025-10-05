# AGI Workforce - Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- GitHub repository connected to Vercel
- Auth0 account and application configured
- Environment variables set in Vercel

### Environment Variables Required

Set these in your Vercel project settings:

```bash
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
VITE_AUTH0_AUDIENCE=your-auth0-audience

# Optional: Supabase Configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Auth0 Configuration

1. **Create Auth0 Application**
   - Go to Auth0 Dashboard → Applications
   - Create new "Single Page Application"
   - Note down Domain, Client ID, and Audience

2. **Configure Allowed URLs**
   - **Allowed Callback URLs**: `https://your-vercel-domain.vercel.app`
   - **Allowed Logout URLs**: `https://your-vercel-domain.vercel.app`
   - **Allowed Web Origins**: `https://your-vercel-domain.vercel.app`

3. **Application Settings**
   - **Application Type**: Single Page Application
   - **Token Endpoint Authentication Method**: None
   - **Grant Types**: Authorization Code, Refresh Token

### Vercel Build Settings

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Deployment Steps

1. **Connect Repository**
   - Import project from GitHub in Vercel
   - Select the repository and branch

2. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all required variables listed above

3. **Deploy**
   - Vercel will automatically build and deploy
   - Check build logs for any issues

4. **Test Authentication**
   - Visit the deployed URL
   - Test login/signup functionality
   - Verify protected routes work correctly

### Build Verification

The project includes:
- ✅ TypeScript compilation
- ✅ Vite build process
- ✅ ESLint validation
- ✅ No build errors

### Authentication Flow

1. **Login**: User clicks "Sign in with Auth0" → Auth0 login → Redirect to dashboard
2. **Signup**: User clicks "Sign up with Auth0" → Auth0 signup → Redirect to dashboard
3. **Protected Routes**: Automatically redirect to login if not authenticated
4. **Logout**: Clears session and redirects to home page

### Troubleshooting

**Build Fails:**
- Check environment variables are set
- Verify Auth0 configuration
- Check Vercel build logs

**Authentication Issues:**
- Verify Auth0 URLs match Vercel domain
- Check environment variables
- Test Auth0 application settings

**Component Issues:**
- All components are properly integrated
- No TypeScript errors
- Responsive design tested

### Features Included

- 🎨 **RainbowButton**: Animated gradient button
- 🎤 **AIVoiceInput**: Voice recording simulation
- 📝 **AIPromptBox**: Multi-modal input with voice, images, text
- 🏗️ **BentoGrid**: Responsive card layouts
- 💬 **ExpandableChat**: Full chat interface
- 📭 **EmptyState**: Animated empty states
- 🔔 **Sonner**: Toast notifications
- 🎬 **ScrollExpansionHero**: Scroll-based media expansion
- 💬 **TestimonialsWithMarquee**: Scrolling testimonials
- ✨ **VaporizeTextCycle**: Canvas-based text animations

All components are fully responsive, accessible, and optimized for performance.

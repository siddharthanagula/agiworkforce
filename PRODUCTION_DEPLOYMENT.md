# 🚀 Production Deployment Guide for AGI Workforce

This guide covers deploying the AGI Workforce application directly to production at `https://agiworkforce.com`.

## 🌐 Production-Only Configuration

The application is configured exclusively for production deployment to:
- **Production**: `https://agiworkforce.com`

## 📋 Pre-Deployment Checklist

### 1. Auth0 Configuration
- [ ] Auth0 application created
- [ ] Production URLs configured in Auth0 dashboard
- [ ] Environment variables ready for deployment

### 2. Auth0 Dashboard Settings
Configure these URLs in your Auth0 application settings:

#### Allowed Callback URLs
```
https://agiworkforce.com
https://agiworkforce.com/callback
```

#### Allowed Logout URLs
```
https://agiworkforce.com
```

#### Allowed Web Origins
```
https://agiworkforce.com
```

#### Allowed Origins (CORS)
```
https://agiworkforce.com
```

### 3. Environment Variables
Set these environment variables in your hosting platform:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_APP_URL=https://agiworkforce.com
```

## 🏗️ Build for Production

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Application
```bash
npm run build
```

### 3. Verify Build Output
The build will create a `dist` folder with all the production files.

## 🌍 Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_AUTH0_DOMAIN`
   - `VITE_AUTH0_CLIENT_ID`
   - `VITE_AUTH0_AUDIENCE`
   - `VITE_APP_URL`
3. Deploy automatically on push to main branch
4. Custom domain: Set `agiworkforce.com` as your custom domain

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Custom domain: Set `agiworkforce.com` as your custom domain

### Option 3: Manual Deployment
1. Build the application: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your web server to serve the SPA
4. Set up SSL certificate for HTTPS
5. Configure domain to point to `agiworkforce.com`

## 🔧 Environment Variables for Production

### Required Variables
```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_APP_URL=https://agiworkforce.com
```

### Optional Variables
```env
VITE_AUTH0_AUDIENCE=your-api-identifier
```

## 🔒 Security Considerations

### 1. HTTPS Only
- Ensure your production domain uses HTTPS
- Auth0 requires HTTPS for production

### 2. Environment Variables
- Never commit `.env` files to version control
- Use your hosting platform's environment variable system

### 3. Auth0 Configuration
- Use production Auth0 application (not development)
- Monitor Auth0 logs for suspicious activity
- Regularly review and update security settings

## 🧪 Testing Production Deployment

### 1. Authentication Flow
1. Navigate to `https://agiworkforce.com`
2. Click "Sign in with Email" or "Sign in with GitHub"
3. Complete the authentication flow
4. Verify redirect to dashboard

### 2. Protected Routes
1. Try accessing `https://agiworkforce.com/dashboard` without authentication
2. Should redirect to login page
3. After login, should access dashboard successfully

### 3. Logout Flow
1. Click logout button
2. Should redirect to landing page
3. Should not be able to access protected routes

## 🐛 Troubleshooting Production Issues

### Common Issues

#### 1. "Invalid redirect URI"
- Check Auth0 dashboard settings
- Ensure production URLs are configured
- Verify HTTPS is enabled

#### 2. "Access denied"
- Check CORS settings in Auth0
- Verify web origins are configured
- Check browser console for errors

#### 3. "Auth0 is not properly configured"
- Verify environment variables are set
- Check that production build includes variables
- Ensure no typos in domain or client ID

### Debug Steps
1. Check browser console for errors
2. Verify Auth0 dashboard logs
3. Test with different browsers
4. Check network requests in browser dev tools

## 📊 Monitoring and Analytics

### Auth0 Dashboard
- Monitor login attempts
- Check for failed authentications
- Review user activity logs

### Application Monitoring
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor performance metrics
- Track user engagement

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run deploy
        env:
          VITE_AUTH0_DOMAIN: ${{ secrets.AUTH0_DOMAIN }}
          VITE_AUTH0_CLIENT_ID: ${{ secrets.AUTH0_CLIENT_ID }}
          VITE_APP_URL: https://agiworkforce.com
```

## 📞 Support

If you encounter issues during deployment:
1. Check the troubleshooting section above
2. Review Auth0 dashboard logs
3. Verify environment variables
4. Test authentication flow step by step

---

**Ready to deploy to https://agiworkforce.com! 🚀**

# 🔧 Auth0 Callback URL Fix

## ❌ Common Error: "callbacks must be a valid uri"

If you're seeing the error **"callbacks must be a valid uri"** in your Auth0 dashboard, here's how to fix it:

## ✅ **Correct Callback URL Format**

### For Production (https://agiworkforce.com)
```
https://agiworkforce.com
https://agiworkforce.com/callback
```

## 🚫 **Common Mistakes to Avoid**

1. **Don't include trailing slashes** (unless your app requires them)
2. **Don't use HTTP** - use HTTPS for production
3. **Don't mix HTTP and HTTPS** - use consistent protocols
4. **Don't include query parameters** in callback URLs
5. **Don't use IP addresses** - use domain names

## 🔧 **Step-by-Step Fix**

### 1. Check Your Current URLs
In your Auth0 dashboard, go to:
- **Applications** → **Your App** → **Settings**
- Look at the **Allowed Callback URLs** field

### 2. Clear and Re-enter URLs
1. **Clear the field completely**
2. **Add URLs one by one:**
   ```
   https://agiworkforce.com
   ```
   Press Enter, then add:
   ```
   https://agiworkforce.com/callback
   ```

### 3. Save Changes
Click **Save Changes** at the bottom of the page.

## 🧪 **Test the Configuration**

### 1. Deploy to Production
```bash
npm run build
# Deploy the dist folder to your hosting platform
```

### 2. Test Login Flow
1. Navigate to `https://agiworkforce.com`
2. Click "Sign in with Email" or "Sign in with GitHub"
3. Complete the authentication flow
4. Verify you're redirected back to your app

### 3. Check Browser Console
Look for any Auth0-related errors in the browser console.

## 🔍 **Debugging Tips**

### Check Network Tab
1. Open browser DevTools
2. Go to Network tab
3. Try to log in
4. Look for failed requests to Auth0

### Common Issues and Solutions

#### Issue: "Invalid redirect_uri"
**Solution:** Check that your callback URLs exactly match what's in Auth0 dashboard

#### Issue: "Access denied"
**Solution:** Check CORS settings and web origins

#### Issue: "Invalid client"
**Solution:** Verify your Client ID is correct

## 📋 **Complete Auth0 Configuration Checklist**

### ✅ Application Settings
- [ ] **Application Type**: Single Page Application
- [ ] **Allowed Callback URLs**: 
  - `http://localhost:5173`
  - `http://localhost:5173/callback`
  - `https://agiworkforce.com`
  - `https://agiworkforce.com/callback`
- [ ] **Allowed Logout URLs**:
  - `http://localhost:5173`
  - `https://agiworkforce.com`
- [ ] **Allowed Web Origins**:
  - `http://localhost:5173`
  - `https://agiworkforce.com`
- [ ] **Allowed Origins (CORS)**:
  - `http://localhost:5173`
  - `https://agiworkforce.com`

### ✅ Environment Variables
```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_APP_URL=http://localhost:5173
```

### ✅ Code Configuration
Your `src/lib/auth0.ts` should have:
```typescript
const auth0Config = {
  domain: (import.meta as any).env?.VITE_AUTH0_DOMAIN,
  clientId: (import.meta as any).env?.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: (import.meta as any).env?.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email'
  },
  useRefreshTokens: true,
  cacheLocation: 'localstorage'
}
```

## 🚀 **Production Deployment**

When deploying to production:

1. **Update Environment Variables:**
   ```env
   VITE_APP_URL=https://agiworkforce.com
   ```

2. **Update Auth0 Dashboard:**
   - Add production URLs to all settings
   - Test the production login flow

3. **Test Both Environments:**
   - Development: `http://localhost:5173`
   - Production: `https://agiworkforce.com`

## 🆘 **Still Having Issues?**

If you're still experiencing problems:

1. **Check Auth0 Logs:**
   - Go to Auth0 Dashboard → Monitoring → Logs
   - Look for authentication failures

2. **Verify Domain Format:**
   - Should be: `your-domain.auth0.com`
   - Not: `https://your-domain.auth0.com`

3. **Test with Different Browsers:**
   - Clear browser cache
   - Try incognito/private mode

4. **Check Network Connectivity:**
   - Ensure you can reach Auth0 servers
   - Check for firewall issues

---

**Need more help?** Check the [Auth0 Documentation](https://auth0.com/docs) or [Auth0 Community](https://community.auth0.com/).

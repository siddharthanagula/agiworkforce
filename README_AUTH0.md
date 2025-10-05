# 🔐 Auth0 Authentication Setup for AGI Workforce

This guide will help you set up Auth0 authentication for the AGI Workforce application.

## 🚀 Quick Start

1. **Run the setup helper:**
   ```bash
   npm run setup-auth0
   ```

2. **Follow the Auth0 Dashboard setup steps below**

3. **Update your `.env` file with your Auth0 credentials**

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📋 Auth0 Dashboard Configuration

### Step 1: Create Auth0 Account
1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Sign up for a free account or sign in

### Step 2: Create Application
1. Navigate to **Applications** > **Applications**
2. Click **"Create Application"**
3. Choose **"Single Page Application"**
4. Name it **"AGI Workforce App"**
5. Click **"Create"**

### Step 3: Configure Application Settings
In your application settings, configure the following:

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

### Step 4: Copy Credentials
From your application settings, copy:
- **Domain** (e.g., `your-domain.auth0.com`)
- **Client ID** (e.g., `abc123def456...`)

## 🔧 Environment Configuration

### Create `.env` File
Create a `.env` file in your project root:

```env
# Auth0 Configuration
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_APP_URL=http://localhost:5173
```

### Environment Variables Explained

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_AUTH0_DOMAIN` | Your Auth0 domain | ✅ Yes |
| `VITE_AUTH0_CLIENT_ID` | Your Auth0 client ID | ✅ Yes |
| `VITE_AUTH0_AUDIENCE` | API identifier (optional) | ❌ No |
| `VITE_APP_URL` | Your application URL | ✅ Yes |

## 🧪 Testing Authentication

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Login Flow
1. Navigate to `http://localhost:5173`
2. Click **"Sign in with Email"** or **"Sign in with GitHub"**
3. Complete the authentication flow
4. Verify you're redirected to the dashboard

### 3. Test Protected Routes
- Try accessing `/dashboard` without authentication
- Should redirect to login page
- After login, should access dashboard successfully

## 🔒 Security Features

### Implemented Security Measures
- ✅ **Protected Routes** - Dashboard and chat require authentication
- ✅ **Automatic Redirects** - Unauthenticated users redirected to login
- ✅ **Token Management** - Auth0 handles token refresh automatically
- ✅ **Scope Configuration** - Requests `openid profile email` scopes
- ✅ **Environment Validation** - Checks for proper Auth0 configuration

### Authentication Flow
1. User clicks login button
2. Redirected to Auth0 Universal Login
3. User authenticates with Auth0
4. Auth0 redirects back to app with tokens
5. App stores tokens and user info
6. User can access protected routes

## 🚀 Production Deployment

### Environment Variables
Set these environment variables in your hosting platform:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_APP_URL=https://agiworkforce.com
```

### Update Auth0 Application Settings
In your Auth0 dashboard, update the URLs:

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

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Auth0 is not properly configured"
- Check your `.env` file exists
- Verify environment variables are set correctly
- Ensure no typos in domain or client ID

#### 2. "Invalid redirect URI"
- Check Auth0 dashboard settings
- Ensure callback URLs match exactly
- Include both `http://localhost:5173` and `http://localhost:5173/callback`

#### 3. "Access denied"
- Check CORS settings in Auth0 dashboard
- Verify web origins are configured
- Ensure the domain is correct

#### 4. Login button not working
- Check browser console for errors
- Verify Auth0 configuration is loaded
- Ensure the development server is running

### Debug Mode
To enable debug logging, add to your `.env`:

```env
VITE_AUTH0_DEBUG=true
```

## 📚 Additional Resources

- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login)
- [Auth0 Dashboard](https://manage.auth0.com/)

## 🆘 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your Auth0 configuration
3. Ensure all environment variables are set
4. Check the Auth0 dashboard logs

---

**Happy coding! 🚀**

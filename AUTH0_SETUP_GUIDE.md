# Auth0 Setup Guide for AGI Workforce

## Step 1: Create Auth0 Application

1. Go to [Auth0 Dashboard](https://manage.auth0.com/)
2. Sign in or create an account
3. Navigate to Applications > Applications
4. Click "Create Application"
5. Choose "Single Page Application"
6. Name it "AGI Workforce App"

## Step 2: Configure Application Settings

### Allowed Callback URLs
```
https://agiworkforce.com
https://agiworkforce.com/callback
```

### Allowed Logout URLs
```
https://agiworkforce.com
```

### Allowed Web Origins
```
https://agiworkforce.com
```

### Allowed Origins (CORS)
```
https://agiworkforce.com
```

## Step 3: Environment Variables

Create a `.env` file in your project root with:

```env
VITE_AUTH0_DOMAIN=your-domain.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
VITE_APP_URL=https://agiworkforce.com
```

## Step 4: Deploy to Production

1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables in your hosting platform
4. Navigate to `https://agiworkforce.com`
5. Test the authentication flow

## Step 5: Verify Production Deployment

1. Navigate to `https://agiworkforce.com`
2. Click "Sign in with Email" or "Sign in with GitHub"
3. Complete the authentication flow
4. Verify you're redirected back to the dashboard

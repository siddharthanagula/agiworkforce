# Auth0 Setup Guide for AGI Workforce

## 🔧 **Auth0 Configuration Steps**

### **1. Create Auth0 Application**

1. **Go to Auth0 Dashboard** → Applications
2. **Click "Create Application"**
3. **Name**: "AGI Workforce"
4. **Application Type**: "Single Page Application"
5. **Technology**: "React"

### **2. Configure Application Settings**

#### **Basic Information**
- **Name**: AGI Workforce
- **Description**: AI Workforce Management Platform
- **Application Type**: Single Page Application

#### **Application URIs**
```
Allowed Callback URLs:
- http://localhost:5173 (for development)
- https://your-vercel-domain.vercel.app (for production)

Allowed Logout URLs:
- http://localhost:5173 (for development)
- https://your-vercel-domain.vercel.app (for production)

Allowed Web Origins:
- http://localhost:5173 (for development)
- https://your-vercel-domain.vercel.app (for production)

Allowed Origins (CORS):
- http://localhost:5173 (for development)
- https://your-vercel-domain.vercel.app (for production)
```

#### **Advanced Settings**
- **Grant Types**: 
  - ✅ Authorization Code
  - ✅ Refresh Token
- **Response Types**: 
  - ✅ Code
- **Token Endpoint Authentication Method**: None
- **Application Type**: Single Page Application

### **3. Environment Variables**

Set these in your Vercel project settings:

```bash
# Required Auth0 Variables
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### **4. Database Connection Setup**

1. **Go to Authentication** → Database
2. **Create Database Connection**:
   - **Name**: "Username-Password-Authentication"
   - **Type**: "Database"
3. **Enable for your application**

### **5. Social Connections (Optional)**

#### **Google Social Login**
1. **Authentication** → Social
2. **Create Google Connection**
3. **Configure Google OAuth**
4. **Enable for your application**

#### **GitHub Social Login**
1. **Authentication** → Social
2. **Create GitHub Connection**
3. **Configure GitHub OAuth**
4. **Enable for your application**

### **6. Universal Login Configuration**

1. **Go to Branding** → Universal Login
2. **Enable Universal Login**
3. **Customize login page** (optional)
4. **Configure advanced options**:
   - ✅ Enable WCAG compliance
   - ✅ Enable internationalization

### **7. Rules and Actions (Optional)**

#### **Create Auth0 Action for User Metadata**
```javascript
exports.onExecutePostLogin = async (event, api) => {
  // Add custom user metadata
  if (event.user.app_metadata) {
    api.user.setAppMetadata('signup_date', new Date().toISOString());
  }
};
```

### **8. Testing Authentication**

#### **Development Testing**
1. **Start your app**: `npm run dev`
2. **Visit**: `http://localhost:5173/login`
3. **Test login/signup flow**
4. **Check Auth0 logs** for any errors

#### **Production Testing**
1. **Deploy to Vercel**
2. **Set environment variables**
3. **Test authentication flow**
4. **Monitor Auth0 logs**

### **9. Common Issues and Solutions**

#### **"Callback URL mismatch" Error**
- ✅ **Check Allowed Callback URLs** in Auth0 Dashboard
- ✅ **Ensure URLs match exactly** (including protocol)
- ✅ **Add both HTTP and HTTPS** for development

#### **"Invalid redirect_uri" Error**
- ✅ **Verify redirect_uri** in Auth0 configuration
- ✅ **Check environment variables** are set correctly
- ✅ **Ensure domain matches** your Auth0 tenant

#### **"Access denied" Error**
- ✅ **Check application settings** in Auth0
- ✅ **Verify client ID** is correct
- ✅ **Check user permissions** and roles

### **10. Security Best Practices**

#### **Application Security**
- ✅ **Use HTTPS** in production
- ✅ **Set secure cookie settings**
- ✅ **Enable refresh tokens**
- ✅ **Configure token expiration**

#### **User Security**
- ✅ **Enable MFA** (Multi-Factor Authentication)
- ✅ **Set password policies**
- ✅ **Enable breached password detection**
- ✅ **Configure account lockout**

### **11. Monitoring and Analytics**

#### **Auth0 Dashboard**
- **Monitor login attempts**
- **Track user registrations**
- **View error logs**
- **Analyze user behavior**

#### **Application Monitoring**
- **Track authentication errors**
- **Monitor token refresh**
- **Log user sessions**
- **Track performance metrics**

## 🚀 **Quick Start Checklist**

- [ ] Create Auth0 application
- [ ] Configure callback URLs
- [ ] Set environment variables
- [ ] Test login flow
- [ ] Test signup flow
- [ ] Deploy to production
- [ ] Monitor authentication

## 📞 **Support**

If you encounter issues:
1. **Check Auth0 logs** in Dashboard
2. **Verify environment variables**
3. **Test with different browsers**
4. **Check network connectivity**
5. **Contact Auth0 support** if needed

## 🔗 **Useful Links**

- [Auth0 Universal Login Documentation](https://auth0.com/docs/authenticate/login/auth0-universal-login)
- [Auth0 React SDK](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Dashboard](https://manage.auth0.com/)
- [Auth0 Community](https://community.auth0.com/)

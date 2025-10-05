# Manual Auth0 Setup Guide

## 🔐 **Step-by-Step Auth0 Configuration**

Since PowerShell execution policies are blocking script execution, let's configure Auth0 manually through the dashboard.

### **1. Access Auth0 Dashboard**
- Go to [Auth0 Dashboard](https://manage.auth0.com/)
- Sign in with your Auth0 account
- Select your tenant

### **2. Create Application (if not exists)**
1. **Applications** → **Create Application**
2. **Name**: "AGI Workforce"
3. **Application Type**: "Single Page Application"
4. **Technology**: "React"
5. **Click "Create"**

### **3. Configure Application Settings**

#### **Basic Information**
```
Name: AGI Workforce
Description: AI Workforce Management Platform
Application Type: Single Page Application
```

#### **Application URIs (CRITICAL - Copy these exactly)**
```
Allowed Callback URLs:
http://localhost:5173
https://your-vercel-domain.vercel.app

Allowed Logout URLs:
http://localhost:5173
https://your-vercel-domain.vercel.app

Allowed Web Origins:
http://localhost:5173
https://your-vercel-domain.vercel.app

Allowed Origins (CORS):
http://localhost:5173
https://your-vercel-domain.vercel.app
```

#### **Advanced Settings**
```
Grant Types:
✅ Authorization Code
✅ Refresh Token

Response Types:
✅ Code

Token Endpoint Authentication Method: None

Application Type: Single Page Application
```

### **4. Get Your Credentials**

After configuration, copy these values from the **Settings** tab:

```
Domain: your-tenant.auth0.com
Client ID: your-client-id
Audience: your-api-identifier (optional)
```

### **5. Set Environment Variables in Vercel**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. **Add these variables:**

```bash
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### **6. Configure Database Connection**

1. **Authentication** → **Database**
2. **Create Database Connection**:
   - **Name**: "Username-Password-Authentication"
   - **Type**: "Database"
3. **Enable for your application**

### **7. Test Authentication**

#### **Local Testing:**
1. **Start your app**: `npm run dev`
2. **Visit**: `http://localhost:5173/login`
3. **Test login/signup**

#### **Production Testing:**
1. **Deploy to Vercel**
2. **Test authentication flow**
3. **Check Auth0 logs**

### **8. Common Issues and Solutions**

#### **"Callback URL mismatch" Error**
- ✅ **Check Allowed Callback URLs** in Auth0 Dashboard
- ✅ **Ensure URLs match exactly** (including protocol)
- ✅ **Add both HTTP and HTTPS** for development

#### **"Invalid redirect_uri" Error**
- ✅ **Verify redirect_uri** in Auth0 configuration
- ✅ **Check environment variables** are set correctly
- ✅ **Ensure domain matches** your Auth0 tenant

### **9. Quick Configuration Checklist**

- [ ] Create/configure Auth0 application
- [ ] Set callback URLs correctly
- [ ] Configure environment variables
- [ ] Test local authentication
- [ ] Deploy to Vercel
- [ ] Test production authentication
- [ ] Monitor Auth0 logs

## 🚀 **Ready to Deploy**

Once you've completed these steps:

1. **Your Auth0 application** will be properly configured
2. **Environment variables** will be set in Vercel
3. **Authentication flow** will work seamlessly
4. **No more callback URL errors**

## 📞 **Need Help?**

If you encounter issues:
1. **Check Auth0 logs** in Dashboard
2. **Verify environment variables**
3. **Test with different browsers**
4. **Contact Auth0 support** if needed

## 🔗 **Useful Links**

- [Auth0 Dashboard](https://manage.auth0.com/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Community](https://community.auth0.com/)
- [Auth0 Support](https://support.auth0.com/)

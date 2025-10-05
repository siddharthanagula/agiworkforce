# Auth0 Dashboard Configuration Guide

## 🔧 **Step-by-Step Auth0 Dashboard Setup**

### **1. Access Auth0 Dashboard**
- Go to [Auth0 Dashboard](https://manage.auth0.com/)
- Sign in with your Auth0 account
- Select your tenant

### **2. Create/Configure Application**

#### **If Creating New Application:**
1. **Applications** → **Create Application**
2. **Name**: "AGI Workforce"
3. **Application Type**: "Single Page Application"
4. **Technology**: "React"
5. **Click "Create"**

#### **If Using Existing Application:**
1. **Applications** → Select your app
2. **Go to "Settings" tab**

### **3. Configure Application Settings**

#### **Basic Information**
```
Name: AGI Workforce
Description: AI Workforce Management Platform
Application Type: Single Page Application
```

#### **Application URIs (CRITICAL)**
```
Allowed Callback URLs:
- http://localhost:5173
- https://your-vercel-domain.vercel.app
- https://your-production-domain.com

Allowed Logout URLs:
- http://localhost:5173
- https://your-vercel-domain.vercel.app
- https://your-production-domain.com

Allowed Web Origins:
- http://localhost:5173
- https://your-vercel-domain.vercel.app
- https://your-production-domain.com

Allowed Origins (CORS):
- http://localhost:5173
- https://your-vercel-domain.vercel.app
- https://your-production-domain.com
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

After configuration, copy these values:

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

### **8. Monitor Authentication**

1. **Auth0 Dashboard** → **Monitoring** → **Logs**
2. **Check for errors** in authentication flow
3. **Monitor user registrations** and logins

## 🚨 **Common Issues and Solutions**

### **"Callback URL mismatch" Error**
- ✅ **Check Allowed Callback URLs** in Auth0 Dashboard
- ✅ **Ensure URLs match exactly** (including protocol)
- ✅ **Add both HTTP and HTTPS** for development

### **"Invalid redirect_uri" Error**
- ✅ **Verify redirect_uri** in Auth0 configuration
- ✅ **Check environment variables** are set correctly
- ✅ **Ensure domain matches** your Auth0 tenant

### **"Access denied" Error**
- ✅ **Check application settings** in Auth0
- ✅ **Verify client ID** is correct
- ✅ **Check user permissions** and roles

## 📋 **Quick Checklist**

- [ ] Create/configure Auth0 application
- [ ] Set callback URLs correctly
- [ ] Configure environment variables
- [ ] Test local authentication
- [ ] Deploy to Vercel
- [ ] Test production authentication
- [ ] Monitor Auth0 logs

## 🔗 **Useful Links**

- [Auth0 Dashboard](https://manage.auth0.com/)
- [Auth0 Documentation](https://auth0.com/docs)
- [Auth0 Community](https://community.auth0.com/)
- [Auth0 Support](https://support.auth0.com/)

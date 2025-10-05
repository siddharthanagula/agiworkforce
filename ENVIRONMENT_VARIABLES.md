# Environment Variables Configuration

## 🔧 **Required Environment Variables for Vercel**

Set these in your Vercel project settings:

### **Auth0 Configuration**
```bash
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### **How to Set Environment Variables in Vercel:**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings** → **Environment Variables**
4. **Add each variable** with the values from your Auth0 Dashboard

### **Where to Find These Values:**

#### **VITE_AUTH0_DOMAIN**
- Go to Auth0 Dashboard → Applications → Your App → Settings
- Copy the **Domain** value
- Example: `dev-abc123.us.auth0.com`

#### **VITE_AUTH0_CLIENT_ID**
- Go to Auth0 Dashboard → Applications → Your App → Settings
- Copy the **Client ID** value
- Example: `abc123def456ghi789`

#### **VITE_AUTH0_AUDIENCE**
- Go to Auth0 Dashboard → Applications → Your App → Settings
- Copy the **Identifier** value (if you have an API)
- Example: `https://your-tenant.auth0.com/api/v2/`

### **Optional Environment Variables**

```bash
# Supabase (if using)
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# API Keys (if using)
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_ANTHROPIC_API_KEY=your-anthropic-api-key
VITE_GOOGLE_API_KEY=your-google-api-key
```

### **Environment Variables for Different Environments**

#### **Development (Local)**
```bash
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

#### **Production (Vercel)**
```bash
VITE_AUTH0_DOMAIN=your-tenant.auth0.com
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-api-identifier
```

### **Testing Environment Variables**

After setting the variables:

1. **Redeploy your Vercel project**
2. **Check the build logs** for any errors
3. **Test authentication** on your live site
4. **Check Auth0 logs** for any issues

### **Common Issues**

#### **"Environment variable not found"**
- ✅ **Check variable names** are exactly as shown
- ✅ **Ensure variables are set** in Vercel
- ✅ **Redeploy after setting** variables

#### **"Invalid domain" error**
- ✅ **Check VITE_AUTH0_DOMAIN** is correct
- ✅ **Ensure no trailing slashes** in domain
- ✅ **Verify domain format** (tenant.auth0.com)

#### **"Invalid client ID" error**
- ✅ **Check VITE_AUTH0_CLIENT_ID** is correct
- ✅ **Copy from Auth0 Dashboard** exactly
- ✅ **No extra spaces** in the value

### **Quick Setup Checklist**

- [ ] Get values from Auth0 Dashboard
- [ ] Set variables in Vercel
- [ ] Redeploy project
- [ ] Test authentication
- [ ] Check for errors
- [ ] Monitor Auth0 logs

# PowerShell Setup for Auth0 CLI

## 🔧 **Fix PowerShell Execution Policy**

### **Method 1: Temporary Fix (Recommended)**
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Method 2: Bypass for Current Session**
```powershell
# Run this command before using npm
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

### **Method 3: Use Command Prompt Instead**
```cmd
# Open Command Prompt (cmd) instead of PowerShell
# Then run npm commands normally
npm install -g @auth0/auth0-cli
```

## 🚀 **Install Auth0 CLI**

### **After fixing execution policy:**
```bash
# Install Auth0 CLI globally
npm install -g @auth0/auth0-cli

# Verify installation
auth0 --version
```

## 🔐 **Auth0 CLI Login**

```bash
# Login to Auth0
auth0 login

# Select your tenant
auth0 tenants list

# Switch to your tenant
auth0 tenants use your-tenant-name
```

## ⚙️ **Configure Application**

```bash
# List applications
auth0 apps list

# Update application settings
auth0 apps update your-app-id --callbacks "http://localhost:5173,https://your-vercel-domain.vercel.app"

# Update logout URLs
auth0 apps update your-app-id --logout-urls "http://localhost:5173,https://your-vercel-domain.vercel.app"

# Update web origins
auth0 apps update your-app-id --web-origins "http://localhost:5173,https://your-vercel-domain.vercel.app"
```

## 🔍 **Monitor and Debug**

```bash
# View application details
auth0 apps show your-app-id

# View logs
auth0 logs tail

# Test authentication
auth0 test login
```

## 📋 **Quick Commands**

```bash
# Login to Auth0
auth0 login

# List tenants
auth0 tenants list

# Use specific tenant
auth0 tenants use your-tenant

# List applications
auth0 apps list

# Show application details
auth0 apps show your-app-id

# Update application
auth0 apps update your-app-id --callbacks "http://localhost:5173"

# View logs
auth0 logs tail
```

## ⚠️ **Important Notes**

1. **Run PowerShell as Administrator** for execution policy changes
2. **Use Command Prompt** if PowerShell issues persist
3. **Replace placeholders** with your actual values
4. **Test authentication** after configuration
5. **Monitor Auth0 logs** for any errors

## 🔗 **Useful Resources**

- [Auth0 CLI Documentation](https://auth0.com/docs/cli)
- [PowerShell Execution Policy](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies)
- [Auth0 Management API](https://auth0.com/docs/api/management/v2)

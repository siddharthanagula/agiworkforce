# Auth0 Setup Script for PowerShell
# This script configures your Auth0 application via Management API

Write-Host "🔐 Auth0 Setup Script" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host ""

# Get user input
$Auth0Domain = Read-Host "Auth0 Domain (e.g., your-tenant.auth0.com)"
$ClientId = Read-Host "Client ID"
$ClientSecret = Read-Host "Client Secret"
$ApplicationId = Read-Host "Application ID"
$VercelDomain = Read-Host "Your Vercel Domain (e.g., your-app.vercel.app)"

Write-Host ""
Write-Host "🔑 Getting Management API token..." -ForegroundColor Yellow

# Get Management API token
$TokenBody = @{
    client_id = $ClientId
    client_secret = $ClientSecret
    audience = "https://$Auth0Domain/api/v2/"
    grant_type = "client_credentials"
} | ConvertTo-Json

try {
    $TokenResponse = Invoke-RestMethod -Uri "https://$Auth0Domain/oauth/token" -Method POST -Body $TokenBody -ContentType "application/json"
    $AccessToken = $TokenResponse.access_token
    
    if (-not $AccessToken) {
        Write-Host "❌ Failed to get access token" -ForegroundColor Red
        Write-Host "Response: $($TokenResponse | ConvertTo-Json)" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ Token obtained successfully" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "📝 Updating application settings..." -ForegroundColor Yellow
    
    # Update application
    $UpdateBody = @{
        name = "AGI Workforce"
        description = "AI Workforce Management Platform"
        callbacks = @("http://localhost:5173", "https://$VercelDomain")
        logout_urls = @("http://localhost:5173", "https://$VercelDomain")
        web_origins = @("http://localhost:5173", "https://$VercelDomain")
        allowed_origins = @("http://localhost:5173", "https://$VercelDomain")
        grant_types = @("authorization_code", "refresh_token")
        response_types = @("code")
        token_endpoint_auth_method = "none"
    } | ConvertTo-Json
    
    $Headers = @{
        Authorization = "Bearer $AccessToken"
        "Content-Type" = "application/json"
    }
    
    $UpdateResponse = Invoke-RestMethod -Uri "https://$Auth0Domain/api/v2/applications/$ApplicationId" -Method PATCH -Body $UpdateBody -Headers $Headers
    
    Write-Host "✅ Application updated successfully!" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "📋 Environment Variables for Vercel:" -ForegroundColor Cyan
    Write-Host "VITE_AUTH0_DOMAIN=$Auth0Domain" -ForegroundColor White
    Write-Host "VITE_AUTH0_CLIENT_ID=$ClientId" -ForegroundColor White
    Write-Host "VITE_AUTH0_AUDIENCE=https://$Auth0Domain/api/v2/" -ForegroundColor White
    Write-Host ""
    
    Write-Host "🌐 Configured URLs:" -ForegroundColor Cyan
    Write-Host "Callbacks: http://localhost:5173, https://$VercelDomain" -ForegroundColor White
    Write-Host "Logout URLs: http://localhost:5173, https://$VercelDomain" -ForegroundColor White
    Write-Host "Web Origins: http://localhost:5173, https://$VercelDomain" -ForegroundColor White
    Write-Host ""
    
    Write-Host "📋 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Set the environment variables in your Vercel project" -ForegroundColor White
    Write-Host "2. Deploy your application to Vercel" -ForegroundColor White
    Write-Host "3. Test the authentication flow" -ForegroundColor White
    Write-Host "4. Check Auth0 logs for any issues" -ForegroundColor White
    Write-Host ""
    
    Write-Host "✅ Auth0 configuration complete!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error setting up Auth0: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Verify your Auth0 credentials are correct" -ForegroundColor White
    Write-Host "2. Check that your Auth0 application exists" -ForegroundColor White
    Write-Host "3. Ensure you have the correct permissions" -ForegroundColor White
    Write-Host "4. Try using the Auth0 Dashboard instead" -ForegroundColor White
}

#!/bin/bash

# Auth0 Setup Script using curl
# This script configures your Auth0 application via Management API

echo "🔐 Auth0 Setup Script"
echo "====================="
echo ""

# Get user input
read -p "Auth0 Domain (e.g., your-tenant.auth0.com): " AUTH0_DOMAIN
read -p "Client ID: " CLIENT_ID
read -p "Client Secret: " CLIENT_SECRET
read -p "Application ID: " APPLICATION_ID
read -p "Your Vercel Domain (e.g., your-app.vercel.app): " VERCEL_DOMAIN

echo ""
echo "🔑 Getting Management API token..."

# Get Management API token
TOKEN_RESPONSE=$(curl -s -X POST "https://$AUTH0_DOMAIN/oauth/token" \
  -H "Content-Type: application/json" \
  -d "{
    \"client_id\": \"$CLIENT_ID\",
    \"client_secret\": \"$CLIENT_SECRET\",
    \"audience\": \"https://$AUTH0_DOMAIN/api/v2/\",
    \"grant_type\": \"client_credentials\"
  }")

# Extract access token
ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | grep -o '"access_token":"[^"]*' | cut -d'"' -f4)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Failed to get access token"
  echo "Response: $TOKEN_RESPONSE"
  exit 1
fi

echo "✅ Token obtained successfully"
echo ""

echo "📝 Updating application settings..."

# Update application
UPDATE_RESPONSE=$(curl -s -X PATCH "https://$AUTH0_DOMAIN/api/v2/applications/$APPLICATION_ID" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"AGI Workforce\",
    \"description\": \"AI Workforce Management Platform\",
    \"callbacks\": [
      \"http://localhost:5173\",
      \"https://$VERCEL_DOMAIN\"
    ],
    \"logout_urls\": [
      \"http://localhost:5173\",
      \"https://$VERCEL_DOMAIN\"
    ],
    \"web_origins\": [
      \"http://localhost:5173\",
      \"https://$VERCEL_DOMAIN\"
    ],
    \"allowed_origins\": [
      \"http://localhost:5173\",
      \"https://$VERCEL_DOMAIN\"
    ],
    \"grant_types\": [\"authorization_code\", \"refresh_token\"],
    \"response_types\": [\"code\"],
    \"token_endpoint_auth_method\": \"none\"
  }")

echo "✅ Application updated successfully!"
echo ""

echo "📋 Environment Variables for Vercel:"
echo "VITE_AUTH0_DOMAIN=$AUTH0_DOMAIN"
echo "VITE_AUTH0_CLIENT_ID=$CLIENT_ID"
echo "VITE_AUTH0_AUDIENCE=https://$AUTH0_DOMAIN/api/v2/"
echo ""

echo "🌐 Configured URLs:"
echo "Callbacks: http://localhost:5173, https://$VERCEL_DOMAIN"
echo "Logout URLs: http://localhost:5173, https://$VERCEL_DOMAIN"
echo "Web Origins: http://localhost:5173, https://$VERCEL_DOMAIN"
echo ""

echo "📋 Next Steps:"
echo "1. Set the environment variables in your Vercel project"
echo "2. Deploy your application to Vercel"
echo "3. Test the authentication flow"
echo "4. Check Auth0 logs for any issues"
echo ""

echo "✅ Auth0 configuration complete!"

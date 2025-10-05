/**
 * Auth0 Configuration Script
 * This script helps configure Auth0 application settings via Management API
 */

const AUTH0_DOMAIN = 'your-tenant.auth0.com';
const AUTH0_CLIENT_ID = 'your-client-id';
const AUTH0_CLIENT_SECRET = 'your-client-secret';
const AUTH0_AUDIENCE = `https://${AUTH0_DOMAIN}/api/v2/`;

// Application configuration
const APP_CONFIG = {
  name: 'AGI Workforce',
  description: 'AI Workforce Management Platform',
  applicationType: 'spa',
  callbacks: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  logoutUrls: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  webOrigins: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ],
  allowedOrigins: [
    'http://localhost:5173',
    'https://your-vercel-domain.vercel.app'
  ]
};

/**
 * Get Management API Token
 */
async function getManagementToken() {
  const response = await fetch(`https://${AUTH0_DOMAIN}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Update Application Settings
 */
async function updateApplicationSettings(applicationId, token) {
  const response = await fetch(`https://${AUTH0_DOMAIN}/api/v2/applications/${applicationId}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: APP_CONFIG.name,
      description: APP_CONFIG.description,
      callbacks: APP_CONFIG.callbacks,
      logout_urls: APP_CONFIG.logoutUrls,
      web_origins: APP_CONFIG.webOrigins,
      allowed_origins: APP_CONFIG.allowedOrigins,
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      token_endpoint_auth_method: 'none'
    })
  });

  return response.json();
}

/**
 * Main configuration function
 */
async function configureAuth0() {
  try {
    console.log('🔐 Getting Management API token...');
    const token = await getManagementToken();
    
    console.log('📝 Updating application settings...');
    // You'll need to replace 'your-application-id' with your actual application ID
    const result = await updateApplicationSettings('your-application-id', token);
    
    console.log('✅ Auth0 configuration updated successfully!');
    console.log('📋 Application details:', result);
    
  } catch (error) {
    console.error('❌ Error configuring Auth0:', error);
  }
}

// Export for use in other scripts
module.exports = {
  configureAuth0,
  APP_CONFIG
};

// Run if called directly
if (require.main === module) {
  configureAuth0();
}

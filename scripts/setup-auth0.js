/**
 * Auth0 Setup Script
 * This script will help configure your Auth0 application
 */

const https = require('https');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration template
const AUTH0_CONFIG = {
  // You'll need to fill these in
  domain: '',
  clientId: '',
  clientSecret: '',
  applicationId: '',
  
  // Application settings
  appName: 'AGI Workforce',
  description: 'AI Workforce Management Platform',
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
async function getManagementToken(domain, clientId, clientSecret) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
      grant_type: 'client_credentials'
    });

    const options = {
      hostname: domain,
      port: 443,
      path: '/oauth/token',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.access_token) {
            resolve(response.access_token);
          } else {
            reject(new Error('Failed to get access token: ' + data));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Update Application Settings
 */
async function updateApplication(domain, applicationId, token, config) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: config.appName,
      description: config.description,
      callbacks: config.callbacks,
      logout_urls: config.logoutUrls,
      web_origins: config.webOrigins,
      allowed_origins: config.allowedOrigins,
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      token_endpoint_auth_method: 'none'
    });

    const options = {
      hostname: domain,
      port: 443,
      path: `/api/v2/applications/${applicationId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/**
 * Get user input
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

/**
 * Main setup function
 */
async function setupAuth0() {
  console.log('🔐 Auth0 Setup Script');
  console.log('====================\n');

  try {
    // Get Auth0 credentials
    console.log('Please provide your Auth0 credentials:');
    console.log('(You can find these in your Auth0 Dashboard > Applications > Your App > Settings)\n');

    const domain = await askQuestion('Auth0 Domain (e.g., your-tenant.auth0.com): ');
    const clientId = await askQuestion('Client ID: ');
    const clientSecret = await askQuestion('Client Secret: ');
    const applicationId = await askQuestion('Application ID: ');

    // Update config
    AUTH0_CONFIG.domain = domain;
    AUTH0_CONFIG.clientId = clientId;
    AUTH0_CONFIG.clientSecret = clientSecret;
    AUTH0_CONFIG.applicationId = applicationId;

    console.log('\n🔑 Getting Management API token...');
    const token = await getManagementToken(domain, clientId, clientSecret);
    console.log('✅ Token obtained successfully');

    console.log('\n📝 Updating application settings...');
    const result = await updateApplication(domain, applicationId, token, AUTH0_CONFIG);
    
    console.log('\n✅ Auth0 configuration updated successfully!');
    console.log('\n📋 Application Details:');
    console.log(`Name: ${result.name}`);
    console.log(`Client ID: ${result.client_id}`);
    console.log(`Callbacks: ${result.callbacks.join(', ')}`);
    console.log(`Logout URLs: ${result.logout_urls.join(', ')}`);
    console.log(`Web Origins: ${result.web_origins.join(', ')}`);

    console.log('\n🌐 Environment Variables for Vercel:');
    console.log(`VITE_AUTH0_DOMAIN=${domain}`);
    console.log(`VITE_AUTH0_CLIENT_ID=${clientId}`);
    console.log(`VITE_AUTH0_AUDIENCE=https://${domain}/api/v2/`);

    console.log('\n📋 Next Steps:');
    console.log('1. Set the environment variables in your Vercel project');
    console.log('2. Deploy your application to Vercel');
    console.log('3. Test the authentication flow');
    console.log('4. Update the callback URLs with your actual Vercel domain');

  } catch (error) {
    console.error('\n❌ Error setting up Auth0:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Verify your Auth0 credentials are correct');
    console.log('2. Check that your Auth0 application exists');
    console.log('3. Ensure you have the correct permissions');
    console.log('4. Try using the Auth0 Dashboard instead');
  } finally {
    rl.close();
  }
}

// Run the setup
if (require.main === module) {
  setupAuth0();
}

module.exports = { setupAuth0, AUTH0_CONFIG };

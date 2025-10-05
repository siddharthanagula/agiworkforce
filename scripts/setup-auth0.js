#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔐 Auth0 Setup Helper for AGI Workforce');
console.log('=====================================\n');

console.log('📋 Steps to configure Auth0:');
console.log('1. Go to https://manage.auth0.com/');
console.log('2. Create a new application (Single Page Application)');
console.log('3. Configure the following settings:');
console.log('   - Allowed Callback URLs: https://agiworkforce.com, https://agiworkforce.com/callback');
console.log('   - Allowed Logout URLs: https://agiworkforce.com');
console.log('   - Allowed Web Origins: https://agiworkforce.com');
console.log('   - Allowed Origins (CORS): https://agiworkforce.com');
console.log('4. Copy your Domain and Client ID from the application settings');
console.log('5. Create a .env file in your project root with:');
console.log('   VITE_AUTH0_DOMAIN=your-domain.auth0.com');
console.log('   VITE_AUTH0_CLIENT_ID=your-client-id');
console.log('   VITE_AUTH0_AUDIENCE=your-api-identifier (optional)');
console.log('   VITE_APP_URL=https://agiworkforce.com\n');

// Check if .env exists
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file already exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('your-domain.auth0.com') || envContent.includes('your-client-id')) {
    console.log('⚠️  Please update your .env file with actual Auth0 credentials');
  } else {
    console.log('✅ .env file appears to be configured');
  }
} else {
  console.log('📝 Creating .env file from template...');
  const envExamplePath = path.join(process.cwd(), 'env.example');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env file created. Please update it with your Auth0 credentials.');
  } else {
    console.log('❌ env.example file not found');
  }
}

console.log('\n🚀 After configuring Auth0:');
console.log('1. Build: npm run build');
console.log('2. Deploy the dist folder to your hosting platform');
console.log('3. Set environment variables in your hosting platform');
console.log('4. Navigate to https://agiworkforce.com');
console.log('5. Test the login functionality');
console.log('\n📚 For more details, see AUTH0_SETUP_GUIDE.md');

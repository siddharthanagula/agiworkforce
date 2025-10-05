#!/usr/bin/env node
/*
  Puppeteer smoke test for production site.
  - Loads homepage
  - Captures console errors/warnings
  - Validates key routes
*/
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the screenshots directory exists
const screenshotsDir = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir);
}

(async () => {
  let browser;
  try {
    console.log('🚀 Launching browser...');
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('🌍 Opening new page...');
    const page = await browser.newPage();
    
    let consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        const errorText = `❌ Browser Console Error: ${msg.text()}`;
        console.error(errorText);
        consoleErrors.push(errorText);
      }
    });

    page.on('pageerror', err => {
        const errorText = `❌ Page Error: ${err.message}`;
        console.error(errorText);
        consoleErrors.push(errorText);
    });

    const url = 'http://localhost:4173';
    console.log(`🧭 Navigating to ${url}...`);
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    console.log('✅ Page loaded successfully.');
    
    const title = await page.title();
    console.log(`📄 Page title: "${title}"`);
    
    // Check for the root element
    const rootElement = await page.$('#root');
    if (!rootElement) {
        throw new Error('#root element not found on the page.');
    }
    console.log('👍 #root element found.');

    if (title.includes('AGI Workforce')) {
      console.log('👍 Verification successful: Title contains "AGI Workforce".');
    } else {
      console.error('👎 Verification failed: Title does not contain "AGI Workforce".');
      throw new Error('Title verification failed.');
    }

    if (consoleErrors.length > 0) {
        throw new Error('Console errors were found on the page.');
    }

  } catch (error) {
    console.error('🔥 An error occurred during the smoke test:', error.message);
    const screenshotPath = path.join(screenshotsDir, `failure-${Date.now()}.png`);
    if (browser) {
        const pages = await browser.pages();
        if(pages.length > 0){
            await pages[0].screenshot({ path: screenshotPath, fullPage: true });
            console.log(`📸 Screenshot saved to ${screenshotPath}`);
        }
    }
    process.exit(1);
  } finally {
    if (browser) {
      console.log('🚪 Closing browser...');
      await browser.close();
    }
    console.log('----------');
    console.log('✅ Smoke test finished.');
  }
})();



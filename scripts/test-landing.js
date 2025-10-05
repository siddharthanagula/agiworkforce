#!/usr/bin/env node

/**
 * Landing Page Test Script
 * Tests the landing page for errors, CSS issues, and proper rendering
 */

import puppeteer from 'puppeteer';

const TEST_URL = process.env.TEST_URL || 'http://localhost:4173';
const TIMEOUT = 30000;

async function testLandingPage() {
  console.log('🧪 Testing Landing Page...\n');
  console.log(`📍 URL: ${TEST_URL}\n`);

  let browser;
  let passed = 0;
  let failed = 0;
  const errors = [];

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();
    
    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Collect page errors
    const pageErrors = [];
    page.on('pageerror', error => {
      pageErrors.push(error.message);
    });

    // Set viewport
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('⏳ Loading landing page...');
    await page.goto(TEST_URL, {
      waitUntil: 'networkidle0',
      timeout: TIMEOUT
    });

    // Wait for React to load and mount
    await page.waitForFunction(() => {
      return document.querySelector('#root')?.children.length > 0;
    }, { timeout: 10000 }).catch(() => {
      console.log('⚠️ Timeout waiting for React to mount');
    });

    // Test 1: Page loads
    console.log('✓ Page loaded successfully');
    passed++;

    // Test 2: Root element exists
    const rootElement = await page.$('#root');
    if (rootElement) {
      console.log('✓ Root element found');
      passed++;
    } else {
      console.log('✗ Root element not found');
      errors.push('Root element missing');
      failed++;
    }

    // Test 3: Check for hero section
    const heroSection = await page.$('h1');
    if (heroSection) {
      const heroText = await page.evaluate(el => el.textContent, heroSection);
      console.log(`✓ Hero section found: "${heroText}"`);
      passed++;
    } else {
      console.log('✗ Hero section not found');
      errors.push('Hero section missing');
      failed++;
    }

    // Test 4: Check for buttons
    const buttons = await page.$$('button');
    if (buttons.length > 0) {
      console.log(`✓ Found ${buttons.length} buttons`);
      passed++;
    } else {
      console.log('✗ No buttons found');
      errors.push('No buttons found');
      failed++;
    }

    // Test 5: Check for navigation
    const navLinks = await page.$$('a');
    if (navLinks.length > 0) {
      console.log(`✓ Found ${navLinks.length} links`);
      passed++;
    } else {
      console.log('✗ No links found');
      errors.push('No links found');
      failed++;
    }

    // Test 6: Check CSS is loaded
    const hasStyles = await page.evaluate(() => {
      const body = document.body;
      const styles = window.getComputedStyle(body);
      return styles.backgroundColor !== 'rgba(0, 0, 0, 0)' || 
             styles.fontFamily !== '' ||
             styles.margin !== '0px';
    });
    if (hasStyles) {
      console.log('✓ CSS styles are applied');
      passed++;
    } else {
      console.log('✗ CSS styles not applied');
      errors.push('CSS not loaded');
      failed++;
    }

    // Test 7: Check for images
    const images = await page.$$('img');
    console.log(`ℹ Found ${images.length} images`);

    // Test 8: Check for console errors
    if (consoleErrors.length === 0) {
      console.log('✓ No console errors');
      passed++;
    } else {
      console.log(`✗ Found ${consoleErrors.length} console errors:`);
      consoleErrors.forEach(err => console.log(`  - ${err}`));
      errors.push(...consoleErrors);
      failed++;
    }

    // Test 9: Check for page errors
    if (pageErrors.length === 0) {
      console.log('✓ No page errors');
      passed++;
    } else {
      console.log(`✗ Found ${pageErrors.length} page errors:`);
      pageErrors.forEach(err => console.log(`  - ${err}`));
      errors.push(...pageErrors);
      failed++;
    }

    // Test 10: Check for specific sections
    const sections = await page.$$('section');
    if (sections.length >= 3) {
      console.log(`✓ Found ${sections.length} sections (expected at least 3)`);
      passed++;
    } else {
      console.log(`✗ Found only ${sections.length} sections (expected at least 3)`);
      errors.push('Missing sections');
      failed++;
    }

    // Take screenshot
    await page.screenshot({ path: 'landing-page-test.png', fullPage: true });
    console.log('\n📸 Screenshot saved: landing-page-test.png');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    errors.push(error.message);
    failed++;
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary');
  console.log('='.repeat(50));
  console.log(`✓ Passed: ${passed}`);
  console.log(`✗ Failed: ${failed}`);
  console.log('='.repeat(50));

  if (errors.length > 0) {
    console.log('\n❌ Errors found:');
    errors.forEach((err, i) => console.log(`${i + 1}. ${err}`));
    process.exit(1);
  } else {
    console.log('\n✅ All tests passed!');
    process.exit(0);
  }
}

testLandingPage().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

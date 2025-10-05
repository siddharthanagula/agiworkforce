#!/usr/bin/env node
/*
  Puppeteer smoke test for production site.
  - Loads homepage
  - Captures console errors/warnings
  - Validates key routes
*/
import puppeteer, { executablePath } from 'puppeteer';

const BASE_URL = process.env.SMOKE_URL || 'https://agiworkforce-app.vercel.app';

async function run() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: await executablePath(),
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--no-first-run',
      '--no-zygote'
    ],
    timeout: 60000
  });
  const page = await browser.newPage();

  const errors = [];
  const warnings = [];
  const requestsFailed = [];

  page.on('console', (msg) => {
    const type = msg.type();
    if (type === 'error') errors.push(msg.text());
    if (type === 'warning') warnings.push(msg.text());
  });

  page.on('requestfailed', (req) => {
    requestsFailed.push({ url: req.url(), failure: req.failure()?.errorText });
  });

  const expectVisible = async (selector, name) => {
    await page.waitForSelector(selector, { timeout: 15000 });
    const visible = await page.$eval(selector, (el) => !!el);
    if (!visible) throw new Error(`Element not visible: ${name} (${selector})`);
  };

  try {
    // Homepage
    await page.goto(BASE_URL, { waitUntil: 'networkidle0', timeout: 60000 });
    await expectVisible('#root', 'App Root');

    // Navigate to marketplace via route
    await page.goto(`${BASE_URL}/marketplace`, { waitUntil: 'networkidle0' });
    await expectVisible('#root', 'Marketplace Root');

    // Navigate to login
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0' });
    await expectVisible('#root', 'Login Root');

    // Basic assertions
    if (errors.length) {
      console.error('Console errors detected:', errors);
      throw new Error('Smoke test failed due to console errors');
    }
    if (requestsFailed.length) {
      console.error('Failed requests:', requestsFailed);
      throw new Error('Smoke test failed due to failed network requests');
    }

    console.log('Smoke test passed with no console errors and no failed requests.');
  } finally {
    await browser.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});



const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: {
    baseURL: 'https://staging.meandem.vercel.app',
    browserName: 'chromium',
    headless: false,
  },
});
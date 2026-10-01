import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: 'html',
  use: {
    baseURL: 'https://qaxpert.com/lab/sites/stage-3/paylater',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});

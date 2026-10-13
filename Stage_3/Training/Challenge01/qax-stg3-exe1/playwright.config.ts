import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  // Un worker deja que la QA siga las pruebas una por una.
  workers: 1,
  reporter: 'html',
  use: {
    // BUG-001: esta base sin barra final causaba problemas con la ruta /index.html.
    // baseURL: 'https://qaxpert.com/lab/sites/stage-3/haguazon',
    baseURL: 'https://qaxpert.com/lab/sites/stage-3/haguazon/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});

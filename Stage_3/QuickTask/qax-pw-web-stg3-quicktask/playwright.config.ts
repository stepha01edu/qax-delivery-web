import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Aqui se guardan las pruebas y se ejecutan de una en una.
  testDir: './tests',
  workers: 1,

  // Este reporte permite revisar el resultado desde una pagina web.
  reporter: 'html',

  // Las pruebas usan Chromium sin abrir una ventana durante la ejecucion.
  use: {
    browserName: 'chromium',
    headless: true,
    // La captura se guarda solo cuando una prueba falla.
    screenshot: 'only-on-failure',
  },
});

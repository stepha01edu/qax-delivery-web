import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de abrir una nueva pestana.
test.describe('Manejo de pestanas', () => {
  test('Abrir y validar una nueva pestana', async ({ page, context }) => {
    // Abrimos la pagina que tiene enlaces para abrir nuevas pestanas.
    await page.goto('https://demo.automationtesting.in/Windows.html');

    // Preparamos la espera antes del click porque la nueva pestana se abre despues.
    const pagePromise = context.waitForEvent('page');

    // Hacemos click en el enlace que abre la nueva pestana.
    await page.locator('#Tabbed a[target="_blank"]').click();

    // Guardamos la nueva pestana cuando el navegador la crea.
    const nuevaPestana = await pagePromise;

    // Esperamos que cargue y validamos que corresponda al sitio esperado.
    await nuevaPestana.waitForLoadState();
    await expect(nuevaPestana).toHaveURL(/selenium\.dev/);

    // Cerramos la pestana para terminar la prueba de forma ordenada.
    await nuevaPestana.close();
  });
});

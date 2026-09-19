import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba para trabajar dentro de un IFrame.
test.describe('IFrame', () => {
  test('Escribir dentro de un iframe', async ({ page }) => {
    // Abrimos la pagina que contiene el IFrame.
    await page.goto('https://demo.automationtesting.in/Frames.html');

    // frameLocator permite entrar al documento que esta dentro del IFrame.
    const frame = page.frameLocator('#singleframe');

    // Buscamos el campo que existe dentro del IFrame.
    const campo = frame.locator('input');

    // Escribimos un valor y luego confirmamos que se haya guardado.
    await campo.fill('QA QuickTask');
    await expect(campo).toHaveValue('QA QuickTask');
  });
});

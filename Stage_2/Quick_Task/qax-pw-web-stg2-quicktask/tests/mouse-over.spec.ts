import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de pasar el mouse sobre un elemento.
test.describe('Mouse over', () => {
  test('Pasar el mouse sobre la imagen Compass', async ({ page }) => {
    // Abrimos la pagina con varias imagenes.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/mouse-over.html');

    // Buscamos la imagen de Compass usando el atributo src que vimos con Inspect.
    const imagenCompass = page.locator('img[src*="compass.png"]');
    const textoCompass = page.getByText('Compass', { exact: true });

    // Antes de pasar el mouse, el texto esta oculto por el estilo de la pagina.
    await expect(textoCompass).toBeHidden();

    // Movemos el mouse sobre el elemento.
    await imagenCompass.hover();

    // Confirmamos que el texto aparezca despues de pasar el mouse.
    await expect(textoCompass).toBeVisible();
  });
});

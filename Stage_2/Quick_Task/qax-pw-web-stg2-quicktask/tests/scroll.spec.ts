import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de scroll.
test.describe('Scroll', () => {
  test('Desplazar una pagina con contenido infinito', async ({ page }) => {
    // Abrimos la pagina que carga mas contenido cuando bajamos.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/infinite-scroll.html');

    // Localizamos el contenedor donde aparece el contenido.
    const contenido = page.locator('#content');

    // Confirmamos que el contenedor exista antes de desplazarnos.
    await expect(contenido).toBeVisible();
    // Simulamos la rueda del mouse para bajar por la pagina.
    await page.mouse.wheel(0, 1200);

    // Confirmamos que el contenido continue visible despues del scroll.
    await expect(contenido).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de click forzado.
test.describe('Click forzado', () => {
  test('Iniciar el acceso a la camara con force', async ({ page }) => {
    // Abrimos la pagina donde se encuentra el boton de acceso a la camara.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/get-user-media.html');

    // Buscamos el boton usando el id que aparece en el HTML.
    const botonStart = page.locator('#start');

    // Primero confirmamos que el boton exista y se vea en la pagina.
    await expect(botonStart).toBeVisible();

    // force permite hacer el click aunque Playwright encuentre una dificultad para confirmar que el elemento esta listo para recibir la accion.
    await botonStart.click({ force: true });

    // Validamos que el video este presente despues del click.
    await expect(page.locator('#my-video')).toBeVisible();

    // como puedo validar si el video esta reproduciendose de forma correcta? validar con el mentor adicinal porque se menciona selenium si estamos con playwright?
  });
});

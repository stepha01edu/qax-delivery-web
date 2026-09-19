import { test, expect } from '@playwright/test';

// Este bloque agrupa las pruebas de alert, confirm, prompt y modal.
test.describe('Dialogos y popup', () => {
  test('Aceptar un alert', async ({ page }) => {
    // Guardamos el texto que aparecera en la ventana alert.
    let mensaje = '';

    // Abrimos la pagina de practicas.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // Escuchamos el dialogo antes de hacer click en el boton.
    page.once('dialog', async (dialog) => {
      mensaje = dialog.message();
      await dialog.accept();
    });

    // El click abre el alert y se ejecuta el codigo anterior.
    await page.getByRole('button', { name: 'Launch alert' }).click();

    // Validamos que el mensaje recibido sea el esperado.
    expect(mensaje).toBe('Hello world!');
  });

  test('Aceptar un confirm', async ({ page }) => {
    // Abrimos la pagina donde esta el boton confirm.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // Aceptamos la confirmacion cuando aparezca.
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    // Hacemos click y luego validamos el mensaje que deja la pagina.
    await page.getByRole('button', { name: 'Launch confirm' }).click();
    await expect(page.locator('#confirm-text')).toHaveText('You chose: true');
  });

  test('Escribir un nombre en un prompt', async ({ page }) => {
    // Abrimos la pagina de practica.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // Escribimos QA en la ventana prompt y la aceptamos.
    page.once('dialog', async (dialog) => {
      await dialog.accept('QA');
    });

    // Abrimos el prompt y validamos el texto que aparece en la pagina.
    await page.getByRole('button', { name: 'Launch prompt' }).click();
    await expect(page.locator('#prompt-text')).toHaveText('You typed: QA');
  });

  test('Abrir y cerrar un modal', async ({ page }) => {
    // Abrimos la pagina que contiene el modal.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html');

    // Abrimos el modal con el boton visible.
    await page.getByRole('button', { name: 'Launch modal' }).click();

    // Confirmamos que el modal aparezca.
    await expect(page.locator('#example-modal')).toBeVisible();

    // Cerramos el modal y confirmamos que ya no se vea.
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('#example-modal')).toBeHidden();

    // como debemos validar que el modal se cerro correctamente? validar con el mentor, tambien validar que se hace en los casos que se repite el modal?
  });
});

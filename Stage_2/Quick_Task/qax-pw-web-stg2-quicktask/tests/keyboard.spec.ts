import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de uso del teclado.
test.describe('Simular teclas', () => {
  test('Usar teclas para cambiar el tiempo de la calculadora', async ({ page }) => {
    // Abrimos la calculadora que espera unos segundos antes de mostrar el resultado.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/slow-calculator.html');

    // Cambiamos el tiempo a cero para que la prueba termine mas rapido.
    const delay = page.locator('#delay');
    await delay.click();
    await delay.fill('0');

    // Usamos una tecla para salir del campo y comprobamos el nuevo valor.
    await page.keyboard.press('Tab');
    await expect(delay).toHaveValue('0');

    // Elegimos los numeros y la operacion de la calculadora.
    await page.locator('#calculator').getByText('7', { exact: true }).click();
    await page.locator('#calculator').getByText('+', { exact: true }).click();
    await page.locator('#calculator').getByText('3', { exact: true }).click();
    await page.locator('#calculator').getByText('=', { exact: true }).click();

    // Validamos que el resultado de la suma sea 10.
    await expect(page.locator('.screen')).toHaveText('10');
  });
});

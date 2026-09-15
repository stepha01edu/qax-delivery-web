import { test, expect } from '@playwright/test';

test.describe('Feature: Login en QAX Bank', () => {

  test('Scenario: Iniciar sesión con credenciales válidas', async ({ page }) => {

    await test.step('Given que el usuario abre la página de login de QAX Bank', async () => {
      await page.goto('https://qaxpert.com/lab/sites/stage-1/bank/index.html');
      await expect(page).toHaveTitle('QAX Bank — Banca Digital');
    });

    await test.step('When ingresa credenciales válidas y hace clic en Ingresar', async () => {
      await page.getByPlaceholder('ej. cliente@qaxbank.com').fill('cliente@qaxbank.com');
      await page.getByPlaceholder('Ingrese su contraseña').fill('Test1234');
      await page.getByRole('button', { name: 'Ingresar' }).click();
    });

    await test.step('Then el sistema redirige al dashboard', async () => {
      await expect(page).toHaveURL(/dashboard\.html/);
      await expect(page.getByText('Hola, Carlos Andrés López')).toBeVisible();
    });

  });

});

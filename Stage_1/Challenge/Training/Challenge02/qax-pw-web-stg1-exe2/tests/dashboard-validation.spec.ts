import { test, expect } from '@playwright/test';

// Este bloque agrupa las pruebas relacionadas con el dashboard de QAX Bank.
test.describe('Feature: Dashboard de QAX Bank', () => {

  // Estos pasos se repiten antes de cada prueba para iniciar sesion.
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaxpert.com/lab/sites/stage-1/bank/index.html');
    await page.getByPlaceholder('ej. cliente@qaxbank.com').fill('cliente@qaxbank.com');
    await page.getByPlaceholder('Ingrese su contraseña').fill('Test1234');
    await page.getByRole('button', { name: 'Ingresar' }).click();
    await expect(page).toHaveURL(/dashboard\.html/);
  });

  // Esta lista contiene las cuentas y los saldos que se deben validar.
  const cuentas = [
    { nombre: 'Cuenta de Ahorros', saldo: '$ 5.230.000 COP' },
    { nombre: 'Cuenta Corriente', saldo: '$ 1.845.000 COP' },
  ];

  // Esta lista contiene los elementos que deben aparecer en el dashboard, cada elemento indica el texto visible y el tipo de elemento que se busca.
  const elementos = [
    { nombre: 'Cerrar Sesión', role: 'button' as const },
    { nombre: 'Ver Historial Completo', role: 'link' as const },
  ];

  // Se crea una prueba por cada cuenta de la lista.
  for (const cuenta of cuentas) {
    test(`Validar que la cuenta ${cuenta.nombre} muestre el saldo correcto`, async ({ page }) => {
      await expect(page.getByText(cuenta.saldo)).toBeVisible();
    });
  }

  // Se crea una prueba por cada elemento de la lista.
  for (const el of elementos) {
    test(`Validar que el elemento "${el.nombre}" esté visible en el dashboard`, async ({ page }) => {
      await expect(page.getByRole(el.role, { name: el.nombre })).toBeVisible();
    });
  }

});

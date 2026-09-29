// Importamos test para crear los casos y expect para revisar los resultados.
import { test, expect } from '@playwright/test';

// Importamos la funcion que abre la pestaña de alertas.
import { switchToTab } from '../utils/navigation';

// Guardamos la direccion de QAX Forms para usarla en cada prueba.
const FORMS_URL = 'https://qaxpert.com/lab/sites/stage-2/forms/index.html';

// Estos casos contienen el ajuste para aceptar, cancelar y responder alertas.
test.describe('Fix de alertas nativas', () => {

  // Antes de cada prueba abrimos la pagina y seleccionamos la pestaña correcta.
  test.beforeEach(async ({ page }) => {
    await page.goto(FORMS_URL);
    await switchToTab(page, '2. Alertas y Modales');
  });

  test('Alerta simple — aceptar', async ({ page }) => {
    // Buscamos el boton que abre la alerta.
    const btn = page.getByRole('button', { name: 'Alerta Simple' });

    // Empezamos a esperar el dialogo antes de hacer clic.
    const dialogPromise = page.waitForEvent('dialog');

    // Guardamos el clic para poder responder al dialogo que aparece.
    const clickPromise = btn.click();

    // Leemos el mensaje y aceptamos la alerta para que el clic pueda terminar.
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    await clickPromise;

    // Revisamos que la alerta haya mostrado un mensaje.
    expect(message).toBeTruthy();
  });

  test('Confirmar — aceptar (OK)', async ({ page }) => {
    // Buscamos el boton que abre la confirmacion.
    const btn = page.getByRole('button', { name: 'Confirmar (Aceptar OK)' });

    // Esperamos la ventana antes de presionar el boton.
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = btn.click();

    // Aceptamos la confirmacion y dejamos que el clic termine.
    const dialog = await dialogPromise;
    await dialog.accept();
    await clickPromise;

    // La pagina informa que se presiono OK.
    await expect(page.locator('#alertResult')).toContainText('You pressed Ok');
  });

  test('Confirmar — cancelar', async ({ page }) => {
    // Buscamos el boton que abre la confirmacion.
    const btn = page.getByRole('button', { name: 'Confirmar (Cancelar)' });

    // Esperamos la ventana antes de presionar el boton.
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = btn.click();

    // Cancelamos la confirmacion y dejamos que el clic termine.
    const dialog = await dialogPromise;
    await dialog.dismiss();
    await clickPromise;

    // La pagina informa que se presiono Cancel.
    await expect(page.locator('#alertResult')).toContainText('You Pressed Cancel');
  });

  test('Prompt — ingresar texto', async ({ page }) => {
    // Buscamos el boton que abre el prompt.
    const btn = page.getByRole('button', { name: 'Prompt (Ingresar Texto)' });

    // Esperamos la ventana antes de presionar el boton.
    const dialogPromise = page.waitForEvent('dialog');
    const clickPromise = btn.click();

    // Escribimos una respuesta en el prompt y dejamos que el clic termine.
    const dialog = await dialogPromise;
    await dialog.accept('QAXpert Ninja');
    await clickPromise;

    // La pagina muestra el texto que ingresamos.
    await expect(page.locator('#alertResult')).toContainText('QAXpert Ninja');
  });
});

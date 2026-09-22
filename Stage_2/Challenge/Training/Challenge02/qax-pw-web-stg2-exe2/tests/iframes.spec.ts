// Importamos las funciones para crear pruebas y validar elementos.
import { test, expect } from '@playwright/test';

// Importamos la funcion que selecciona la pestaña Frames.
import { switchToTab } from '../utils/navigation';

// Guardamos la URL base de QAX Forms para reutilizarla en los casos.
const FORMS_URL = 'https://qaxpert.com/lab/sites/stage-2/forms/index.html';

// Agrupamos las pruebas de iframes simples y anidados.
test.describe('Comportamientos avanzados — Iframes', () => {

  // Antes de cada caso abrimos QAX Forms y seleccionamos la pestaña Frames.
  test.beforeEach(async ({ page }) => {
    await page.goto(FORMS_URL);
    await switchToTab(page, '3. Frames');
  });

  // ─── Iframe Simple ─────────────────────────────────────

  test('Interactuar con iframe simple', async ({ page }) => {
    // frameLocator permite trabajar dentro del iframe sin cambiar toda la pagina.
    // El iframe se encuentra usando el atributo title que vimos con Inspect.
    const iframe = page.frameLocator('iframe[title="Términos y Condiciones"]');

    // Dentro del iframe usamos localizadores para revisar sus textos.
    await expect(iframe.getByText('Términos y Condiciones')).toBeVisible();
    await expect(iframe.getByText('Aceptación de los términos')).toBeVisible();
  });

  // ─── Iframes Anidados ──────────────────────────────────

  test('Interactuar con iframes anidados', async ({ page }) => {
    // Primero localizamos el iframe padre usando su id.
    const parentFrame = page.frameLocator('#parentIframe');

    // Dentro del padre hacemos clic para cargar el iframe hijo.
    await parentFrame.getByRole('button', { name: 'Cargar Iframe Hijo' }).click();

    // Desde el padre localizamos el iframe hijo que se genero despues del clic.
    const childFrame = parentFrame.frameLocator('#childFrame');

    // Llenamos el campo del iframe hijo y validamos el texto mostrado.
    await childFrame.locator('#childInput').fill('QAXpert');
    await expect(childFrame.getByText('Texto ingresado: QAXpert')).toBeVisible();

    // Para volver a la pagina principal usamos page de nuevo.
    // Playwright no necesita un switchTo explicito para regresar.
    await expect(page.getByText('iFrame Simple')).toBeVisible();
  });

});

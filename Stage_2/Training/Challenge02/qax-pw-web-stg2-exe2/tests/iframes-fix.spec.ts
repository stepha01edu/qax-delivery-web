// Importamos test para crear los casos y expect para revisar los resultados.
import { test, expect } from '@playwright/test';

// Importamos la funcion que abre la pestaña de iframes.
import { switchToTab } from '../utils/navigation';

// Guardamos la direccion de QAX Forms para usarla en cada prueba.
const FORMS_URL = 'https://qaxpert.com/lab/sites/stage-2/forms/index.html';

// Estos casos contienen los ajustes para ubicar el contenido de los iframes.
test.describe('Fix de iframes', () => {

  // Antes de cada prueba abrimos QAX Forms y seleccionamos Frames.
  test.beforeEach(async ({ page }) => {
    await page.goto(FORMS_URL);
    await switchToTab(page, '3. Frames');
  });

  test('Interactuar con iframe simple', async ({ page }) => {
    // Localizamos el iframe por el titulo que tiene en la pagina.
    const iframe = page.frameLocator('iframe[title="Términos y Condiciones"]');

    // Buscamos el encabezado para que el localizador coincida con un solo elemento.
    await expect(
      iframe.getByRole('heading', { name: 'Términos y Condiciones de QAXpert' })
    ).toBeVisible();

    // Revisamos el primer punto de la lista de terminos.
    await expect(iframe.locator('li').first()).toContainText('Aceptación de los Términos');
  });

  // Queda fixme porque QAX Forms responde "loadChildFrame is not defined" al hacer clic.
  test.fixme('Interactuar con iframes anidados', async ({ page }) => {
    // Primero localizamos el iframe padre usando su id.
    const parentFrame = page.frameLocator('#parentIframe');

    // Hacemos clic en el boton que muestra el iframe hijo.
    const loadButton = parentFrame.getByRole('button', { name: 'Cargar Iframe Hijo' });
    await loadButton.click();

    // El texto del boton cambia cuando la pagina termina de cargar el iframe hijo.
    await expect(parentFrame.getByRole('button', { name: /Iframe Hijo Cargado/ })).toBeVisible();

    // Desde el iframe padre localizamos el iframe hijo.
    const childFrame = parentFrame.frameLocator('#childFrame');

    // Esperamos que el campo aparezca antes de escribir.
    const childInput = childFrame.locator('#childInput');
    await expect(childInput).toBeVisible();
    await childInput.fill('QAXpert');

    // Confirmamos que el iframe hijo muestre el texto ingresado.
    await expect(childFrame.locator('#childResult')).toHaveText('Texto ingresado: QAXpert');

    // La pagina principal sigue disponible despues de usar los iframes.
    await expect(page.getByText('iFrame Simple')).toBeVisible();
  });
});

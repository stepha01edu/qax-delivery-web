// Importamos test para crear los casos y expect para revisar los resultados.
import { test, expect } from '@playwright/test';

// Importamos la funcion que permite cambiar entre pestañas de QAX Forms.
import { switchToTab } from '../utils/navigation';

// Guardamos la direccion de QAX Forms para usarla en las pruebas.
const FORMS_URL = 'https://qaxpert.com/lab/sites/stage-2/forms/index.html';

// Agrupamos los casos que corresponden al Challenge 2.
test.describe('Challenge 2: Comportamientos avanzados de QAX Forms', () => {

  // Abrimos la pagina antes de cada caso para iniciar desde el mismo estado.
  test.beforeEach(async ({ page }) => {
    await page.goto(FORMS_URL);
  });

  // HU-01 revisa cada respuesta posible de las alertas nativas.
  test('HU-01 valida alerta simple, confirmacion y prompt', async ({ page }) => {
    // Abrimos la pestaña donde estan los botones de alertas y resultados.
    await switchToTab(page, '2. Alertas y Modales');

    // Usamos este elemento para revisar el mensaje que deja cada alerta.
    const result = page.locator('#alertResult');

    // Para cada alerta esperamos que aparezca antes de responderla.
    // El clic se guarda porque queda esperando mientras la alerta esta abierta.
    await test.step('When acepta la alerta simple', async () => {
      const alertButton = page.getByRole('button', { name: 'Alerta Simple' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = alertButton.click();
      const dialog = await dialogPromise;

      // Guardamos el texto que muestra la alerta antes de cerrarla.
      const message = dialog.message();

      // Cerramos la alerta y luego esperamos que el clic termine.
      await dialog.accept();
      await clickPromise;

      // Revisamos el texto de la alerta y el mensaje que aparece en la pagina.
      expect(message).toContain('alerta simple del navegador');
      await expect(result).toHaveText('Alerta simple aceptada.');
    });

    await test.step('And acepta la confirmacion', async () => {
      // Este boton abre una confirmacion del navegador.
      const confirmButton = page.getByRole('button', { name: 'Confirmar (Aceptar OK)' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = confirmButton.click();
      const dialog = await dialogPromise;

      // Elegimos aceptar y revisamos el mensaje de respuesta.
      await dialog.accept();
      await clickPromise;
      await expect(result).toHaveText('You pressed Ok');
    });

    await test.step('And cancela la confirmacion', async () => {
      // Este boton abre la misma confirmacion, pero en este caso la cancelamos.
      const cancelButton = page.getByRole('button', { name: 'Confirmar (Cancelar)' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = cancelButton.click();
      const dialog = await dialogPromise;

      // dismiss equivale a presionar Cancelar en la ventana del navegador.
      await dialog.dismiss();
      await clickPromise;
      await expect(result).toHaveText('You Pressed Cancel');
    });

    await test.step('And responde el prompt con texto', async () => {
      // El prompt permite escribir una respuesta antes de aceptar.
      const promptButton = page.getByRole('button', { name: 'Prompt (Ingresar Texto)' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = promptButton.click();
      const dialog = await dialogPromise;

      // Confirmamos que el aviso abierto sea un prompt y enviamos el nombre.
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('QA Manual');
      await clickPromise;

      // La pagina debe incluir el texto que escribimos.
      await expect(result).toHaveText('Hello QA Manual How are you today');
    });

    await test.step('Then cancela el prompt sin ingresar texto', async () => {
      const promptButton = page.getByRole('button', { name: 'Prompt (Ingresar Texto)' });

      // Guardamos el mensaje actual para comprobar que cancelar no lo reemplaza.
      const previousResult = await result.textContent();
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = promptButton.click();
      const dialog = await dialogPromise;

      // Verificamos que se abrio el prompt y lo cerramos sin escribir nada.
      expect(dialog.type()).toBe('prompt');
      await dialog.dismiss();
      await clickPromise;

      // Al cancelar, la pagina conserva el resultado anterior y no muestra null.
      await expect(result).toHaveText(previousResult || '');
      await expect(result).not.toContainText('null');
    });
  });

  // HU-02 revisa las formas de cerrar los modales que ofrece la pagina.
  test('HU-02 valida cancelar, confirmar y cerrar los modales', async ({ page }) => {
    // Abrimos la pestaña que contiene los modales personalizados.
    await switchToTab(page, '2. Alertas y Modales');

    // Guardamos donde aparece el resultado y donde se muestra el modal.
    const result = page.locator('#alertResult');
    const confirmModal = page.locator('#confirmModal');

    await test.step('When abre y cancela el modal de confirmacion', async () => {
      await page.getByRole('button', { name: 'Abrir Modal de Confirmación' }).click();

      // Revisamos el titulo y el cuerpo antes de cerrar el modal.
      await expect(confirmModal).toBeVisible();
      await expect(confirmModal.getByRole('heading', { name: '¿Confirmar acción?' })).toBeVisible();
      await expect(confirmModal.locator('p')).toContainText('operación importante');

      // El resultado inicia oculto y debe seguir asi cuando se cancela.
      await expect(result).toBeHidden();

      await confirmModal.getByRole('button', { name: 'Cancelar' }).click();
      await expect(confirmModal).not.toBeVisible();
      await expect(result).toBeHidden();
    });

    await test.step('And vuelve a abrir y confirma la accion', async () => {
      await page.getByRole('button', { name: 'Abrir Modal de Confirmación' }).click();

      // Al abrirlo de nuevo, revisamos otra vez su informacion.
      await expect(confirmModal).toBeVisible();
      await expect(confirmModal.getByRole('heading', { name: '¿Confirmar acción?' })).toBeVisible();
      await expect(confirmModal.locator('p')).toContainText('operación importante');

      // Confirmar debe cerrar el modal y mostrar que la accion se realizo.
      await confirmModal.getByRole('button', { name: 'Confirmar' }).click();
      await expect(confirmModal).not.toBeVisible();
      await expect(result).toHaveText('Operación confirmada exitosamente.');
    });

    await test.step('Then abre y cierra el modal informativo', async () => {
      const infoModal = page.locator('#infoModal');
      await page.getByRole('button', { name: 'Abrir Modal Informativo' }).click();

      // Revisamos el titulo y el mensaje que presenta este modal.
      await expect(infoModal).toBeVisible();
      await expect(infoModal.getByRole('heading', { name: 'Información' })).toBeVisible();
      await expect(infoModal.locator('p')).toContainText('modal informativo');

      // El boton Cerrar debe ocultar el modal informativo.
      await infoModal.getByRole('button', { name: 'Cerrar' }).click();
      await expect(infoModal).not.toBeVisible();
    });
  });

  // HU-03 valida el iframe simple y deja pendiente el iframe anidado por un error de la pagina.
  test('HU-03 consulta el contenido del iframe simple', async ({ page }) => {
    // Abrimos la pestaña Frames y ubicamos el iframe por su titulo.
    await switchToTab(page, '3. Frames');
    const iframe = page.frameLocator('iframe[title="Términos y Condiciones"]');

    await test.step('When revisa el contenido del iframe simple', async () => {
      // Estos localizadores buscan el titulo y un termino dentro del iframe.
      await expect(
        iframe.getByRole('heading', { name: 'Términos y Condiciones de QAXpert' })
      ).toBeVisible();
      await expect(iframe.locator('li').first()).toContainText('Aceptación de los Términos');
    });

    await test.step('Then confirma que la pagina principal sigue disponible', async () => {
      // page sigue apuntando a la pagina principal, fuera del iframe.
      await expect(page.getByRole('heading', { name: 'Sandbox de Comportamientos Avanzados' })).toBeVisible();
    });
  });

  // Este caso queda pendiente porque QAX Forms no carga el iframe hijo.
  test.fixme('HU-03 carga y usa el iframe anidado cuando la pagina este corregida', async ({ page }) => {
    await switchToTab(page, '3. Frames');

    // Primero entramos al iframe padre que contiene el boton para cargar el hijo.
    const parentFrame = page.frameLocator('#parentIframe');

    // Al corregir la pagina, este boton debe mostrar el iframe hijo.
    await parentFrame.getByRole('button', { name: 'Cargar Iframe Hijo' }).click();
    await expect(parentFrame.getByRole('button', { name: /Iframe Hijo Cargado/ })).toBeVisible();

    // Despues ubicamos el iframe hijo dentro del padre y escribimos un texto.
    const childFrame = parentFrame.frameLocator('#childFrame');
    const childInput = childFrame.locator('#childInput');
    await expect(childInput).toBeVisible();
    await childInput.fill('QAXpert');

    // El iframe hijo debe mostrar lo mismo que se escribio en el campo.
    await expect(childFrame.locator('#childResult')).toHaveText('Texto ingresado: QAXpert');

    // La pagina principal debe seguir visible despues de trabajar con ambos iframes.
    await expect(page.getByRole('heading', { name: 'Sandbox de Comportamientos Avanzados' })).toBeVisible();
  });

  // HU-04 prueba una secuencia completa con una alerta aceptada, un modal confirmado y un iframe.
  test('HU-04 combina alerta aceptada, modal confirmado e iframe', async ({ page }) => {
    // Las tres partes se usan desde distintas pestañas de la misma pagina.
    await switchToTab(page, '2. Alertas y Modales');

    await test.step('When acepta una alerta nativa', async () => {
      // Esperamos la alerta, iniciamos el clic y luego aceptamos la alerta.
      const alertButton = page.getByRole('button', { name: 'Alerta Simple' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = alertButton.click();
      const dialog = await dialogPromise;

      await dialog.accept();
      await clickPromise;
      await expect(page.locator('#alertResult')).toHaveText('Alerta simple aceptada.');
    });

    await test.step('And confirma una accion en el modal', async () => {
      // Revisamos que confirmar cierre el modal y actualice el resultado.
      const modal = page.locator('#confirmModal');
      await page.getByRole('button', { name: 'Abrir Modal de Confirmación' }).click();
      await expect(modal).toBeVisible();
      await modal.getByRole('button', { name: 'Confirmar' }).click();
      await expect(modal).not.toBeVisible();
      await expect(page.locator('#alertResult')).toHaveText('Operación confirmada exitosamente.');
    });

    await test.step('And consulta el iframe simple y vuelve a la pagina principal', async () => {
      // Cambiamos a Frames y comprobamos el contenido dentro del iframe.
      await switchToTab(page, '3. Frames');
      const iframe = page.frameLocator('iframe[title="Términos y Condiciones"]');
      await expect(iframe.getByRole('heading', { name: 'Términos y Condiciones de QAXpert' })).toBeVisible();

      // La pagina principal debe seguir disponible despues de leer el iframe.
      await expect(page.getByRole('heading', { name: 'Sandbox de Comportamientos Avanzados' })).toBeVisible();
    });

    await test.step('Then el resultado del modal se conserva al volver', async () => {
      // Volvemos a la primera pestaña y revisamos que el resultado siga ahi.
      await switchToTab(page, '2. Alertas y Modales');
      await expect(page.locator('#alertResult')).toHaveText('Operación confirmada exitosamente.');
    });
  });

  // HU-04 tambien prueba la cancelacion de alerta y modal antes de consultar el iframe.
  test('HU-04 combina alerta cancelada, modal informativo e iframe', async ({ page }) => {
    await switchToTab(page, '2. Alertas y Modales');

    await test.step('When cancela una confirmacion nativa', async () => {
      // Cancelamos la alerta nativa y revisamos el mensaje que deja la pagina.
      const cancelButton = page.getByRole('button', { name: 'Confirmar (Cancelar)' });
      const dialogPromise = page.waitForEvent('dialog');
      const clickPromise = cancelButton.click();
      const dialog = await dialogPromise;

      await dialog.dismiss();
      await clickPromise;
      await expect(page.locator('#alertResult')).toHaveText('You Pressed Cancel');
    });

    await test.step('And cierra el modal informativo', async () => {
      // Abrimos el modal informativo, revisamos el titulo y lo cerramos.
      const infoModal = page.locator('#infoModal');
      await page.getByRole('button', { name: 'Abrir Modal Informativo' }).click();
      await expect(infoModal).toBeVisible();
      await expect(infoModal.getByRole('heading', { name: 'Información' })).toBeVisible();
      await infoModal.getByRole('button', { name: 'Cerrar' }).click();
      await expect(infoModal).not.toBeVisible();
    });

    await test.step('And consulta el iframe simple', async () => {
      // Cambiamos a Frames y verificamos un texto del iframe.
      await switchToTab(page, '3. Frames');
      const iframe = page.frameLocator('iframe[title="Términos y Condiciones"]');
      await expect(iframe.locator('li').first()).toContainText('Aceptación de los Términos');

      // Tambien comprobamos que la pagina principal siga disponible.
      await expect(page.getByRole('heading', { name: 'Sandbox de Comportamientos Avanzados' })).toBeVisible();
    });

    await test.step('Then el resultado de cancelar la alerta sigue disponible', async () => {
      // Volvemos a Alertas y confirmamos que el mensaje no se perdio.
      await switchToTab(page, '2. Alertas y Modales');
      await expect(page.locator('#alertResult')).toHaveText('You Pressed Cancel');
    });
  });
});

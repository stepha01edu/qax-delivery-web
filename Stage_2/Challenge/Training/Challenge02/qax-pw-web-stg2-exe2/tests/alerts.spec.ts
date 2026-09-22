// Importamos las funciones basicas para crear pruebas y validar resultados.
import { test, expect } from '@playwright/test';

// Importamos la funcion que cambia a la pestaña de alertas.
import { switchToTab } from '../utils/navigation';

// Importamos funciones que ayudan a aceptar, cancelar o responder dialogos.
import { acceptDialog, dismissDialog, promptDialog } from '../utils/dialogUtils';

// Guardamos en una constante la pagina que usaremos en todos los casos.
const FORMS_URL = 'https://qaxpert.com/lab/sites/stage-2/forms/index.html';

// Agrupamos las pruebas relacionadas con alertas y modales.
test.describe('Comportamientos avanzados — Alertas y Modales', () => {

  // Antes de cada caso abrimos la pagina y seleccionamos la pestaña correcta.
  test.beforeEach(async ({ page }) => {
    await page.goto(FORMS_URL);
    await switchToTab(page, '2. Alertas y Modales');
  });

  // ─── Alertas Nativas ───────────────────────────────────

  test('Alerta simple — aceptar', async ({ page }) => {
    // Localizamos el boton que abre la alerta simple.
    const btn = page.getByRole('button', { name: 'Alerta Simple' });

    // La funcion hace clic, acepta la alerta y devuelve su mensaje.
    const msg = await acceptDialog(page, btn);

    // Confirmamos que la alerta devolvio algun mensaje.
    expect(msg).toBeTruthy();
  });

  test('Confirmar — aceptar (OK)', async ({ page }) => {
    // Localizamos el boton que abre la confirmacion.
    const btn = page.getByRole('button', { name: 'Confirmar (Aceptar OK)' });

    // Aceptamos la ventana y luego revisamos el mensaje de la pagina.
    await acceptDialog(page, btn);
    await expect(page.locator('#alertResult')).toContainText('You pressed Ok');
  });

  test('Confirmar — cancelar', async ({ page }) => {
    // Localizamos el boton que abre la confirmacion para cancelar.
    const btn = page.getByRole('button', { name: 'Confirmar (Cancelar)' });

    // dismissDialog cancela la ventana en lugar de aceptarla.
    await dismissDialog(page, btn);
    await expect(page.locator('#alertResult')).toContainText('You Pressed Cancel');
  });

  test('Prompt — ingresar texto', async ({ page }) => {
    // Localizamos el boton que abre el prompt.
    const btn = page.getByRole('button', { name: 'Prompt (Ingresar Texto)' });

    // Enviamos un texto al prompt y aceptamos la ventana.
    await promptDialog(page, btn, 'QAXpert Ninja');
    await expect(page.locator('#alertResult')).toContainText('QAXpert Ninja');
  });

  // ─── Modales Personalizados ────────────────────────────

  test('Modal de confirmación — abrir y cancelar', async ({ page }) => {
    // Abrimos el modal personalizado.
    await page.getByRole('button', { name: 'Abrir Modal de Confirmación' }).click();

    // Localizamos el modal por su id y verificamos su contenido.
    const modal = page.locator('#confirmModal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('¿Confirmar acción?')).toBeVisible();

    // Cancelamos y confirmamos que el modal se cierre.
    await modal.getByRole('button', { name: 'Cancelar' }).click();
    await expect(modal).not.toBeVisible();
  });

  test('Modal de confirmación — confirmar', async ({ page }) => {
    // Abrimos el modal de confirmacion.
    await page.getByRole('button', { name: 'Abrir Modal de Confirmación' }).click();

    // Hacemos clic en Confirmar y validamos que el modal desaparezca.
    const modal = page.locator('#confirmModal');
    await modal.getByRole('button', { name: 'Confirmar' }).click();
    await expect(modal).not.toBeVisible();
  });

  test('Modal informativo — abrir y cerrar', async ({ page }) => {
    // Abrimos el modal que muestra informacion.
    await page.getByRole('button', { name: 'Abrir Modal Informativo' }).click();

    // Confirmamos que el modal y su titulo sean visibles.
    const modal = page.locator('#infoModal');
    await expect(modal).toBeVisible();
    await expect(modal.getByText('Información')).toBeVisible();

    // Cerramos el modal y verificamos que ya no aparezca.
    await modal.getByRole('button', { name: 'Cerrar' }).click();
    await expect(modal).not.toBeVisible();
  });

});

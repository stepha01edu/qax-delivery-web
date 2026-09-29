import { Page, Locator } from '@playwright/test';

/**
 * Escucha el evento dialog, hace clic en el botón indicado y acepta el diálogo.
 * Sirve para alert() y confirm() cuando se quiere aceptar.
 *
 * @param page - Instancia de la página
 * @param buttonLocator - Localizador del botón que dispara el diálogo
 * @returns El mensaje del diálogo
 *
 * @example
 * const msg = await acceptDialog(page, page.getByRole('button', { name: 'Alerta Simple' }));
 */
export async function acceptDialog(page: Page, buttonLocator: Locator): Promise<string> {
  // Esperamos el dialogo antes de hacer clic porque aparece como resultado del clic.
  const dialogPromise = page.waitForEvent('dialog');

  // Hacemos clic en el boton que abre la alerta o confirmacion.
  await buttonLocator.click();

  // Guardamos el dialogo que aparecio y leemos su mensaje.
  const dialog = await dialogPromise;
  const message = dialog.message();

  // Aceptamos la ventana y devolvemos el mensaje para validarlo en el test.
  await dialog.accept();
  return message;
}

/**
 * Escucha el evento dialog, hace clic y rechaza (dismiss) el diálogo.
 * Sirve para confirm() cuando se quiere cancelar.
 *
 * @param page - Instancia de la página
 * @param buttonLocator - Localizador del botón que dispara el diálogo
 * @returns El mensaje del diálogo
 *
 * @example
 * const msg = await dismissDialog(page, page.getByRole('button', { name: 'Confirmar (Cancelar)' }));
 */
export async function dismissDialog(page: Page, buttonLocator: Locator): Promise<string> {
  // Esperamos la ventana que aparecera despues del clic.
  const dialogPromise = page.waitForEvent('dialog');

  // Hacemos clic en el boton que abre la confirmacion.
  await buttonLocator.click();

  // Leemos el mensaje antes de cerrar la ventana.
  const dialog = await dialogPromise;
  const message = dialog.message();

  // dismiss cancela la confirmacion y devuelve el mensaje al test.
  await dialog.dismiss();
  return message;
}

/**
 * Escucha el evento dialog, hace clic y responde un prompt con texto.
 * Sirve para prompt() cuando se quiere ingresar un valor.
 *
 * @param page - Instancia de la página
 * @param buttonLocator - Localizador del botón que dispara el diálogo
 * @param text - Texto a ingresar en el prompt
 * @returns El mensaje del diálogo
 *
 * @example
 * const msg = await promptDialog(page, page.getByRole('button', { name: 'Prompt' }), 'QAXpert Ninja');
 */
export async function promptDialog(page: Page, buttonLocator: Locator, text: string): Promise<string> {
  // Esperamos el prompt antes de hacer clic en el boton.
  const dialogPromise = page.waitForEvent('dialog');

  // Abrimos la ventana para poder escribir el texto recibido.
  await buttonLocator.click();

  // Aceptamos el prompt enviando el valor que recibio la funcion.
  const dialog = await dialogPromise;
  await dialog.accept(text);

  // Devolvemos el mensaje que mostro la pagina despues de responder.
  return dialog.message();
}

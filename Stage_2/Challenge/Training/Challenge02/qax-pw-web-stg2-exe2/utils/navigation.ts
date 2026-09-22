import { Page } from '@playwright/test';

/**
 * Cambia a una pestaña específica de QAX Forms haciendo clic en su botón.
 * Los botones de pestaña tienen texto visible como "2. Alertas y Modales", "3. Frames", etc.
 *
 * @param page - Instancia de la página de Playwright
 * @param tabText - Texto visible del botón de pestaña (ej: "2. Alertas y Modales")
 *
 * @example
 * await switchToTab(page, '2. Alertas y Modales');
 * await switchToTab(page, '3. Frames');
 */
export async function switchToTab(page: Page, tabText: string): Promise<void> {
  // Buscamos el boton de la pestaña usando el texto visible que recibe la funcion.
  await page.getByRole('button', { name: tabText }).click();
}

import { test, expect } from '@playwright/test';

// Este bloque revisa la pagina indicada para el ejercicio de archivos.
test.describe('Subir archivo', () => {
  // BUG-1: la pagina indicada no tiene un campo para subir archivos.
  // Revisar con el mentor si la URL entregada es la correcta para este ejercicio.
  test.fixme('Revisar si existe un campo para subir archivos', async ({ page }) => {
    // Abrimos la pagina indicada en la actividad.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/download.html');

    // Revisamos si la pagina tiene un campo para seleccionar un archivo.
    const cantidadDeCampos = await page.locator('input[type="file"]').count();

    // La pagina solo tiene enlaces de descarga, por eso el resultado es cero.
    expect(cantidadDeCampos).toBe(0);
  });
});

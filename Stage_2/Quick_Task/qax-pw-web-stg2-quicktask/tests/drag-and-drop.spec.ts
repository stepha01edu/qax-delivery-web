import { test, expect } from '@playwright/test';

// Este bloque agrupa la prueba de arrastrar y soltar.
test.describe('Drag and drop', () => {
  test('Arrastrar un elemento hasta el destino', async ({ page }) => {
    // Abrimos la pagina con el elemento que se puede arrastrar.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/drag-and-drop.html');

    // Localizamos el elemento de inicio y el lugar donde se soltara.
    const elemento = page.locator('#draggable');
    const destino = page.locator('#target');

    // Movemos el elemento desde su posicion hasta el destino.
    await elemento.dragTo(destino);

    // Validamos que el destino siga visible despues de la accion.
    await expect(destino).toBeVisible();

    // como podria validar scenarios negativos en el cual se arrastra el elemento a un lugar que no es el destino? validar con el mentor.

  });
});

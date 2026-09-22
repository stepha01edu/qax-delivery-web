import { test, expect } from '@playwright/test';

// Este bloque agrupa las pruebas de las acciones del menu.
test.describe('Acciones en dropdown', () => {
  test('Usar click, click derecho, doble click y seleccionar una opcion', async ({ page }) => {
    // Abrimos la pagina que tiene los tres menus de practica.
    await page.goto('https://bonigarcia.dev/selenium-webdriver-java/dropdown-menu.html');

    // Buscamos directamente la lista que esta debajo del primer boton.
    const dropdownLeft = page.locator('#my-dropdown-1 + ul.dropdown-menu');

    // Hacemos click normal para mostrar sus opciones.
    await page.locator('#my-dropdown-1').click();

    // Validamos que una opcion del menu se muestre y luego la seleccionamos.
    await expect(dropdownLeft.getByRole('link', { name: 'Action', exact: true })).toBeVisible();
    await dropdownLeft.getByRole('link', { name: 'Action', exact: true }).click();

    // Hacemos click derecho en el segundo boton y validamos su menu.
    const dropdownRight = page.locator('#context-menu-2');
    await page.locator('#my-dropdown-2').click({ button: 'right' });
    await expect(dropdownRight).toBeVisible();

    // Hacemos doble click en el tercer boton y validamos su menu.
    const dropdownDouble = page.locator('#context-menu-3');
    await page.locator('#my-dropdown-3').dblclick();
    await expect(dropdownDouble).toBeVisible();

    // validar con el mentor casos en los cuales el user no selecciona ninguna opcion y simplemente cierra el menu, como se puede validar que el menu se cerro correctamente?
  });
});

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

// Los console.log se usaron como guia para seguir el avance en la terminal.
// Despues de revisar la ejecucion, se dejan comentados para estudiar el flujo.

// Agrupamos los pasos para buscar un producto y agregarlo al carrito.
test.describe('Feature: Buscar producto en Haguazon', () => {

  test('Buscar laptop y ver su detalle', async ({ page }) => {
    // Creamos los objetos que tienen las acciones de cada pagina.
    const home = new HomePage(page);
    const product = new ProductPage(page);

    // test.step muestra cada parte del flujo por separado en el reporte.
    await test.step('Given que el usuario abre Haguazon', async () => {
      // Avisamos en la terminal que comienza la apertura de la tienda.
      // console.log('CP01: Abriendo Haguazon.');
      // Abrimos la pagina principal y revisamos que el titulo sea de Haguazon.
      // BUG-001: esta ruta con / inicial abria https://qaxpert.com/index.html.
      // await home.navigate('/index.html');

      // Usamos una ruta relativa para abrir index.html dentro de Haguazon.
      await home.navigate('index.html');
      await expect(page).toHaveTitle(/Haguazon/i);
    });

    await test.step('When busca "laptop"', async () => {
      // Indicamos que comienza la busqueda del producto.
      // console.log('CP01: Buscando laptop.');
      // Buscamos laptops y comprobamos que aparezca una tarjeta de producto.
      await home.search('laptop');
      await expect(home.productCards.first()).toBeVisible();
    });

    await test.step('And hace clic en el primer producto', async () => {
      // Mostramos que el flujo pasa del resultado al detalle.
      // console.log('CP01: Abriendo el detalle del primer resultado.');
      // Abrimos el primer resultado y revisamos que se abra su pagina de detalle.
      await home.clickFirstProduct();
      await expect(page).toHaveURL(/product\.html\?id=/);
    });

    await test.step('Then se muestra el nombre, precio y stock', async () => {
      // Avisamos que se revisan los datos del producto.
      // console.log('CP01: Revisando nombre, precio y stock.');
      // Revisamos que las tres partes principales del detalle esten visibles.
      await expect(product.productName).toBeVisible();
      await expect(product.productPrice).toBeVisible();
      await expect(product.stockStatus).toBeVisible();
    });

    await test.step('And el producto aparece en el carrito', async () => {
      // Indicamos que se agrega el producto y se revisa el carrito.
      // console.log('CP01: Agregando el producto y revisando el carrito.');
      // Agregamos el producto y volvemos a inicio para revisar el contador.
      await product.addToCart();
      await home.navigate('index.html');
      await expect(home.cartBadge).toHaveText('1');

      // Despues abrimos el carrito y confirmamos que aparezca el producto.
      await home.navigate('cart.html');

      // Comprobamos que el nombre del producto este dentro del carrito.
      await expect(page.getByText('Laptop HP 15.6" Intel Core i5', { exact: true })).toBeVisible();
    });
  });

});

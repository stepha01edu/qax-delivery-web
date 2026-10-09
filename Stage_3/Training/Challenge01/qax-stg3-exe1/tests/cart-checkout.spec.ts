import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

// Los console.log se usaron como guia para seguir el avance en la terminal.
// Despues de revisar la ejecucion, se dejan comentados para estudiar el flujo.

// Agrega una laptop para que cada prueba empiece con un carrito conocido.
async function addLaptopToCart(page: Page): Promise<CartPage> {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await test.step('Given que agrega una laptop y abre el carrito', async () => {
    // Mostramos en la terminal como se prepara el carrito para cada caso.
    // console.log('Preparacion: Agregando una laptop y abriendo el carrito.');
    await home.navigate('index.html');
    await home.search('laptop');
    await home.clickFirstProduct();
    await product.addToCart();
    await cart.open();
  });

  return cart;
}

// Completa los pasos previos para dejar el checkout listo en Revision.
async function prepareOrderReview(page: Page, customerName: string): Promise<CheckoutPage> {
  const cart = await addLaptopToCart(page);
  const checkout = new CheckoutPage(page);

  await test.step(`And abre checkout para ${customerName}`, async () => {
    // Indicamos que comienza la preparacion de los datos de compra.
    // console.log(`Preparacion: Abriendo checkout para ${customerName}.`);
    await cart.proceedToCheckout();
    await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
  });

  await test.step('And completa la direccion de envio', async () => {
    // Mostramos que se esta completando la direccion.
    // console.log('Preparacion: Completando la direccion de envio.');
    await checkout.fillAddress(customerName);
    await checkout.continueToShipping();
    await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
  });

  await test.step('And elige envio y pago', async () => {
    // Indicamos que se eligen las opciones de envio y pago.
    // console.log('Preparacion: Eligiendo envio y metodo de pago.');
    await checkout.selectExpressShipping();
    await checkout.continueToPayment();
    await checkout.selectPsePayment();
    await checkout.continueToReview();
    await expect(checkout.stepHeading).toHaveText('Revision del Pedido');
  });

  return checkout;
}

test.describe('HU-01: Gestion del carrito', () => {
  test('CP01 -- muestra nombre, precio unitario y cantidad', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('Then revisa los datos del producto en el carrito', async () => {
      // Avisamos que se validan los datos visibles de la laptop.
      // console.log('CP01: Revisando nombre, precio y cantidad.');
      await expect(cart.itemRows.first()).toBeVisible();
      await expect(cart.itemName).toHaveText('Laptop HP 15.6" Intel Core i5');
      await expect(cart.itemUnitPrice).toContainText('$');
      await expect(cart.quantityInput).toHaveValue('1');
    });
  });

  test('CP02 -- actualiza subtotal y total al cambiar la cantidad', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('When cambia la cantidad a 2', async () => {
      // Mostramos que comienza el cambio de cantidad.
      // console.log('CP02: Cambiando la cantidad a 2.');
      await cart.changeQuantity('2');
      await expect(cart.quantityInput).toHaveValue('2');
    });

    await test.step('Then el subtotal y el total reflejan la nueva cantidad', async () => {
      // Indicamos que se revisan los nuevos valores del carrito.
      // console.log('CP02: Revisando el subtotal y el total.');
      await expect(cart.itemSubtotals.first()).toHaveText('$3.798.000');
      await expect(cart.total).toContainText('$3.798.000');
    });
  });

  test('CP03 -- elimina un producto y baja el total', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const home = new HomePage(page);
    const product = new ProductPage(page);

    // Agregamos otro producto para comparar el total antes y despues de eliminar la laptop.
    await test.step('And agrega un kit de teclado y mouse', async () => {
      // Avisamos que se agrega un segundo producto para comparar el total.
      // console.log('CP03: Agregando un kit de teclado y mouse.');
      await home.navigate('index.html');
      await home.search('teclado');
      await home.clickFirstProduct();
      await product.addToCart();
      await cart.open();
      await expect(cart.itemRows).toHaveCount(2);
      // Con los dos productos, el envio es gratis y el total es 2.068.000.
      await expect(cart.total).toHaveText('Total: $2.068.000');
    });

    await test.step('When elimina la laptop', async () => {
      // Mostramos que comienza la eliminacion de la laptop.
      // console.log('CP03: Eliminando la laptop del carrito.');
      await cart.removeFirstItem();
    });

    await test.step('Then el total disminuye y el kit sigue en el carrito', async () => {
      // Indicamos que se revisa el total luego de eliminar el producto.
      // console.log('CP03: Revisando el total y el producto restante.');
      await expect(cart.itemRows).toHaveCount(1);
      // Al quedar solo el kit, se suma el envio y el total es 184.000.
      await expect(cart.total).toHaveText('Total: $184.000');
    });
  });

  test('CP04 -- conserva los productos al navegar entre paginas', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const home = new HomePage(page);

    await test.step('When va a inicio y regresa al carrito', async () => {
      // Mostramos que se navega entre paginas y se vuelve al carrito.
      // console.log('CP04: Navegando a inicio y regresando al carrito.');
      await home.navigate('index.html');
      await expect(home.cartBadge).toHaveText('1');
      await cart.open();
    });

    await test.step('Then el producto sigue en el carrito', async () => {
      // Avisamos que se verifica que el carrito conservo la laptop.
      // console.log('CP04: Revisando que el producto siga en el carrito.');
      await expect(cart.itemName).toHaveText('Laptop HP 15.6" Intel Core i5');
      await expect(cart.quantityInput).toHaveValue('1');
    });
  });

  test('CP05 -- rechaza la cantidad cero y conserva el subtotal', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('When intenta ingresar una cantidad de 0', async () => {
      // Indicamos que se prueba el valor de cantidad cero.
      // console.log('CP05: Intentando ingresar cantidad 0.');
      await cart.changeQuantity('0');
    });

    await test.step('Then la cantidad vuelve a 1 y el subtotal no cambia', async () => {
      // Mostramos que se revisa como responde el carrito al valor no permitido.
      // console.log('CP05: Revisando cantidad y subtotal despues del intento.');
      await expect(cart.quantityInput).toHaveValue('1');
      await expect(cart.itemSubtotals.first()).toHaveText('$1.899.000');
    });
  });
});

test.describe('HU-02: Checkout en cuatro pasos', () => {
  test('CP06 -- pide completar la direccion antes de avanzar', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const checkout = new CheckoutPage(page);

    await test.step('Given que abre checkout y ve sus cuatro pasos', async () => {
      // Avisamos que comienza la revision inicial del checkout.
      // console.log('CP06: Abriendo checkout y revisando sus cuatro pasos.');
      await cart.proceedToCheckout();
      await expect(page).toHaveURL(/checkout\.html/);
      await expect(checkout.progressSteps).toHaveCount(4);
      await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
    });

    await test.step('When intenta continuar sin completar la direccion', async () => {
      // Indicamos que se prueba avanzar con la direccion vacia.
      // console.log('CP06: Intentando avanzar sin completar la direccion.');
      // BUG-008: el boton sigue habilitado y la pagina bloquea el avance con una alerta.
      await checkout.continueToShipping();
    });

    await test.step('Then permanece en Direccion', async () => {
      // Mostramos que se revisa si el checkout permanecio en Direccion.
      // console.log('CP06: Revisando que continue en Direccion.');
      await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
    });

    await test.step('When completa los campos requeridos', async () => {
      // Indicamos que se completan los datos para poder avanzar.
      // console.log('CP06: Completando los datos requeridos.');
      await checkout.fillAddress();
      await checkout.continueToShipping();
    });

    await test.step('Then avanza al paso Envio', async () => {
      // Avisamos que se confirma el avance al paso de envio.
      // console.log('CP06: Revisando que avance al paso Envio.');
      await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
    });
  });

  test('CP07 -- selecciona envio y pago y revisa todos los datos', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const checkout = new CheckoutPage(page);

    await test.step('Given que ingresa sus datos y llega a Envio', async () => {
      // Mostramos que se prepara el checkout con los datos del cliente.
      // console.log('CP07: Completando la direccion y llegando a Envio.');
      await cart.proceedToCheckout();
      await checkout.fillAddress('QA Haguazon');
      await checkout.continueToShipping();
      await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
    });

    await test.step('When selecciona envio Express', async () => {
      // Indicamos que se selecciona y valida el envio.
      // console.log('CP07: Seleccionando envio Express.');
      await checkout.selectExpressShipping();
      await expect(checkout.selectedShippingOption).toContainText('Envio Express');
      await checkout.continueToPayment();
    });

    await test.step('And selecciona PSE y llega a Revision', async () => {
      // Mostramos que se elige PSE y se avanza a Revision.
      // console.log('CP07: Seleccionando PSE y avanzando a Revision.');
      await expect(checkout.stepHeading).toHaveText('Metodo de Pago');
      await checkout.selectPsePayment();
      await expect(checkout.selectedPaymentOption).toContainText('PSE - Pago Seguro en Linea');
      await checkout.continueToReview();
    });

    await test.step('Then Revision muestra la direccion, envio, pago y producto', async () => {
      // Avisamos que se revisan todos los datos antes de confirmar.
      // console.log('CP07: Revisando los datos del pedido.');
      await expect(checkout.stepHeading).toHaveText('Revision del Pedido');
      await expect(checkout.stepContent).toContainText('QA Haguazon');
      await expect(checkout.stepContent).toContainText('Calle 10 # 20-30');
      await expect(checkout.stepContent).toContainText('Bogota, Cundinamarca');
      // Confirmamos que el telefono y el codigo postal tambien llegaron a Revision.
      await expect(checkout.stepContent).toContainText('CP: 110111');
      await expect(checkout.stepContent).toContainText('Tel: 3001234567');
      await expect(checkout.stepContent).toContainText('Express (2-3 dias)');
      await expect(checkout.stepContent).toContainText('PSE');
      await expect(checkout.stepContent).toContainText('Laptop HP 15.6" Intel Core i5');
    });
  });

  // BUG-005: el sitio deja Tarjeta seleccionada desde el inicio y no permite quitarla desde la pantalla.
  test.fixme('CP08 -- no avanza si no se selecciona un metodo de pago', async () => {
    // No se puede dejar el metodo vacio usando los controles visibles de la pagina.
  });
});

test.describe('HU-03: Confirmacion del pedido', () => {
  test('CP09 -- confirma pedidos, usa identificadores distintos y vacia el carrito', async ({ page }) => {
    const firstCheckout = await prepareOrderReview(page, 'QA Haguazon Uno');
    let firstOrderId: string | null = '';

    await test.step('When confirma el primer pedido', async () => {
      // Indicamos que comienza la confirmacion del primer pedido.
      // console.log('CP09: Confirmando el primer pedido.');
      await firstCheckout.confirmOrder();
    });

    await test.step('Then ve la confirmacion y el primer identificador', async () => {
      // Mostramos que se revisa la confirmacion y su identificador.
      // console.log('CP09: Revisando la confirmacion del primer pedido.');
      await expect(firstCheckout.successBox).toBeVisible();
      await expect(firstCheckout.successBox).toContainText('Pedido Confirmado!');
      firstOrderId = await firstCheckout.orderId.textContent();
      expect(firstOrderId).toMatch(/^HGZ-[A-Z0-9]+$/);
    });

    await test.step('And el carrito y su contador quedan en cero', async () => {
      // Avisamos que se comprueba que la compra vacio el carrito.
      // console.log('CP09: Revisando que el carrito y su contador queden en cero.');
      const cart = new CartPage(page);
      const home = new HomePage(page);

      await cart.open();
      await expect(cart.emptyMessage).toHaveText('Tu carrito está vacío');
      await home.navigate('index.html');
      await expect(home.cartBadge).toHaveText('0');
    });

    const secondCheckout = await prepareOrderReview(page, 'QA Haguazon Dos');

    await test.step('When confirma un segundo pedido', async () => {
      // Indicamos que se confirma otro pedido para comparar los identificadores.
      // console.log('CP09: Confirmando un segundo pedido.');
      await secondCheckout.confirmOrder();
    });

    await test.step('Then el segundo identificador es distinto al primero', async () => {
      // Mostramos que se revisa que los dos identificadores sean diferentes.
      // console.log('CP09: Comparando los identificadores de los pedidos.');
      await expect(secondCheckout.successBox).toBeVisible();
      const secondOrderId = await secondCheckout.orderId.textContent();
      expect(secondOrderId).not.toBe(firstOrderId);
    });
  });

  // BUG-006: la pagina genera el id con una longitud variable y no cumple las 10 posiciones solicitadas.
  test.fixme('CP10 -- muestra el identificador con diez caracteres despues de HGZ-', async ({ page }) => {
    const checkout = await prepareOrderReview(page, 'QA Formato');
    await checkout.confirmOrder();
    await expect(checkout.orderId).toHaveText(/^HGZ-[A-Z0-9]{10}$/);
  });

  // BUG-007: la confirmacion muestra "Ver Mis Pedidos" en lugar de "Seguir comprando".
  test.fixme('CP11 -- muestra el enlace Seguir comprando despues de confirmar', async ({ page }) => {
    const checkout = await prepareOrderReview(page, 'QA Enlace');
    await checkout.confirmOrder();
    await expect(checkout.continueShoppingLink).toBeVisible();
  });

  test('CP12 -- bloquea la confirmacion si el carrito esta vacio', async ({ page }) => {
    const checkout = new CheckoutPage(page);

    await test.step('Given que abre checkout sin productos', async () => {
      // Avisamos que se prepara checkout sin agregar productos al carrito.
      // console.log('CP12: Abriendo checkout sin productos.');
      await checkout.open();
      await checkout.fillAddress('QA Sin Productos');
      await checkout.continueToShipping();
      await checkout.selectExpressShipping();
      await checkout.continueToPayment();
      await checkout.selectPsePayment();
      await checkout.continueToReview();
      await expect(checkout.stepHeading).toHaveText('Revision del Pedido');
    });

    await test.step('When intenta confirmar la compra', async () => {
      // Indicamos que se intenta confirmar el pedido vacio.
      // console.log('CP12: Intentando confirmar sin productos.');
      await checkout.confirmOrder();
    });

    await test.step('Then no aparece ningun pedido registrado', async () => {
      // Mostramos que se revisa que no se haya creado un pedido.
      // console.log('CP12: Revisando que no se haya registrado un pedido.');
      await checkout.navigate('orders.html');
      await expect(page.locator('.empty')).toContainText('No tienes pedidos aun.');
    });
  });
});

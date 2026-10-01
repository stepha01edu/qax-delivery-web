import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

// Agrega una laptop para que cada prueba empiece con un carrito conocido.
async function addLaptopToCart(page: Page): Promise<CartPage> {
  const home = new HomePage(page);
  const product = new ProductPage(page);
  const cart = new CartPage(page);

  await test.step('Given que agrega una laptop y abre el carrito', async () => {
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
    await cart.proceedToCheckout();
    await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
  });

  await test.step('And completa la direccion de envio', async () => {
    await checkout.fillAddress(customerName);
    await checkout.continueToShipping();
    await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
  });

  await test.step('And elige envio y pago', async () => {
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
      await expect(cart.itemRows.first()).toBeVisible();
      await expect(cart.itemName).toHaveText('Laptop HP 15.6" Intel Core i5');
      await expect(cart.itemUnitPrice).toContainText('$');
      await expect(cart.quantityInput).toHaveValue('1');
    });
  });

  test('CP02 -- actualiza subtotal y total al cambiar la cantidad', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('When cambia la cantidad a 2', async () => {
      await cart.changeQuantity('2');
      await expect(cart.quantityInput).toHaveValue('2');
    });

    await test.step('Then el subtotal y el total reflejan la nueva cantidad', async () => {
      await expect(cart.itemSubtotals.first()).toHaveText('$3.798.000');
      await expect(cart.total).toContainText('$3.798.000');
    });
  });

  test('CP03 -- elimina un producto y muestra el carrito vacio', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('When elimina la laptop', async () => {
      await cart.removeFirstItem();
    });

    await test.step('Then el carrito queda vacio y ya no muestra el resumen', async () => {
      await expect(cart.emptyMessage).toHaveText('Tu carrito está vacío');
      await expect(cart.itemRows).toHaveCount(0);
      await expect(cart.total).not.toBeVisible();
    });
  });

  test('CP04 -- conserva los productos al navegar entre paginas', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const home = new HomePage(page);

    await test.step('When va a inicio y regresa al carrito', async () => {
      await home.navigate('index.html');
      await expect(home.cartBadge).toHaveText('1');
      await cart.open();
    });

    await test.step('Then el producto sigue en el carrito', async () => {
      await expect(cart.itemName).toHaveText('Laptop HP 15.6" Intel Core i5');
      await expect(cart.quantityInput).toHaveValue('1');
    });
  });

  test('CP05 -- rechaza la cantidad cero y conserva el subtotal', async ({ page }) => {
    const cart = await addLaptopToCart(page);

    await test.step('When intenta ingresar una cantidad de 0', async () => {
      await cart.changeQuantity('0');
    });

    await test.step('Then la cantidad vuelve a 1 y el subtotal no cambia', async () => {
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
      await cart.proceedToCheckout();
      await expect(page).toHaveURL(/checkout\.html/);
      await expect(checkout.progressSteps).toHaveCount(4);
      await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
    });

    await test.step('When intenta continuar sin completar la direccion', async () => {
      // BUG-008: el boton sigue habilitado y la pagina bloquea el avance con una alerta.
      await checkout.continueToShipping();
    });

    await test.step('Then permanece en Direccion', async () => {
      await expect(checkout.stepHeading).toHaveText('Direccion de Envio');
    });

    await test.step('When completa los campos requeridos', async () => {
      await checkout.fillAddress();
      await checkout.continueToShipping();
    });

    await test.step('Then avanza al paso Envio', async () => {
      await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
    });
  });

  test('CP07 -- selecciona envio y pago y revisa todos los datos', async ({ page }) => {
    const cart = await addLaptopToCart(page);
    const checkout = new CheckoutPage(page);

    await test.step('Given que ingresa sus datos y llega a Envio', async () => {
      await cart.proceedToCheckout();
      await checkout.fillAddress('QA Haguazon');
      await checkout.continueToShipping();
      await expect(checkout.stepHeading).toHaveText('Metodo de Envio');
    });

    await test.step('When selecciona envio Express', async () => {
      await checkout.selectExpressShipping();
      await expect(checkout.selectedShippingOption).toContainText('Envio Express');
      await checkout.continueToPayment();
    });

    await test.step('And selecciona PSE y llega a Revision', async () => {
      await expect(checkout.stepHeading).toHaveText('Metodo de Pago');
      await checkout.selectPsePayment();
      await expect(checkout.selectedPaymentOption).toContainText('PSE - Pago Seguro en Linea');
      await checkout.continueToReview();
    });

    await test.step('Then Revision muestra la direccion, envio, pago y producto', async () => {
      await expect(checkout.stepHeading).toHaveText('Revision del Pedido');
      await expect(checkout.stepContent).toContainText('QA Haguazon');
      await expect(checkout.stepContent).toContainText('Calle 10 # 20-30');
      await expect(checkout.stepContent).toContainText('Bogota, Cundinamarca');
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
      await firstCheckout.confirmOrder();
    });

    await test.step('Then ve la confirmacion y el primer identificador', async () => {
      await expect(firstCheckout.successBox).toBeVisible();
      await expect(firstCheckout.successBox).toContainText('Pedido Confirmado!');
      firstOrderId = await firstCheckout.orderId.textContent();
      expect(firstOrderId).toMatch(/^HGZ-[A-Z0-9]+$/);
    });

    await test.step('And el carrito y su contador quedan en cero', async () => {
      const cart = new CartPage(page);
      const home = new HomePage(page);

      await cart.open();
      await expect(cart.emptyMessage).toHaveText('Tu carrito está vacío');
      await home.navigate('index.html');
      await expect(home.cartBadge).toHaveText('0');
    });

    const secondCheckout = await prepareOrderReview(page, 'QA Haguazon Dos');

    await test.step('When confirma un segundo pedido', async () => {
      await secondCheckout.confirmOrder();
    });

    await test.step('Then el segundo identificador es distinto al primero', async () => {
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
      await checkout.confirmOrder();
    });

    await test.step('Then no aparece ningun pedido registrado', async () => {
      await checkout.navigate('orders.html');
      await expect(page.locator('.empty')).toContainText('No tienes pedidos aun.');
    });
  });
});

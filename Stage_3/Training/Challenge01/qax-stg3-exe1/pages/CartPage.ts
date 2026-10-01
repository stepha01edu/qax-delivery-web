import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los localizadores y acciones que usamos en el carrito.
export class CartPage extends BasePage {
  readonly itemRows: Locator;
  readonly itemName: Locator;
  readonly itemUnitPrice: Locator;
  readonly quantityInput: Locator;
  readonly itemSubtotals: Locator;
  readonly total: Locator;
  readonly removeButton: Locator;
  readonly checkoutButton: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    // Usamos la misma pestana y la navegacion comun de BasePage.
    super(page);

    // Estos localizadores apuntan a los datos del primer producto del carrito.
    this.itemRows = page.locator('.cart-item');
    this.itemName = page.locator('.item-title').first();
    this.itemUnitPrice = page.locator('.item-price').first();
    this.quantityInput = page.locator('.qty-control input').first();
    this.itemSubtotals = page.locator('.item-subtotal .st');

    // Estos datos permiten revisar el total y quitar productos.
    this.total = page.locator('.cart-summary .total');
    this.removeButton = page.getByRole('button', { name: 'Eliminar' });
    this.checkoutButton = page.getByRole('link', { name: 'Proceder al Pago' });
    this.emptyMessage = page.locator('.empty-cart h2');
  }

  // Abre la pagina del carrito.
  async open(): Promise<void> {
    await this.navigate('cart.html');
  }

  // Cambia la cantidad y sale del campo para que la pagina actualice los calculos.
  async changeQuantity(quantity: string): Promise<void> {
    await this.quantityInput.fill(quantity);
    await this.quantityInput.press('Tab');
  }

  // Quita el primer producto que aparece en la lista.
  async removeFirstItem(): Promise<void> {
    await this.removeButton.first().click();
  }

  // Abre el primer paso de checkout desde el resumen del carrito.
  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

}

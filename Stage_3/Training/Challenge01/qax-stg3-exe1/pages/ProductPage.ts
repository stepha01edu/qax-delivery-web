import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase reune los elementos y las acciones del detalle del producto.
export class ProductPage extends BasePage {
  // Estos localizadores apuntan a la informacion y al boton del producto.
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly stockStatus: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    // Compartimos la pestana del navegador con BasePage.
    super(page);

    // Busca los datos principales que aparecen en el detalle del producto.
    // BUG-003: en la pagina actual no existe la clase .product-title.
    // this.productName = page.locator('.product-title');

    // El nombre del producto se muestra como el titulo principal de la pagina.
    this.productName = page.getByRole('heading', { level: 1 });
    this.productPrice = page.locator('.price');
    this.stockStatus = page.locator('.stock');
    // Busca el boton usando el rol y la palabra "carrito".
    this.addToCartBtn = page.getByRole('button', { name: /carrito/i });
  }

  // Presiona el boton que agrega el producto al carrito.
  async addToCart(): Promise<void> {
    await this.addToCartBtn.click();
  }
}

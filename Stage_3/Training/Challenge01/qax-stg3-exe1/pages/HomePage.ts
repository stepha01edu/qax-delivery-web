import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase reune los elementos y las acciones de la pagina principal.
export class HomePage extends BasePage {
  // Estos nombres guardan los elementos que se usan en la pagina principal.
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartBadge: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    // Compartimos esta pestana con BasePage para poder navegar desde aqui.
    super(page);

    // Busca la caja de texto por la palabra que aparece como ayuda.
    this.searchInput = page.getByPlaceholder(/buscar/i);
    // BUG-002: este selector no encuentra el boton en la pagina actual.
    // this.searchButton = page.locator('.search-bar button');

    // Buscamos el boton por la palabra visible "Buscar".
    this.searchButton = page.getByRole('button', { name: /buscar/i });
    // El contador se muestra en la pagina principal de Haguazon.
    this.cartBadge = page.locator('#cartCount');
    // Busca todas las tarjetas que muestran productos.
    this.productCards = page.locator('.product-card');
  }

  // Escribe el producto en el buscador y presiona el boton de busqueda.
  async search(term: string): Promise<void> {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  // Abre la primera tarjeta de producto que aparece en los resultados.
  async clickFirstProduct(): Promise<void> {
    await this.productCards.first().click();
  }

  // Lee la cantidad que aparece junto al carrito en la pagina principal.
  async getCartCount(): Promise<string | null> {
    return this.cartBadge.textContent();
  }
}

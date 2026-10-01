import { Page } from '@playwright/test';

// Esta clase guarda la pestana que las demas paginas van a usar.
export class BasePage {
  constructor(protected page: Page) {}

  // Abre la direccion que recibe como parte del sitio.
  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }
}

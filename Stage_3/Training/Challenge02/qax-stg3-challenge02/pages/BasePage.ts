import { Page } from '@playwright/test';

// Esta clase permite que las paginas abran direcciones del mismo sitio.
export class BasePage {
  constructor(protected page: Page) {}

  // Abre la pagina indicada dentro de QAXTrade.
  async navigate(path: string): Promise<void> {
    await this.page.goto(path);
  }
}

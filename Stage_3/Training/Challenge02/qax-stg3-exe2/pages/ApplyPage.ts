import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ApplyPage extends BasePage {
  readonly emailInput: Locator;
  readonly ingresoInput: Locator;
  readonly emailError: Locator;
  readonly ingresoError: Locator;
  readonly btnSubmit: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#email');
    this.ingresoInput = page.locator('#ingreso');
    this.emailError = page.locator('#errEmail');
    this.ingresoError = page.locator('#errIngreso');
    this.btnSubmit = page.locator('#btnSubmit');
  }

  async fillEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  async fillIngreso(monto: string): Promise<void> {
    await this.ingresoInput.fill(monto);
  }

  async clickSubmit(): Promise<void> {
    await this.btnSubmit.click();
  }
}

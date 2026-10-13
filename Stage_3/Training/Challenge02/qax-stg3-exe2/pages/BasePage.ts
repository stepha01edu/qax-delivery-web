import { expect, Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async verifyTitle(expectedTitle: string, message?: string): Promise<void> {
    await expect(this.page, message).toHaveTitle(expectedTitle);
  }

  async verifyUrl(regex: RegExp, message?: string): Promise<void> {
    await expect(this.page, message).toHaveURL(regex);
  }

  async verifyElementVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  async verifyElementHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  async verifyElementDisabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeDisabled();
  }

  async verifyElementEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  async verifyCssValue(locator: Locator, property: string, value: string, message?: string): Promise<void> {
    await expect(locator, message).toHaveCSS(property, value);
  }

  async verifyToContainText(locator: Locator, text: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(text);
  }

  async verifyToHaveClass(locator: Locator, className: RegExp, message?: string): Promise<void> {
    await expect(locator, message).toHaveClass(className);
  }
}

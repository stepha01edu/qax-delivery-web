import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los campos y las acciones de las alertas.
export class AlertsPage extends BasePage {
  readonly assetSelect: Locator;
  readonly conditionSelect: Locator;
  readonly targetPriceInput: Locator;
  readonly createButton: Locator;
  readonly alertItems: Locator;
  readonly toggleButtons: Locator;
  readonly deleteButtons: Locator;
  readonly emptyMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Estos campos permiten crear una alerta para un activo.
    this.assetSelect = page.locator('#alertAsset');
    this.conditionSelect = page.locator('#alertCondition');
    this.targetPriceInput = page.locator('#alertTarget');
    this.createButton = page.getByRole('button', { name: /Crear Alerta/i });

    // Estos elementos muestran las alertas guardadas y sus botones.
    this.alertItems = page.locator('#alertList .alert-item');
    this.toggleButtons = page.locator('#alertList .toggle-btn');
    this.deleteButtons = page.locator('#alertList .delete-btn');
    this.emptyMessage = page.locator('#emptyAlerts p');
  }

  // Abre la pagina de alertas.
  async open(): Promise<void> {
    await this.navigate('alerts.html');
  }

  // Completa activo, condicion y precio objetivo antes de crear la alerta.
  async fillAlert(asset: string, condition: string, targetPrice: string): Promise<void> {
    await this.assetSelect.selectOption(asset);
    await this.conditionSelect.selectOption(condition);
    await this.targetPriceInput.fill(targetPrice);
  }

  // Presiona el boton para guardar la alerta.
  async createAlert(): Promise<void> {
    await this.createButton.click();
  }

  // Cambia el estado de la primera alerta de la lista.
  async toggleFirstAlert(): Promise<void> {
    await this.toggleButtons.first().click();
  }

  // Elimina la primera alerta que aparece en la lista.
  async deleteFirstAlert(): Promise<void> {
    await this.deleteButtons.first().click();
  }
}

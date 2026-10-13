import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los campos y las acciones para crear una orden.
export class OrderPage extends BasePage {
  readonly assetSelect: Locator;
  readonly orderTypeSelect: Locator;
  readonly sideSelect: Locator;
  readonly limitFields: Locator;
  readonly stopFields: Locator;
  readonly limitPriceInput: Locator;
  readonly amountInput: Locator;
  readonly currentPrice: Locator;
  readonly submitButton: Locator;
  readonly confirmationModal: Locator;
  readonly orderId: Locator;
  readonly orderDetails: Locator;
  readonly closeModalButton: Locator;

  constructor(page: Page) {
    super(page);

    // Estos campos permiten seleccionar el activo y completar la orden.
    this.assetSelect = page.locator('#asset');
    this.orderTypeSelect = page.locator('#orderType');
    this.sideSelect = page.locator('#side');
    this.limitFields = page.locator('#limitFields');
    this.stopFields = page.locator('#stopFields');
    this.limitPriceInput = page.locator('#limitPrice');
    this.amountInput = page.locator('#amount');

    // Estos elementos muestran el precio y el resultado de confirmar la orden.
    this.currentPrice = page.locator('#currentPrice');
    this.submitButton = page.locator('#btnSubmit');
    this.confirmationModal = page.locator('#confirmModal');
    this.orderId = page.locator('#modalOrderId');
    this.orderDetails = page.locator('#modalDetails');
    this.closeModalButton = page.getByRole('button', { name: 'Entendido' });
  }

  // Abre la pagina para crear una orden.
  async open(): Promise<void> {
    await this.navigate('orders.html');
  }

  // Selecciona el activo que se va a comprar.
  async selectAsset(symbol: string): Promise<void> {
    await this.assetSelect.selectOption(symbol);
  }

  // Selecciona si la orden se hara al precio de mercado o a precio limite.
  async selectOrderType(type: string): Promise<void> {
    await this.orderTypeSelect.selectOption(type);
  }

  // Ingresa la cantidad de acciones o activos para la orden.
  async fillAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  // Ingresa el precio solicitado cuando el tipo de orden es Limit.
  async fillLimitPrice(price: string): Promise<void> {
    await this.limitPriceInput.fill(price);
  }

  // Envia la orden y abre el mensaje de confirmacion.
  async submitOrder(): Promise<void> {
    await this.submitButton.click();
  }

  // Cierra el mensaje de confirmacion para continuar usando la pagina.
  async closeConfirmation(): Promise<void> {
    await this.closeModalButton.click();
  }
}

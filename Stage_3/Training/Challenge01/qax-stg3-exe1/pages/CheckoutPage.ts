import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los localizadores y acciones de los pasos de checkout.
export class CheckoutPage extends BasePage {
  readonly progressSteps: Locator;
  readonly stepHeading: Locator;
  readonly stepContent: Locator;
  readonly fullNameInput: Locator;
  readonly phoneInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly departmentInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueToShippingButton: Locator;
  readonly expressShippingOption: Locator;
  readonly selectedShippingOption: Locator;
  readonly continueToPaymentButton: Locator;
  readonly psePaymentOption: Locator;
  readonly selectedPaymentOption: Locator;
  readonly continueToReviewButton: Locator;
  readonly confirmOrderButton: Locator;
  readonly successBox: Locator;
  readonly orderId: Locator;
  readonly continueShoppingLink: Locator;

  constructor(page: Page) {
    // Usamos la misma pestana y la navegacion comun de BasePage.
    super(page);

    // La barra superior muestra los cuatro pasos del checkout.
    this.progressSteps = page.locator('#progressBar .step');
    this.stepHeading = page.locator('#stepContent h2');
    this.stepContent = page.locator('#stepContent');

    // Estos campos corresponden a la direccion de envio.
    this.fullNameInput = page.locator('#cNombre');
    this.phoneInput = page.locator('#cTelefono');
    this.streetInput = page.locator('#cCalle');
    this.cityInput = page.locator('#cCiudad');
    this.departmentInput = page.locator('#cDepartamento');
    this.postalCodeInput = page.locator('#cCP');

    // Boton para pasar de direccion a envio.
    this.continueToShippingButton = page.getByRole('button', { name: 'Continuar a Envio' });

    // Busca el texto de envio Express y la opcion que la pagina marca.
    this.expressShippingOption = page.getByText('Envio Express', { exact: true });
    this.selectedShippingOption = page.locator('.shipping-option.selected');
    this.continueToPaymentButton = page.getByRole('button', { name: 'Continuar a Pago' });

    // Busca el texto de pago PSE y la opcion que la pagina marca.
    this.psePaymentOption = page.getByText('PSE - Pago Seguro en Linea', { exact: true });
    this.selectedPaymentOption = page.locator('.payment-option.selected');
    this.continueToReviewButton = page.getByRole('button', { name: 'Continuar a Revision' });

    // Estos elementos aparecen despues de confirmar la compra.
    this.confirmOrderButton = page.getByRole('button', { name: 'Confirmar Pedido' });
    this.successBox = page.locator('.success-box');
    this.orderId = this.successBox.locator('strong');
    this.continueShoppingLink = page.getByRole('link', { name: 'Seguir comprando' });
  }

  // Abre el checkout directamente desde la pagina del carrito.
  async open(): Promise<void> {
    await this.navigate('checkout.html');
  }

  // Completa los datos que la pagina pide en el paso Direccion.
  async fillAddress(customerName = 'Aprendiz QA'): Promise<void> {
    await this.fullNameInput.fill(customerName);
    await this.phoneInput.fill('3001234567');
    await this.streetInput.fill('Calle 10 # 20-30');
    await this.cityInput.fill('Bogota');
    await this.departmentInput.fill('Cundinamarca');
    await this.postalCodeInput.fill('110111');
  }

  // Guarda la direccion y pasa a las opciones de envio.
  async continueToShipping(): Promise<void> {
    await this.continueToShippingButton.click();
  }

  // Selecciona el envio Express.
  async selectExpressShipping(): Promise<void> {
    await this.expressShippingOption.click();
  }

  // Pasa de las opciones de envio a las opciones de pago.
  async continueToPayment(): Promise<void> {
    await this.continueToPaymentButton.click();
  }

  // Selecciona el pago PSE.
  async selectPsePayment(): Promise<void> {
    await this.psePaymentOption.click();
  }

  // Pasa al resumen para revisar la compra antes de confirmar.
  async continueToReview(): Promise<void> {
    await this.continueToReviewButton.click();
  }

  // Confirma el pedido desde el paso Revision.
  async confirmOrder(): Promise<void> {
    await this.confirmOrderButton.click();
  }
}

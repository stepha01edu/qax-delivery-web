import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los elementos que muestran el portafolio.
export class PortfolioPage extends BasePage {
  readonly summaryCards: Locator;
  readonly holdingsTable: Locator;
  readonly holdingHeaders: Locator;
  readonly holdingRows: Locator;
  readonly firstHolding: Locator;
  readonly firstHoldingQuantity: Locator;
  readonly firstHoldingAveragePrice: Locator;
  readonly firstHoldingTotalValue: Locator;
  readonly positivePnl: Locator;
  readonly negativePnl: Locator;
  readonly pieChart: Locator;
  readonly legendDots: Locator;
  readonly emptyState: Locator;
  readonly emptyMessage: Locator;
  readonly emptyStateCta: Locator;

  constructor(page: Page) {
    super(page);

    // Estos elementos muestran el resumen y los activos del usuario.
    this.summaryCards = page.locator('#summaryRow .summary-card');
    this.holdingsTable = page.locator('#holdingsWrap');
    this.holdingHeaders = page.locator('#holdingsWrap th');
    this.holdingRows = page.locator('#holdingsBody tr');
    this.firstHolding = this.holdingRows.first();
    this.firstHoldingQuantity = this.firstHolding.locator('td').nth(1);
    this.firstHoldingAveragePrice = this.firstHolding.locator('td').nth(2);
    this.firstHoldingTotalValue = this.firstHolding.locator('td').nth(4);
    this.positivePnl = page.locator('#holdingsBody .pnl.up');
    this.negativePnl = page.locator('#holdingsBody .pnl.down');

    // Estos elementos muestran el grafico o el mensaje para el portafolio vacio.
    this.pieChart = page.locator('#pieChart');
    this.legendDots = page.locator('#pieLegend .legend-dot');
    this.emptyState = page.locator('#emptyState');
    this.emptyMessage = page.locator('#emptyState p');
    this.emptyStateCta = page.locator('#emptyState a');
  }

  // Abre la pagina del portafolio.
  async open(): Promise<void> {
    await this.navigate('portfolio.html');
  }
}

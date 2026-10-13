import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Esta clase guarda los elementos y las acciones del dashboard.
export class DashboardPage extends BasePage {
  readonly portfolioValue: Locator;
  readonly dailyPnl: Locator;
  readonly cashBalance: Locator;
  readonly watchlistRows: Locator;
  readonly assetSymbols: Locator;
  readonly assetPrices: Locator;
  readonly assetChanges: Locator;
  readonly positiveChanges: Locator;
  readonly negativeChanges: Locator;
  readonly candles: Locator;
  readonly aaplTicker: Locator;
  readonly updateMessage: Locator;

  constructor(page: Page) {
    super(page);

    // Estos valores resumen el estado de la cuenta.
    this.portfolioValue = page.locator('#portValue');
    this.dailyPnl = page.locator('#dailyPnL');
    this.cashBalance = page.locator('#cashBal');

    // Estos localizadores encuentran los precios y sus cambios de color.
    this.watchlistRows = page.locator('#watchlistBody tr');
    this.assetSymbols = page.locator('#watchlistBody td strong');
    this.assetPrices = page.locator('#watchlistBody td.price');
    this.assetChanges = page.locator('#watchlistBody td.change');
    this.positiveChanges = page.locator('#watchlistBody td.change.up');
    this.negativeChanges = page.locator('#watchlistBody td.change.down');

    // Estos elementos muestran las velas y el precio de AAPL en la barra superior.
    this.candles = page.locator('#candleChart .candle');
    this.aaplTicker = page.locator('#tickAAPL');
    this.updateMessage = page.locator('.time-indicator');
  }

  // Abre el dashboard, que tambien carga los datos iniciales de la cuenta.
  async open(): Promise<void> {
    await this.navigate('index.html');
  }
}

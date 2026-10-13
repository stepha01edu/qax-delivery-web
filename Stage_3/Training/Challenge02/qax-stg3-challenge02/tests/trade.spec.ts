import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { OrderPage } from '../pages/OrderPage';
import { PortfolioPage } from '../pages/PortfolioPage';
import { AlertsPage } from '../pages/AlertsPage';

// Los console.log se usaron como guia para seguir el avance en la terminal.
// Despues de revisar la ejecucion, se dejan comentados para estudiar el flujo.

test.describe('HU-01: Dashboard en vivo', () => {
  test.beforeEach(async ({ page }) => {
    // Abrimos el dashboard para cargar los datos iniciales de la cuenta.
    const dashboard = new DashboardPage(page);
    await dashboard.open();
  });

  // Caso 01: revisa los datos principales, los activos y las velas del dashboard.
  test('CP01 -- muestra el resumen, los 10 activos y las 20 velas', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'El dashboard muestra el resumen del portafolio, 10 activos y 20 velas.'
    });

    const dashboard = new DashboardPage(page);

    await test.step('Then se muestra el resumen inicial de la cuenta', async () => {
      // Indicamos que comienza la revision del resumen de cuenta.
      // console.log('CP01: Revisando el resumen de la cuenta.');
      await expect(dashboard.portfolioValue).toBeVisible();
      await expect(dashboard.dailyPnl).toBeVisible();
      await expect(dashboard.cashBalance).toHaveText('$25,000.00');
    });

    await test.step('And la watchlist muestra 10 activos con precio y cambio', async () => {
      // Mostramos que se revisan los activos, precios y cambios.
      // console.log('CP01: Revisando los 10 activos de la watchlist.');
      await expect(dashboard.watchlistRows).toHaveCount(10);
      await expect(dashboard.assetSymbols).toHaveCount(10);
      await expect(dashboard.assetPrices).toHaveCount(10);
      await expect(dashboard.assetChanges).toHaveCount(10);
      await expect(dashboard.watchlistRows.first()).toContainText('BTC');
      await expect(dashboard.watchlistRows.first()).toContainText('$');
      await expect(dashboard.watchlistRows.first()).toContainText('%');
    });

    await test.step('And el grafico muestra 20 velas y avisa que actualiza cada 5 segundos', async () => {
      // Avisamos que se valida el grafico y su aviso de actualizacion.
      // console.log('CP01: Revisando las velas y el aviso de actualizacion.');
      await expect(dashboard.candles).toHaveCount(20);
      await expect(dashboard.updateMessage).toContainText('Actualizando cada 5s');
    });
  });

  // Caso 02: comprueba el color que identifica subidas y bajadas del mercado.
  test('CP02 -- muestra los cambios positivos en verde y los negativos en rojo', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Los cambios positivos del mercado son verdes y los negativos son rojos.'
    });

    const dashboard = new DashboardPage(page);

    await test.step('Then espera a que se muestren cambios positivos y negativos', async () => {
      // Indicamos que se espera ver cambios de los dos tipos.
      // console.log('CP02: Esperando cambios positivos y negativos.');
      await expect(dashboard.positiveChanges).not.toHaveCount(0, { timeout: 10000 });
      await expect(dashboard.negativeChanges).not.toHaveCount(0, { timeout: 10000 });
    });

    await test.step('And revisa el color CSS de cada cambio', async () => {
      // Mostramos que se validan los colores de subida y bajada.
      // console.log('CP02: Revisando los colores de los cambios.');
      await expect(dashboard.positiveChanges.first()).toHaveCSS('color', 'rgb(63, 185, 80)');
      await expect(dashboard.negativeChanges.first()).toHaveCSS('color', 'rgb(248, 81, 73)');
    });
  });

  // Caso 03: espera la actualizacion del precio de AAPL y compara el nuevo valor.
  test('CP03 -- actualiza el precio del ticker cada 5 segundos', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Los precios del dashboard se actualizan cada 5 segundos.'
    });

    const dashboard = new DashboardPage(page);
    const firstPrice = await dashboard.aaplTicker.textContent() || '';

    await test.step('Then el precio de AAPL cambia despues de la actualizacion', async () => {
      // Avisamos que se espera el cambio de precio del ticker.
      // console.log('CP03: Esperando la actualizacion del precio de AAPL.');
      await expect(dashboard.aaplTicker).not.toHaveText(firstPrice, { timeout: 8000 });
    });
  });
});

test.describe('HU-02: Orden de compra', () => {
  test.beforeEach(async ({ page }) => {
    // El dashboard crea el saldo inicial antes de abrir la pagina de ordenes.
    const dashboard = new DashboardPage(page);
    await dashboard.open();
  });

  // Caso 04: revisa los campos de Market y completa una orden para habilitar el boton.
  test('CP04 -- muestra los campos de una orden Market y valida el precio de AAPL', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Una orden Market muestra precio, cantidad y lado, sin campos de precio limite.'
    });

    const order = new OrderPage(page);
    await order.open();

    await test.step('When selecciona AAPL y el tipo Market', async () => {
      // Indicamos que se seleccionan el activo y el tipo de orden.
      // console.log('CP04: Seleccionando AAPL y orden Market.');
      await order.selectAsset('AAPL');
      await order.selectOrderType('market');
    });

    await test.step('Then se muestra el precio actual y los campos de cantidad y lado', async () => {
      // Mostramos que se revisan los campos de la orden Market.
      // console.log('CP04: Revisando precio, cantidad y lado.');
      await expect(order.currentPrice).toContainText('$');
      await expect(order.amountInput).toBeVisible();
      await expect(order.sideSelect).toBeVisible();
      await expect(order.limitFields).toBeHidden();
      await expect(order.stopFields).toBeHidden();
      await expect(order.submitButton).toBeDisabled();
    });

    await test.step('When ingresa una cantidad valida', async () => {
      // Avisamos que se ingresa la cantidad de la orden.
      // console.log('CP04: Ingresando una cantidad valida.');
      await order.fillAmount('1');
    });

    await test.step('Then el boton de confirmar queda habilitado', async () => {
      // Indicamos que se revisa el estado del boton.
      // console.log('CP04: Revisando que el boton quede habilitado.');
      await expect(order.submitButton).toBeEnabled();
    });
  });

  // BUG-002: al abrir Ordenes, el boton aparece habilitado aunque todos los campos esten vacios.
  // Caso 05: queda pendiente porque la pagina no cumple el estado inicial esperado.
  test.fixme('CP05 -- inicia con el boton deshabilitado sin datos', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'El boton de confirmar debe iniciar deshabilitado hasta completar los campos.'
    });

    const order = new OrderPage(page);
    await order.open();

    await test.step('Then el boton aparece deshabilitado al abrir el formulario vacio', async () => {
      await expect(order.submitButton).toBeDisabled();
    });
  });

  // Caso 06: completa cantidad y precio limite para revisar cuando se habilita el boton.
  test('CP06 -- muestra el precio limite y espera todos los datos requeridos', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Una orden Limit necesita activo, cantidad y precio limite antes de enviarse.'
    });

    const order = new OrderPage(page);
    await order.open();

    await test.step('When selecciona AAPL y el tipo Limit', async () => {
      // Mostramos que se seleccionan AAPL y una orden Limit.
      // console.log('CP06: Seleccionando AAPL y orden Limit.');
      await order.selectAsset('AAPL');
      await order.selectOrderType('limit');
    });

    await test.step('Then aparece el precio limite y el boton sigue deshabilitado', async () => {
      // Indicamos que se revisa el campo limite y el estado del boton.
      // console.log('CP06: Revisando el campo de precio limite.');
      await expect(order.limitFields).toBeVisible();
      await expect(order.limitPriceInput).toBeVisible();
      await expect(order.submitButton).toBeDisabled();
    });

    await test.step('When completa la cantidad pero deja el precio vacio', async () => {
      // Avisamos que se deja incompleto el precio para revisar la validacion.
      // console.log('CP06: Ingresando cantidad y dejando vacio el precio limite.');
      await order.fillAmount('1');
      await expect(order.submitButton).toBeDisabled();
    });

    await test.step('Then al completar el precio limite el boton queda habilitado', async () => {
      // Mostramos que se completa el precio y se revisa el boton.
      // console.log('CP06: Completando el precio limite.');
      await order.fillLimitPrice('180');
      await expect(order.submitButton).toBeEnabled();
    });
  });

  // Caso 07: confirma dos compras y revisa sus IDs, el saldo y la cantidad de AAPL.
  test('CP07 -- confirma la compra, crea IDs distintos y actualiza el saldo', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Una compra confirma una orden con ID unico, descuenta efectivo y actualiza AAPL.'
    });

    const dashboard = new DashboardPage(page);
    const order = new OrderPage(page);
    const portfolio = new PortfolioPage(page);
    await order.open();

    await test.step('When crea la primera orden Market de AAPL', async () => {
      // Indicamos que comienza la primera compra de AAPL.
      // console.log('CP07: Creando la primera orden Market de AAPL.');
      await order.selectAsset('AAPL');
      await order.selectOrderType('market');
      await order.fillAmount('1');
      await order.submitOrder();
    });

    await test.step('Then el modal confirma la orden con el formato solicitado', async () => {
      // Mostramos que se revisa el modal y el ID generado.
      // console.log('CP07: Revisando la confirmacion y el ID de la orden.');
      await expect(order.confirmationModal).toBeVisible();
      await expect(order.orderId).toHaveText(/^ORD-\d{13}$/);
      await expect(order.orderDetails).toContainText('BUY 1 AAPL');
    });

    const firstOrderId = await order.orderId.textContent();

    await test.step('When crea otra orden despues de volver al dashboard', async () => {
      // Avisamos que se regresa al dashboard para crear otra orden.
      // console.log('CP07: Volviendo al dashboard y creando otra orden.');
      await order.closeConfirmation();
      await dashboard.open();
      await order.open();
      await order.selectAsset('AAPL');
      await order.selectOrderType('market');
      await order.fillAmount('1');
      await order.submitOrder();
    });

    await test.step('Then la segunda orden tiene otro ID', async () => {
      // Indicamos que se compara el segundo ID con el primero.
      // console.log('CP07: Comparando los IDs de las dos ordenes.');
      await expect(order.orderId).toHaveText(/^ORD-\d{13}$/);
      const secondOrderId = await order.orderId.textContent();
      expect(secondOrderId).not.toBe(firstOrderId);
    });

    await test.step('And el saldo bajo y la cantidad de AAPL aumento', async () => {
      // Mostramos que se revisan el saldo y la posicion de AAPL.
      // console.log('CP07: Revisando el saldo y la cantidad de AAPL.');
      await dashboard.open();
      await expect(dashboard.cashBalance).not.toHaveText('$25,000.00');
      await portfolio.open();
      await expect(portfolio.firstHolding).toContainText('AAPL');
      await expect(portfolio.firstHoldingQuantity).toHaveText('12');
    });
  });
});

test.describe('HU-03: Portafolio y P&L', () => {
  test.beforeEach(async ({ page }) => {
    // Abrimos portafolio directamente para que tambien podamos revisar el estado vacio.
    const portfolio = new PortfolioPage(page);
    await portfolio.open();
  });

  // Caso 08: revisa los activos del portafolio, sus colores de P&L y el grafico.
  test('CP08 -- muestra holdings, P&L en verde y rojo, y el grafico pie', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'El portafolio muestra cantidades, valores, P&L por color y segmentos del grafico.'
    });

    const dashboard = new DashboardPage(page);
    const order = new OrderPage(page);
    const portfolio = new PortfolioPage(page);

    await test.step('Given que prepara una compra con precio limite alto', async () => {
      // Indicamos que se prepara una compra para ver P&L positivo y negativo.
      // console.log('CP08: Preparando una compra con precio limite alto.');
      // El precio alto deja AAPL con perdida y los otros activos conservan ganancias.
      await dashboard.open();
      await order.open();
      await order.selectAsset('AAPL');
      await order.selectOrderType('limit');
      await order.fillAmount('1');
      await order.fillLimitPrice('300');
      await order.submitOrder();
      await expect(order.confirmationModal).toBeVisible();
      await portfolio.open();
    });

    await test.step('Then la tabla muestra las columnas y los datos de AAPL', async () => {
      // Mostramos que se revisan las columnas y los datos de AAPL.
      // console.log('CP08: Revisando los datos de la tabla de holdings.');
      await expect(portfolio.summaryCards).toHaveCount(4);
      await expect(portfolio.holdingHeaders).toHaveCount(6);
      await expect(portfolio.holdingRows).toHaveCount(5);
      await expect(portfolio.firstHolding).toContainText('AAPL');
      await expect(portfolio.firstHoldingQuantity).toHaveText('11');
      await expect(portfolio.firstHoldingAveragePrice).toContainText('$');
      await expect(portfolio.firstHoldingTotalValue).toContainText('$');
    });

    await test.step('And el P&L positivo es verde y el negativo es rojo', async () => {
      // Avisamos que se validan los colores de las ganancias y perdidas.
      // console.log('CP08: Revisando los colores del P&L.');
      await expect(portfolio.positivePnl).not.toHaveCount(0);
      await expect(portfolio.negativePnl).not.toHaveCount(0);
      await expect(portfolio.positivePnl.first()).toHaveCSS('color', 'rgb(63, 185, 80)');
      await expect(portfolio.negativePnl.first()).toHaveCSS('color', 'rgb(248, 81, 73)');
    });

    await test.step('And el grafico pie muestra colores diferentes', async () => {
      // Indicamos que se revisa el grafico y los colores de su leyenda.
      // console.log('CP08: Revisando el grafico pie y sus colores.');
      await expect(portfolio.pieChart).toBeVisible();
      await expect(portfolio.pieChart).toHaveCSS('background-image', /conic-gradient/);
      await expect(portfolio.legendDots.first()).toHaveCSS('background-color', 'rgb(247, 129, 102)');
      await expect(portfolio.legendDots.nth(1)).toHaveCSS('background-color', 'rgb(88, 166, 255)');
    });
  });

  // Caso 09: comprueba el mensaje y los elementos ocultos cuando no hay activos.
  test('CP09 -- muestra el estado vacio cuando no hay holdings', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Un portafolio sin activos muestra un mensaje de estado vacio.'
    });

    const portfolio = new PortfolioPage(page);

    await test.step('Then muestra el mensaje y oculta la tabla y el grafico', async () => {
      // Mostramos que se revisa el estado vacio del portafolio.
      // console.log('CP09: Revisando el estado vacio del portafolio.');
      await expect(portfolio.emptyMessage).toHaveText('No tienes posiciones abiertas');
      await expect(portfolio.holdingsTable).toBeHidden();
      await expect(portfolio.pieChart).toBeHidden();
    });
  });

  // BUG-001: el CTA del estado vacio lleva a Ordenes y el requisito pide volver al Dashboard.
  // Caso 10: queda pendiente porque el enlace de la pagina lleva a un destino incorrecto.
  test.fixme('CP10 -- el CTA del estado vacio dirige al dashboard', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'El CTA del portafolio vacio debe llevar al dashboard.'
    });

    const portfolio = new PortfolioPage(page);

    await test.step('Then el enlace del estado vacio abre Dashboard', async () => {
      await expect(portfolio.emptyStateCta).toHaveAttribute('href', 'index.html');
    });
  });
});

test.describe('HU-04: Alertas de precio', () => {
  test.beforeEach(async ({ page }) => {
    // Abrimos alertas sin crear datos para empezar con la lista vacia.
    const alerts = new AlertsPage(page);
    await alerts.open();
  });

  // Caso 11: crea una alerta de BTC, revisa su estado y luego la elimina.
  test('CP11 -- crea, desactiva y elimina una alerta de BTC', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'La alerta se puede crear, apagar, revisar visualmente y eliminar de la lista.'
    });

    const alerts = new AlertsPage(page);

    await test.step('When crea una alerta de BTC por encima de 70000', async () => {
      // Indicamos que comienza la creacion de la alerta.
      // console.log('CP11: Creando una alerta de BTC.');
      await alerts.fillAlert('BTC', 'above', '70000');
      await alerts.createAlert();
    });

    await test.step('Then la alerta aparece activa en la lista', async () => {
      // Mostramos que se revisa la alerta recien creada.
      // console.log('CP11: Revisando que la alerta este activa.');
      await expect(alerts.alertItems).toHaveCount(1);
      await expect(alerts.alertItems.first()).toContainText('BTC Por encima de $70000.00');
      await expect(alerts.toggleButtons.first()).toHaveText('ON');
    });

    await test.step('When apaga la alerta', async () => {
      // Avisamos que se cambia el estado de la alerta.
      // console.log('CP11: Desactivando la alerta.');
      await alerts.toggleFirstAlert();
    });

    await test.step('Then se muestra apagada con opacidad reducida y fondo gris', async () => {
      // Indicamos que se revisa el aspecto de la alerta apagada.
      // console.log('CP11: Revisando el estado visual de la alerta apagada.');
      await expect(alerts.alertItems.first()).toHaveClass(/inactive/);
      await expect(alerts.alertItems.first()).toHaveCSS('opacity', '0.5');
      await expect(alerts.alertItems.first()).toHaveCSS('background-color', 'rgb(22, 27, 34)');
      await expect(alerts.toggleButtons.first()).toHaveText('OFF');
    });

    await test.step('When elimina la alerta', async () => {
      // Mostramos que se elimina la alerta de la lista.
      // console.log('CP11: Eliminando la alerta.');
      await alerts.deleteFirstAlert();
    });

    await test.step('Then la lista queda en cero y aparece el mensaje vacio', async () => {
      // Avisamos que se comprueba que ya no queden alertas.
      // console.log('CP11: Revisando que la lista de alertas quede vacia.');
      await expect(alerts.alertItems).toHaveCount(0);
      await expect(alerts.emptyMessage).toBeVisible();
    });
  });
});

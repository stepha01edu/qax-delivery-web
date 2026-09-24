// Importamos test para escribir los casos y expect para validar los resultados.
import { test, expect } from '@playwright/test';

// Guardamos las direcciones de las paginas que se usan en las pruebas.
// Tenerlas en constantes evita repetir la misma URL varias veces.
const BET_URL = 'https://qaxpert.com/lab/sites/stage-2/bet/index.html';
const WALLET_URL = 'https://qaxpert.com/lab/sites/stage-2/bet/wallet.html';
const HISTORY_URL = 'https://qaxpert.com/lab/sites/stage-2/bet/history.html';

// Estos casos pertenecen al Challenge 1.
// El flujo original del Exercise 1 esta en bet-flow.spec.ts.
test.describe('Challenge 1: Extender el flujo de apuestas', () => {

  // HU-01: el sistema protege al apostador cuando el monto supera su saldo.
  test('HU-01 bloquea una apuesta mayor al saldo disponible', async ({ page }) => {
    // En este paso dejamos un evento seleccionado para poder probar el monto.
    await test.step('Given que el usuario tiene un evento seleccionado', async () => {
      // Abrimos la pagina donde se muestran los partidos disponibles.
      await page.goto(BET_URL);

      // Buscamos la primera tarjeta y hacemos clic en la primera cuota.
      // first() toma el primer elemento que encontro Playwright.
      await page.locator('.event-card').first().locator('.odd-btn').first().click();

      // Este boton guarda la seleccion y abre la pagina Mi Ticket.
      await page.getByRole('button', { name: 'Ir a Apostar' }).click();
    });

    // Se ingresa un monto mayor al saldo inicial de COP 500000.
    await test.step('When ingresa un monto mayor al saldo', async () => {
      // El id del campo comienza con amount-, por eso usamos un selector por inicio de texto.
      await page.locator('[id^="amount-"]').first().fill('600000');
    });

    // La aplicacion debe impedir que el usuario continue con una apuesta mayor a su saldo.
    await test.step('Then el sistema bloquea la apuesta y muestra el excedente', async () => {
      // Validamos que el boton no se pueda presionar.
      await expect(page.getByRole('button', { name: 'Realizar Apuesta' })).toBeDisabled();

      // El signo menos muestra que el monto supera el saldo disponible.
      await expect(page.locator('#balanceAfter')).toContainText('-');
    });
  });

  // HU-02: el usuario puede agregar fondos usando un monto predefinido.
  test('HU-02 recarga la billetera con un monto predefinido', async ({ page }) => {
    // Primero revisamos el saldo que tiene la billetera antes de la recarga.
    await test.step('Given que el usuario abre su billetera', async () => {
      await page.goto(WALLET_URL);

      // El saldo inicial esperado para las pruebas es COP 500000.
      await expect(page.locator('#balanceDisplay')).toHaveText('COP 500.000');
    });

    // Seleccionamos uno de los botones con montos disponibles para recargar.
    await test.step('When selecciona y agrega COP 100000', async () => {
      // Buscamos el boton por el texto visible del monto.
      const preset = page.getByRole('button', { name: '$100.000' });

      // Hacemos clic y confirmamos que el monto se marque como activo.
      await preset.click();
      await expect(preset).toHaveClass(/active/);

      // Presionamos el boton que realiza la recarga.
      await page.getByRole('button', { name: 'Agregar Fondos a mi Billetera' }).click();
    });

    // Comprobamos que el saldo anterior mas la recarga sea el nuevo saldo.
    await test.step('Then el saldo muestra la suma de los fondos', async () => {
      await expect(page.locator('#balanceDisplay')).toHaveText('COP 600.000');

      // Este mensaje confirma visualmente que la recarga termino.
      await expect(page.locator('#successMsg')).toBeVisible();
    });
  });

  // HU-03: el usuario puede cancelar antes de confirmar la apuesta.
  test('HU-03 cancela la apuesta sin registrar cambios', async ({ page }) => {
    // Preparamos una apuesta para llegar al modal de confirmacion.
    await test.step('Given que el usuario tiene un monto listo para confirmar', async () => {
      await page.goto(BET_URL);
      await page.locator('.event-card').first().locator('.odd-btn').first().click();

      // Usamos el boton Ir a Apostar porque este guarda el evento seleccionado.
      await page.getByRole('button', { name: 'Ir a Apostar' }).click();

      // Llenamos el monto con un valor permitido para la prueba.
      await page.locator('[id^="amount-"]').first().fill('50000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();

      // Antes de cancelar confirmamos que el modal se haya abierto.
      await expect(page.locator('#confirmModal')).toBeVisible();
    });

    // Cancelamos la operacion desde el modal, antes de confirmar la apuesta.
    await test.step('When cancela la apuesta desde el modal', async () => {
      await page.locator('#confirmModal').getByRole('button', { name: 'Cancelar' }).click();
    });

    // Revisamos que la cancelacion no haya cambiado el saldo ni creado un registro.
    await test.step('Then el saldo no cambia y la apuesta no aparece en historial', async () => {
      // El modal debe desaparecer despues de hacer clic en Cancelar.
      await expect(page.locator('#confirmModal')).not.toBeVisible();

      // Vamos a la billetera para revisar que el saldo siga igual.
      await page.getByRole('link', { name: 'Billetera' }).click();
      await expect(page.locator('#balanceDisplay')).toHaveText('COP 500.000');

      // Vamos al historial para comprobar que la apuesta cancelada no aparezca.
      await page.getByRole('link', { name: 'Historial' }).click();
      await expect(page.locator('#historyBody .empty')).toContainText('No se encontraron apuestas');
    });
  });

  // HU-04: los filtros permiten consultar las apuestas registradas.
  test('HU-04 filtra, ordena y busca en el historial', async ({ page }) => {
    // Creamos dos apuestas para tener datos que se puedan comparar en el historial.
    await test.step('Given que existen dos apuestas en el historial', async () => {
      await page.goto(BET_URL);
      await page.locator('.event-card').nth(0).locator('.odd-btn').first().click();

      // Guardamos la primera seleccion antes de abrir Mi Ticket.
      await page.getByRole('button', { name: 'Ir a Apostar' }).click();
      await page.locator('[id^="amount-"]').first().fill('50000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();

      // Confirmamos la primera apuesta para que aparezca en el historial.
      await page.locator('#confirmModal').getByRole('button', { name: /Confirmar Apuesta/ }).click();

      // Repetimos el flujo con otro evento y un monto diferente.
      await page.goto(BET_URL);
      await page.locator('.event-card').nth(1).locator('.odd-btn').first().click();
      await page.getByRole('button', { name: 'Ir a Apostar' }).click();
      await page.locator('[id^="amount-"]').first().fill('100000');
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();

      // Confirmamos la segunda apuesta para comparar los dos registros.
      await page.locator('#confirmModal').getByRole('button', { name: /Confirmar Apuesta/ }).click();
    });

    // Primero se consulta el estado Pendiente.
    await test.step('When filtra por estado Pendiente', async () => {
      await page.goto(HISTORY_URL);
      await page.locator('#filterStatus').selectOption('Pendiente');

      // Las dos apuestas creadas deben conservar el estado Pendiente.
      await expect(page.locator('#historyBody .status')).toHaveCount(2);
    });

    // Luego se ordenan los registros desde el monto mas alto al mas bajo.
    await test.step('And ordena por mayor monto', async () => {
      const rows = page.locator('#historyBody tr');
      await page.locator('#filterSort').selectOption('monto-desc');

      // La apuesta de COP 100000 debe quedar en la primera fila.
      await expect(rows.first()).toContainText('COP 100.');
    });

    // Finalmente se busca una apuesta usando el nombre de un equipo.
    await test.step('And busca por nombre de equipo', async () => {
      const rows = page.locator('#historyBody tr');
      await page.locator('#filterSearch').fill('Atlético Nacional');

      // Solo debe quedar la fila que coincide con el equipo buscado.
      await expect(rows).toHaveCount(1);
      await expect(rows.first()).toContainText('Atlético Nacional');
    });
  });

  // HU-05: el usuario agrega el evento arrastrandolo al ticket.
  test('HU-05 agrega un evento usando drag and drop', async ({ page }) => {
    // Abrimos la pagina donde estan las tarjetas de eventos.
    await test.step('Given que el usuario abre el catalogo de eventos', async () => {
      await page.goto(BET_URL);
    });

    // Tomamos la primera tarjeta y el ticket que recibe el evento.
    await test.step('When arrastra un evento hasta el ticket lateral', async () => {
      const evento = page.locator('.event-card').first();
      const ticket = page.locator('#ticketSidebar');

      // dragTo simula arrastrar la tarjeta hasta el area del ticket.
      await evento.dragTo(ticket);
    });

    // Confirmamos que el arrastre haya creado la seleccion y actualizado las odds.
    await test.step('Then el evento y sus odds aparecen en el ticket', async () => {
      const ticket = page.locator('#ticketSidebar');

      // Debe existir un item dentro del ticket lateral.
      await expect(ticket.locator('.ticket-item')).toHaveCount(1);

      // La cuota del evento debe estar visible.
      await expect(ticket.locator('.ticket-item .pick-odd')).toBeVisible();

      // Las odds combinadas deben tener un valor diferente de cero.
      await expect(page.locator('#combinedOdds')).not.toHaveText('0.00');
    });
  });
});

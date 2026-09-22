// Importamos test para escribir el caso y expect para validar los resultados.
import { test, expect } from '@playwright/test';

// Agrupamos todos los pasos que pertenecen al flujo de apuestas.
test.describe('Feature: Realizar apuesta en QAXpert Bet', () => {

  // Este caso representa el recorrido de un usuario que realiza una apuesta.
  test('Apostar en un partido de fútbol', async ({ page }) => {

    // Cada test.step separa una parte del caso para que sea facil leer el reporte.
    await test.step('Given que el usuario abre la página de eventos', async () => {
      // Abrimos la pagina inicial de los eventos.
      await page.goto('https://qaxpert.com/lab/sites/stage-2/bet/index.html');

      // Confirmamos que la pagina cargo mostrando el titulo principal.
      await expect(page.getByRole('heading', { name: 'Eventos en Vivo' })).toBeVisible();
    });

    // Seleccionamos una cuota dentro del primer evento de la lista.
    await test.step('When hace clic en la cuota Local del primer partido', async () => {
      // Buscamos la primera tarjeta de evento usando la clase vista en Inspect.
      const firstEvent = page.locator('.event-card').first();

      // Dentro de esa tarjeta hacemos clic en la primera cuota disponible.
      await firstEvent.locator('.odd-btn').first().click();

      // Confirmamos que la seleccion aparezca en el ticket lateral.
      await expect(page.locator('#ticketSidebar .ticket-item')).toBeVisible();
    });

    // Abrimos la pagina donde se revisa la apuesta seleccionada.
    await test.step('And navega a Mi Ticket', async () => {
      // Este boton guarda la seleccion antes de abrir la pagina del ticket.
      await page.getByRole('button', { name: 'Ir a Apostar' }).click();

      // Confirmamos que la URL corresponda a la pagina del ticket.
      await expect(page).toHaveURL(/ticket\.html/);
    });

    // Escribimos el monto y enviamos la apuesta.
    await test.step('When ingresa monto y hace clic en Realizar Apuesta', async () => {
      // El id del monto comienza con amount-, pero termina con un valor variable.
      await page.locator('[id^="amount-"]').first().fill('50000');

      // Hacemos clic en el boton que envia la apuesta.
      await page.getByRole('button', { name: 'Realizar Apuesta' }).click();
    });

    // Confirmamos la apuesta desde la ventana modal.
    await test.step('Then confirma la apuesta en el modal', async () => {
      // Localizamos el modal usando el id que aparece en la pagina.
      const modal = page.locator('#confirmModal');

      // Verificamos que el modal se muestre antes de interactuar con el.
      await expect(modal).toBeVisible();

      // Buscamos el boton Confirmar sin importar si usa mayusculas o minusculas.
      await modal.getByRole('button', { name: /confirmar/i }).click();
    });

    // Validamos que la pagina muestre el resultado exitoso.
    await test.step('Then el modal de éxito se muestra', async () => {
      // El modal de exito aparece despues de confirmar la apuesta.
      await expect(page.locator('#successModal')).toBeVisible();

      // Cerramos el modal para terminar el flujo.
      await page.locator('#successModal').getByRole('button').click();
    });

  });

});

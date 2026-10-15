import { test } from '@playwright/test';
import { generateRandomEmail, generateRandomName } from '../utils/user-data';

// Este caso queda pendiente hasta que se grabe el recorrido real con Codegen, actualemnte esta generando la validacion de humano y no me permite avanzar, se car4ga evidencia del error en la carpeta evidencias y queda apuntado en el readme.
test.fixme('Buscar un producto y avanzar hasta la pantalla de pagos', async ({ page }) => {
  const userName = generateRandomName();
  const userEmail = generateRandomEmail();

  // Despues de grabar el flujo, se usaran estos datos si el formulario los solicita.
  console.log(userName, userEmail);

  // Aqui se pegara el codigo que genere Codegen durante el recorrido manual.
  await page.goto('https://mercadolibre.com');
});

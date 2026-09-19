import { test, expect } from '@playwright/test';

// Este bloque agrupa las pruebas de login de QAX Clinic.
test.describe('Feature: Login en QAX Clinic', () => {

    test('Scenario: Iniciar sesion y acceder al formulario de cita', async ({ page }) => {

        // Primero se abre la pagina y se valida que cargue correctamente.
        await test.step('Given que el paciente abre la pagina de login de QAX Clinic', async () => {
            await page.goto('https://qaxpert.com/lab/sites/stage-1/clinic/index.html');
            await expect(page).toHaveTitle('QAX Clinic — Ingreso Pacientes');
        });

        // Se escriben letras y numeros para comprobar que solo queden numeros.
        await test.step('And el campo de documento solo acepta numeros', async () => {
            const documento = page.locator('#documento');

            await documento.fill('abc1234567890');
            await expect(documento).toHaveValue('1234567890');
        });

        // Se ingresan las credenciales demo entregadas para este ejercicio.
        await test.step('When ingresa el documento y la contrasena', async () => {
            await page.locator('#documento').fill('1234567890');
            await page.locator('#password').fill('paciente123');
        });

        await test.step('And hace clic en el boton Ingresar', async () => {
            await page.getByRole('button', { name: 'Ingresar' }).click();
        });

        await test.step('Then el sistema redirige a la pagina de reserva de cita', async () => {
            await expect(page).toHaveURL(/appointment\.html/);
        });

        // Estos id estan en ingles en el HTML de la pagina, los nombres que ve el user aparecen en espanol pero los .
        await test.step('And muestra el formulario de reserva de cita', async () => {
            await expect(page.getByRole('heading', { name: /Reservar Cita/ })).toBeVisible();
            await expect(page.locator('#facility')).toBeVisible(); // centro medico
            await expect(page.locator('#program')).toBeVisible(); // programa de salud
            await expect(page.locator('#visitDate')).toBeVisible(); // fecha de visita
            await expect(page.locator('#comments')).toBeVisible(); // comentarios
        });

    });

});

import { test, expect } from '@playwright/test';
import { ApplyPage } from '../pages/ApplyPage';

test.describe('Feature: Registro en PayLater', () => {

  test('Validar campos requeridos con errores visuales', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'El email debe contener @ y el ingreso mínimo es $500,000 COP'
    });

    const apply = new ApplyPage(page);

    await test.step('Given que el usuario abre el registro', async () => {
      await apply.navigate('/apply-step1.html');
      await apply.verifyTitle('PayLater - Paso 1: Datos Personales');
    });

    await test.step('When ingresa un email inválido y un ingreso bajo', async () => {
      await apply.fillEmail('correo_sin_arroba');
      await apply.fillIngreso('100000');
    });

    await test.step('Then el campo email muestra borde rojo y mensaje de error', async () => {
      await apply.verifyCssValue(
        apply.emailInput,
        'border-color',
        'rgb(239, 68, 68)',
        'El borde debe ser rojo (email inválido)'
      );
      await apply.verifyElementVisible(apply.emailError, 'El mensaje de error de email debe estar visible');
    });

    await test.step('And el campo ingreso muestra error por ser menor a $500,000', async () => {
      await apply.verifyCssValue(
        apply.ingresoInput,
        'border-color',
        'rgb(239, 68, 68)',
        'El borde debe ser rojo (ingreso insuficiente)'
      );
      await apply.verifyToContainText(apply.ingresoError, '500', 'Debe indicar el monto mínimo de $500,000');
    });

    await test.step('And el botón de continuar está deshabilitado', async () => {
      await apply.verifyElementDisabled(apply.btnSubmit, 'El botón debe estar deshabilitado mientras haya errores');
    });
  });

  test('Anotación: campos válidos habilitan el botón', async ({ page }) => {
    test.info().annotations.push({
      type: 'business-rule',
      description: 'Todos los campos requeridos deben ser válidos para habilitar el botón'
    });

    const apply = new ApplyPage(page);

    await apply.navigate('/apply-step1.html');
    await apply.fillEmail('juan@email.com');
    await apply.fillIngreso('2500000');

    await apply.verifyElementEnabled(apply.btnSubmit, 'El botón debe habilitarse con datos válidos');
  });

});

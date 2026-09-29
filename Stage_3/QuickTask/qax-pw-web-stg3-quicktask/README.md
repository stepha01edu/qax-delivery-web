# Quick Task - Aserciones y anotaciones en formularios

Este proyecto practica aserciones de Playwright con el formulario de solicitud
de QAX PayLater. Los casos estan escritos primero en Gherkin y luego llevados
a pruebas pequenas.

## Que se revisa

- El titulo y la carga del formulario.
- El estado del boton principal.
- Los valores de los campos despues de editarlos.
- El campo numerico de ingreso mensual.
- La confirmacion al enviar datos validos.
- Los campos vacios y su borde de error. Este caso queda omitido por ahora.

## Casos de prueba

Los casos estan documentados en `docs/cases.md` y las pruebas automatizadas en
`tests/paylater-form.spec.ts`.

## Evidencias

- [Casos de prueba en Gherkin](docs/cases.md).
- [Captura del reporte HTML](evidence/reporte-html.png).


Cada prueba agrega una anotacion para indicar si es `happy-path`, `negative`,
`validation` o `visual`. En las comprobaciones que esperan una respuesta de la
pagina se usan aserciones que vuelven a revisar el resultado. Para el titulo,
se lee el valor una vez porque es una comprobacion estatica. El envio valido
usa `expect.soft` para comprobar varios resultados sin detenerse en el primero.

## Issues encontrados en la pagina

### ISSUE-01 - El titulo no contiene el nombre solicitado

- **Caso relacionado:** CP01.
- **Esperado:** el titulo contiene `QAX PayLater`.
- **Actual:** el titulo muestra `PayLater - Paso 1: Datos Personales`.
- **Impacto:** CP01 detecta la diferencia y queda omitido para que la ejecucion
  no falle por este comportamiento.
- **Estado:** pendiente de revisar con el mentor.

### ISSUE-02 - El boton aparece habilitado con los campos vacios

- **Casos relacionados:** CP02 y CP03.
- **Esperado:** el boton empieza deshabilitado y se habilita al completar los
  campos obligatorios.
- **Actual:** `Continuar a Verificacion` aparece habilitado desde que abre el
  formulario.
- **Impacto:** CP02 queda omitido para que la ejecucion no falle por este
  comportamiento. CP03 comprueba que sigue habilitado despues de llenar los
  campos, pero no puede demostrar que cambio de estado.
- **Estado:** pendiente de revisar con el mentor.

### ISSUE-03 - El mensaje de confirmacion no permanece en pantalla

- **Caso relacionado:** CP07.
- **Esperado:** despues de enviar el formulario, el mensaje permanece visible.
- **Actual:** el mensaje aparece y la pagina avanza al paso de verificacion;
  al cambiar de pagina, el mensaje deja de verse.
- **Impacto:** CP07 comprueba el texto del mensaje y el avance al siguiente
  paso, pero no puede comprobar que el mensaje permanezca visible.
- **Estado:** pendiente de revisar con el mentor.

El caso CP08 de envio vacio queda con `test.skip`, como indica el ejercicio,
porque requiere un mock que aun no esta construido. Por eso no se registra como
un comportamiento comprobado en esta ejecucion.

## Requisitos

- Node.js 18 o superior.
- pnpm.
- Playwright.

## Instalacion

Desde esta carpeta ejecutar:

```bash
pnpm install
pnpm exec playwright install chromium
```

## Ejecutar las pruebas

Ejecutar todos los casos:

```bash
pnpm test
```

Ver el navegador mientras corre la prueba:

```bash
pnpm test:headed
```

Abrir el reporte HTML:

```bash
pnpm report
```

Los casos CP01, CP02 y CP08 aparecen como omitidos en el reporte porque tienen
`test.skip`.

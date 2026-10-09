# QAXTrade - Challenge 2

Este proyecto contiene pruebas para el dashboard, las ordenes de compra, el portafolio y las alertas de precio de QAXTrade.

## Que tiene el proyecto

- `pages/BasePage.ts`: comparte la navegacion entre paginas.
- `pages/DashboardPage.ts`: localizadores del resumen, la watchlist y el grafico de velas.
- `pages/OrderPage.ts`: campos para elegir activo, tipo de orden y cantidad.
- `pages/PortfolioPage.ts`: localizadores de holdings, P&L, grafico y estado vacio.
- `pages/AlertsPage.ts`: campos para crear, apagar y eliminar alertas.
- `tests/trade.spec.ts`: pruebas separadas por historia de usuario.
- `docs/cases.md`: casos de prueba escritos en Gherkin.

En cada Page Object deje los localizadores en el constructor y las acciones en metodos. En las pruebas uso `test.describe`, `test.beforeEach`, `test.step`, anotaciones y `expect` para revisar los resultados.

## Requisitos

- Node.js 18 o superior
- pnpm
- Playwright

## Instalacion

Desde esta carpeta, ejecuta:

```bash
pnpm install
pnpm exec playwright install chromium
```

## Ejecucion

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar las pruebas mostrando el navegador:

```bash
pnpm test:headed
```

Revisar los tipos de TypeScript:

```bash
pnpm typecheck
```

Abrir el reporte HTML despues de una ejecucion:

```bash
pnpm report
```

La configuracion usa un worker para que las pruebas se ejecuten una por una.

## Diferencias encontradas en la pagina

- `BUG-001`: el estado vacio del portafolio ofrece un enlace a Ordenes, aunque el requisito pide volver al Dashboard. El caso `CP10` queda en `fixme` hasta que se ajuste la pagina.
- `BUG-002`: al abrir Ordenes, el boton de confirmar aparece habilitado aunque los campos esten vacios. El caso `CP05` queda en `fixme`; despues de seleccionar el activo y el tipo, la validacion de campos incompletos si funciona.
- En Alertas no hay un contador numerico separado. `CP11` comprueba que la lista pasa de una alerta a ninguna al eliminarla.

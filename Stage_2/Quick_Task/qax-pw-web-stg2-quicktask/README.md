# Quick Task - Localizadores y acciones avanzadas

Este proyecto es una practica para conocer mas localizadores y
acciones de Playwright.

La idea es trabajar cada tema en un archivo separado, con pruebas pequeñas y
faciles de entender.

## Temas practicados

- Localizadores para un flujo de compra.
- Shadow DOM.
- IFrame.
- Alert, confirm, prompt y modal.
- Click forzado.
- Mouse over.
- Click derecho.
- Doble click.
- Dropdown.
- Drag and drop.
- Teclado.
- Scroll.
- Manejo de pestanas.
- Download / Upload. La URL entregada solo permite descargar archivos.

## Archivos de localizadores

- `locators-compra.md`: localizadores basicos para revisar una compra en
  Online Shop.
- `shadow-iframe-popup.md`: localizadores para Shadow DOM, IFrame y popup.

## Pruebas

Cada accion practicada tiene su propio archivo dentro de `tests/`. El tema de
Shadow DOM queda documentado en `shadow-iframe-popup.md` porque esta actividad
solo pide listar sus localizadores:

```text
tests/
├── click-forzado.spec.ts
├── mouse-over.spec.ts
├── dropdown-actions.spec.ts
├── drag-and-drop.spec.ts
├── upload-file.spec.ts
├── keyboard.spec.ts
├── scroll.spec.ts
├── dialog-boxes.spec.ts
├── tabs.spec.ts
└── iframe.spec.ts
```

## Nota sobre archivos

La URL entregada para este punto es `download.html`. Al revisarla con Inspect
se encontraron enlaces para descargar archivos, pero no un campo
`input type="file"` para subirlos.

Por eso `upload-file.spec.ts` queda marcado con `test.fixme` y deja documentada
la diferencia. El caso no se ejecuta hasta confirmar la URL correcta. No se
invento un elemento que la pagina no tiene.
Para practicar la subida se necesita una URL que incluya un `input type="file"`.

## Bug conocido

### BUG-1: La pagina indicada no permite subir archivos

- **Pagina:** `https://bonigarcia.dev/selenium-webdriver-java/download.html`
- **Esperado:** encontrar un campo `input type="file"` para subir un archivo.
- **Actual:** la pagina solo muestra enlaces para descargar archivos.
- **Estado:** el caso queda marcado con `test.fixme` en
  `tests/upload-file.spec.ts`.
- **Siguiente paso:** revisar con el mentor si la URL entregada es correcta o
  si se debe usar otra pagina de practica.

## Requisitos

- Node.js 18 o superior.
- pnpm.
- Playwright.
- Google Chrome o Chromium.

## Instalacion

Desde esta carpeta ejecutar:

```bash
pnpm install
npx playwright install chromium
```

## Ejecutar las pruebas

Ejecutar todos los archivos:

```bash
pnpm test
```

Ejecutar un archivo especifico:

```bash
pnpm exec playwright test tests/keyboard.spec.ts
```

Ver el navegador durante la prueba:

```bash
pnpm test:headed
```

Abrir Playwright en modo de depuracion:

```bash
pnpm test:debug
```

Abrir el reporte HTML:

```bash
pnpm report
```

## Estructura

```text
qax-pw-web-stg2-quicktask/
├── .gitignore
├── tests/
├── locators-compra.md
├── shadow-iframe-popup.md
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

El archivo `pnpm-lock.yaml` se crea al ejecutar `pnpm install`.

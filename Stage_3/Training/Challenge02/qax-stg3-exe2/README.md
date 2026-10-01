# Exercise 2 — Aserciones visuales y anotaciones con PayLater

Proyecto de referencia para el **Exercise 2** del Training 3 de Stage 3.

Valida estados visuales (colores, disabled, mensajes de error) sobre **PayLater**, una plataforma de crédito BNPL.

## 🎯 Qué aprenderás

- Validar **colores CSS** de elementos (verde = éxito, rojo = error)
- Validar **estados visuales** (deshabilitado, seleccionado, visible/oculto)
- Validar **mensajes de error** dinámicos
- Usar **anotaciones** (`test.info().annotations`) para documentar reglas de negocio
- Aplicar `test.describe`, `test.step`, `test.skip` y `test.only`

## 🧠 Aserciones clave

| Tipo | Ejemplo |
|------|---------|
| Color CSS | `verifyCssValue(el, 'border-color', 'rgb(239, 68, 68)')` |
| Estado disabled | `verifyElementDisabled(el)` / `verifyElementEnabled(el)` |
| Visibilidad | `verifyElementVisible(el)` / `verifyElementHidden(el)` |
| Anotación | `test.info().annotations.push({ type, description })` |

## Prerequisitos

- Node.js >= 18
- npm

## Instalación

```bash
pnpm install
npx playwright install chromium
```

## Ejecutar pruebas

```bash
pnpm test
pnpm test:headed
pnpm test:debug
pnpm report
```

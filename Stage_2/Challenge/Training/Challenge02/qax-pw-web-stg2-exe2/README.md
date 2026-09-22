# Exercise 2 — Comportamientos avanzados en Playwright

Proyecto de referencia para el **Exercise 2** del Training 2 de Stage 2.

Practica comportamientos avanzados del navegador sobre **QAX Forms**: alertas, modales e iframes.

## 🎯 Qué aprenderás

- Manejar **alertas nativas** del navegador (`alert`, `confirm`, `prompt`)
- Interactuar con **modales personalizados** (abrir, validar, cerrar)
- Cambiar el foco a **iframes** simples y anidados
- Volver al contexto principal después de interactuar con un iframe

## 🧠 Desacoplamiento con Utils (antesala a POM)

Este proyecto introduce **utils reutilizables** para encapsular lógica repetitiva:

| Util | Propósito |
|------|-----------|
| `navigation.switchToTab()` | Cambiar entre pestañas de QAX Forms |
| `dialogUtils.acceptDialog()` | Escuchar y aceptar un diálogo nativo |
| `dialogUtils.dismissDialog()` | Escuchar y rechazar un diálogo nativo |
| `dialogUtils.promptDialog()` | Escuchar y responder un prompt con texto |

> **¿Por qué utils?** En lugar de repetir la misma lógica de `page.on('dialog')` en cada test, la encapsulamos en funciones reutilizables. Este patrón de **separación de responsabilidades** evolucionará naturalmente hacia **Page Object Model (POM)** en Stage 3, donde cada página tendrá su propia clase con métodos y selectores encapsulados.

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
# Modo headless
pnpm test

# Modo headed
pnpm test:headed

# Ejecutar solo un archivo
npx playwright test tests/alerts.spec.ts

# Ver reporte HTML
pnpm report
```

## Estructura del proyecto

```
qax-automation-project-playwright-comportamiento-avanzados/
├── utils/
│   ├── navigation.ts          # Cambio de pestañas en QAX Forms
│   └── dialogUtils.ts         # Manejo de diálogos nativos (alert/confirm/prompt)
├── tests/
│   ├── alerts.spec.ts         # Alertas nativas + modales personalizados
│   └── iframes.spec.ts        # Iframe simple + iframes anidados
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

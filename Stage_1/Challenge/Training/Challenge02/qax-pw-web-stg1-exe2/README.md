# Exercise 2 — Mejorando las validaciones con arrays y ciclos

Proyecto de referencia para el **Exercise 2** del Training 1 de Stage 1.

Valida el dashboard de **QAX Bank** usando arrays y ciclos para evitar código repetido.

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

# Modo debug
pnpm test:debug

# Ver reporte HTML
pnpm report
```

## Estructura del proyecto

```
qax-pw-web-stg1-exe2/
├── tests/
│   └── dashboard-validation.spec.ts  # Validación del dashboard con arrays
├── playwright.config.ts              # Configuración de Playwright
├── tsconfig.json                     # Configuración de TypeScript
├── package.json                      # Dependencias del proyecto
└── README.md                         # Este archivo
```

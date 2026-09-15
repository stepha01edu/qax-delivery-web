# Exercise 1 — Empecemos a automatizar

Proyecto de referencia para el **Exercise 1** del Training 1 de Stage 1.

Automatiza el inicio de sesión en **QAX Bank** usando Playwright.

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
# Modo headless (sin interfaz gráfica)
pnpm test

# Modo headed (ver el navegador)
pnpm test:headed

# Modo debug
pnpm test:debug

# Ver reporte HTML
pnpm report
```

## Estructura del proyecto

```
qax-pw-web-stg1-exe1/
├── tests/
│   └── bank-login.spec.ts    # Prueba de login en QAX Bank
├── playwright.config.ts       # Configuración de Playwright
├── tsconfig.json              # Configuración de TypeScript
├── package.json               # Dependencias del proyecto
└── README.md                  # Este archivo
```

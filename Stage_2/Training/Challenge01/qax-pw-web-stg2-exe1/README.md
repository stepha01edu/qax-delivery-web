# Exercise 1 y Challenge 1 - Flujo de apuestas en QAXpert Bet

En este proyecto se automatizo un flujo de apuestas deportivas sobre
**QAXpert Bet**.

El proyecto quedo separado en dos partes. El Exercise 1 contiene el flujo
principal de una apuesta. El Challenge 1 contiene un happy path por cada
historia de usuario para ampliar las validaciones.

## Que se hizo

- Se valido que los eventos se carguen correctamente.
- Se agregaron eventos al ticket usando clic.
- Se valido el monto de la apuesta y el saldo disponible.
- Se probo la confirmacion de una apuesta.
- Se automatizo la proteccion contra sobregiro.
- Se automatizo la recarga de la billetera.
- Se automatizo la cancelacion desde el modal.
- Se automatizaron los filtros y el orden del historial.
- Se automatizo el drag and drop de eventos.

## Localizadores utilizados

Cada test incluye comentarios explicando **por qué** se eligió cada localizador:

| Localizador | Cuándo usarlo |
|-------------|---------------|
| `page.locator('.event-card')` | Selector CSS para capturar elementos por clase |
| `getByRole('link', { name })` | Enlaces y botones con texto visible (más estable) |
| `locator('[id^="amount-"]')` | Selector por atributo (starts-with) para IDs dinámicos |
| `page.locator('#confirmModal')` | Selector por ID para elementos únicos |

## Casos de prueba

Los casos de prueba se documentaron en Gherkin antes de escribir la
automatizacion. El proyecto conserva 20 casos documentados entre el Exercise
1 y el Challenge 1.

- `docs/cases.md`: matriz de TC y escenarios Gherkin del Exercise 1 y Challenge 1.
- `tests/bet-flow.spec.ts`: flujo feliz del Exercise 1.
- `tests/challenge-1-bet.spec.ts`: un happy path por cada HU del Challenge 1.

## Prerequisitos

- Node.js >= 18
- pnpm

## Instalacion

```bash
pnpm install
npx playwright install chromium
```

## Ejecucion de pruebas

```bash
# Modo headless
pnpm test

# Modo headed (ver el navegador)
pnpm test:headed

# Modo debug
pnpm test:debug

# Ejecutar solo el Exercise 1
pnpm test -- tests/bet-flow.spec.ts

# Ejecutar solo el Challenge 1
pnpm test -- tests/challenge-1-bet.spec.ts

# Ver reporte HTML
pnpm report
```

## Estructura del proyecto

```
qax-pw-web-stg2-exe1/
├── docs/
│   └── cases.md                  # Casos de prueba en Gherkin
├── tests/
│   ├── bet-flow.spec.ts           # Automatizacion del Exercise 1
│   └── challenge-1-bet.spec.ts    # Automatizacion del Challenge 1
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

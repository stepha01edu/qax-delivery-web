# Challenge 02 - Validaciones con arrays y ciclos

Este proyecto corresponde al Challenge 02 y continua el trabajo del Challenge 01.
Aqui se practica como validar varios datos sin repetir el mismo codigo muchas
veces, usando arrays y ciclos sencillos.

## Que se practica

- Iniciar sesion en QAX Bank antes de cada prueba.
- Validar saldos de cuentas.
- Validar que aparezcan botones y enlaces.
- Guardar datos esperados dentro de arrays.
- Recorrer los arrays con ciclos `for`.
- Documentar localizadores encontrados con Inspect de Chrome.

## Prueba del dashboard

Archivo: `tests/dashboard-validation.spec.ts`

La prueba abre el login de QAX Bank antes de cada caso y usa estas
credenciales:

- Email: `cliente@qaxbank.com`
- Contrasena: `Test1234`

Despues del login valida:

- El saldo de la Cuenta de Ahorros.
- El saldo de la Cuenta Corriente.
- El boton `Cerrar Sesión`.
- El enlace `Ver Historial Completo`.

Los datos esperados se guardan en dos arrays:

```ts
const cuentas = [
  { nombre: 'Cuenta de Ahorros', saldo: '$ 5.230.000 COP' },
  { nombre: 'Cuenta Corriente', saldo: '$ 1.845.000 COP' },
];
```

El ciclo `for` toma cada cuenta y crea una prueba para validar su saldo.
Tambien se usa otro array para validar los elementos del dashboard.

## Archivo de localizadores

El archivo `localizadores.md` contiene ejemplos de las paginas de QAX
Sandbox:

- QAX Bank Login.
- QAX Bank Dashboard.
- QAX Bank Historial.
- QAX Clinic Login.
- QAX Clinic Reserva.
- QAX Shop Catalogo.

En cada tabla se anota el elemento, el localizador, la accion y como se
encontro usando **Inspect** en Chrome.

## Requisitos

- Node.js 18 o superior.
- pnpm.
- Playwright.

## Instalacion

Desde esta carpeta ejecutar:

```bash
pnpm install
npx playwright install chromium
```

## Ejecutar la prueba

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar solo la prueba del dashboard:

```bash
pnpm test -- tests/dashboard-validation.spec.ts
```

Abrir el navegador durante la prueba:

```bash
pnpm test:headed -- tests/dashboard-validation.spec.ts
```

Ver el reporte HTML:

```bash
pnpm report
```

## Estructura

```text
qax-pw-web-stg1-exe2/
├── tests/
│   └── dashboard-validation.spec.ts
├── localizadores.md
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

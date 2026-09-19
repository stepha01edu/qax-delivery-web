# Challenge 01 - Empecemos a automatizar

Este proyecto corresponde al Challenge 01 y contiene las primeras pruebas web con Playwright.
Se practican acciones sencillas como abrir una pagina, llenar campos, hacer
clic en un boton y validar que la pagina cambie correctamente.

## Que se practica

- Abrir una pagina web con `page.goto`.
- Buscar campos y botones.
- Llenar email, documento y contrasena.
- Hacer clic en el boton de ingreso.
- Validar el titulo y la URL de la pagina.
- Validar textos que aparecen despues del login.

## Pruebas del proyecto

### Login de QAX Bank

Archivo: `tests/bank-login.spec.ts`

La prueba realiza estos pasos:

1. Abre el login de QAX Bank.
2. Ingresa el email `cliente@qaxbank.com`.
3. Ingresa la contrasena `Test1234`.
4. Hace clic en `Ingresar`.
5. Valida que la URL cambie a `dashboard.html`.
6. Valida que se muestre el mensaje de bienvenida.

### Login de QAX Clinic

Archivo: `tests/clinic-login.spec.ts`

La prueba realiza estos pasos:

1. Abre el login de QAX Clinic.
2. Comprueba que el campo documento deje solo numeros.
3. Ingresa el documento `1234567890`.
4. Ingresa la contrasena `paciente123`.
5. Hace clic en `Ingresar`.
6. Valida la redireccion a `appointment.html`.
7. Valida el formulario de reserva de cita.

Credenciales demo de Clinic:

- Documento: `1234567890`
- Contrasena: `paciente123`

## Diferencia en los titulos

La informacion del ejercicio menciona los titulos `QAX Bank - Login` y
`QAX Clinic - Login`. Al revisar las paginas actuales, muestran estos titulos:

- `QAX Bank — Banca Digital`
- `QAX Clinic — Ingreso Pacientes`

Las pruebas validan el titulo que entrega actualmente la pagina.

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

## Ejecutar las pruebas

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar solo Bank:

```bash
pnpm test -- tests/bank-login.spec.ts
```

Ejecutar solo Clinic:

```bash
pnpm test -- tests/clinic-login.spec.ts
```

Abrir el navegador durante la prueba:

```bash
pnpm test:headed -- tests/clinic-login.spec.ts
```

Ver el reporte HTML:

```bash
pnpm report
```

## Estructura

```text
qax-pw-web-stg1-exe1/
├── tests/
│   ├── bank-login.spec.ts
│   └── clinic-login.spec.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
├── pnpm-lock.yaml
└── README.md
```

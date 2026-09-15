# Localizadores

En este archivo anote algunos elementos de las paginas de QAX Sandbox y como
se pueden buscar en Playwright.

Para encontrar cada localizador use **Inspect** en Chrome y revise la informacion
del elemento en el HTML.

Para entrar a Bank:

- Email: `cliente@qaxbank.com`
- Contrasena: `Test1234`

Para entrar a Clinic:

- Documento: `1234567890`
- Contrasena: `paciente123`

## Bank Login

URL: `https://qaxpert.com/lab/sites/stage-1/bank/index.html`

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Campo email | `getByPlaceholder('ej. cliente@qaxbank.com')` | llenar | Inspect: revise el atributo `placeholder` |
| Campo contrasena | `getByPlaceholder('Ingrese su contraseña')` | llenar | Inspect: revise el atributo `placeholder` |
| Boton Ingresar | `getByRole('button', { name: 'Ingresar' })` | hacer clic | Inspect: revise que era un `button` y su texto |

## Bank Dashboard

URL: `https://qaxpert.com/lab/sites/stage-1/bank/dashboard.html`

Primero se debe hacer login en Bank.

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Mensaje de bienvenida | `getByText('Hola, Carlos Andrés López')` | validar que se vea | Inspect: revise el texto visible |
| Saldo de cuenta | `getByText('$ 1.845.000 COP')` | validar que se vea | Inspect: revise el texto visible del saldo |
| Boton Cerrar Sesion | `getByRole('button', { name: 'Cerrar Sesión' })` | hacer clic | Inspect: revise que era un `button` y su texto |
| Enlace Historial | `getByRole('link', { name: /Ver Historial Completo/ })` | hacer clic | Inspect: revise que era un enlace y su texto |

## Bank Historial

URL: `https://qaxpert.com/lab/sites/stage-1/bank/history.html`

Primero se debe hacer login en Bank.

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Titulo del historial | `getByRole('heading', { name: 'Historial Completo de Transacciones' })` | validar que se vea | Inspect: revise la etiqueta de encabezado y su texto |
| Filtro por tipo | `locator('#filterType')` | seleccionar una opcion | Inspect: revise el atributo `id` |
| Buscador | `getByPlaceholder('Buscar por descripción...')` | llenar | Inspect: revise el atributo `placeholder` |
| Una transaccion | `locator('//td[contains(text(), "Transferencia Nequi")]')` | validar que se vea | Inspect: revise la celda `td` y su texto |

## Clinic Login

URL: `https://qaxpert.com/lab/sites/stage-1/clinic/index.html`

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Titulo QAX Clinic | `getByRole('heading', { name: /QAX Clinic/ })` | validar que se vea | Inspect: revise la etiqueta de encabezado y su texto |
| Campo documento | `locator('#documento')` | llenar | Inspect: revise el atributo `id` |
| Campo contrasena | `getByPlaceholder('Ingrese su contraseña')` | llenar | Inspect: revise el atributo `placeholder` |
| Boton Ingresar | `getByRole('button', { name: 'Ingresar' })` | hacer clic | Inspect: revise que era un `button` y su texto |

## Clinic Reserva

URL: `https://qaxpert.com/lab/sites/stage-1/clinic/appointment.html`

Primero se debe hacer login en Clinic.

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Titulo de reserva | `getByRole('heading', { name: /Reservar Cita/ })` | validar que se vea | Inspect: revise la etiqueta de encabezado y su texto |
| Centro medico | `locator('#facility')` | seleccionar una opcion | Inspect: revise el atributo `id` |
| Programa | `locator('#program')` | seleccionar una opcion | Inspect: revise el atributo `id` |
| Fecha | `locator('#visitDate')` | llenar | Inspect: revise el atributo `id` |
| Comentarios | `locator('//textarea[@id="comments"]')` | llenar | Inspect: revise la etiqueta `textarea` y su `id` |
| Boton Reservar Cita | `getByRole('button', { name: 'Reservar Cita' })` | hacer clic | Inspect: revise que era un `button` y su texto |

## Shop Catalogo

URL: `https://qaxpert.com/lab/sites/stage-1/shop/index.html`

| Elemento | Localizador | Accion | Tecnica usada |
| --- | --- | --- | --- |
| Titulo del catalogo | `getByRole('heading', { name: 'Catálogo de Productos' })` | validar que se vea | Inspect: revise la etiqueta de encabezado y su texto |
| Buscador de productos | `getByPlaceholder('Buscar productos...')` | llenar | Inspect: revise el atributo `placeholder` |
| Nombre de producto | `getByText('Café Colombiano Premium 500g')` | validar que se vea | Inspect: revise el texto visible |
| Boton Agregar al Carrito | `getByRole('button', { name: 'Agregar al Carrito' }).first()` | hacer clic | Inspect: revise que era un `button` y su texto |
| Enlace del carrito | `locator('a[href="cart.html"]')` | hacer clic | Inspect: revise el atributo `href` |

Los localizadores los saque revisando los elementos de cada pagina.

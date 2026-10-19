# Mision - Automatizando QAXTickets

## Estado de esta entrega

Este README presenta de forma provisional la mision de QAXTickets. Se entrega
para poder avanzar con el Quick Task del Stage 4.

Esta entrega todavia no contiene el proyecto Playwright ni las pruebas
automatizadas. El proyecto completo, los casos de prueba, el video y las
evidencias se agregaran en la entrega final de la mision.

## Objetivo

Probar el flujo de compra de entradas en QAXTickets: buscar un evento,
seleccionar asientos, completar el pago y revisar los tickets comprados.

Pagina de practica:

`https://qaxpert.com/lab/sites/stage-3/tickets/index.html`

La pagina no requiere login. Los datos se guardan en `localStorage`.

## Historias de usuario

### HU-01: Explorar eventos

Revisar que se muestren 6 eventos con nombre, fecha, lugar y precio. Al elegir
el filtro `Futbol`, deben quedar los eventos de esa categoria y el filtro debe
verse activo. El boton `Comprar Entradas` debe llevar a la seleccion de asientos.

### HU-02: Seleccionar asientos

El mapa debe mostrar las zonas VIP, Platea y General. Los asientos libres son
verdes, los ocupados son rojos y no se pueden seleccionar, y los seleccionados
cambian a dorado. El usuario puede elegir hasta 4 asientos; si intenta elegir
mas, aparece una advertencia. El panel muestra asientos y precios, y no permite
continuar al pago sin una seleccion.

### HU-03: Checkout y pago

El checkout solicita nombre, correo y telefono. Al enviar los datos, se activa
el iframe de pago y muestra el total. El formulario dentro del iframe solicita
numero de tarjeta de 16 digitos, fecha y CVV. Al completar el pago, se muestra
la confirmacion, se genera un ID con formato `TKT-XXXXXXXXXX` y se abre la
pagina `Mis Tickets`.

### HU-04: Mis tickets

La pagina muestra los tickets comprados con nombre del evento, ID y fecha de
compra. Cada ticket tiene un QR en SVG. El resumen muestra la cantidad de
entradas, eventos y gasto. Si no hay tickets, se muestra un mensaje y un enlace
para volver a los eventos.

## Casos de prueba

En la entrega completa se creara `docs/cases.md` con los casos en Gherkin para
las cuatro historias. Se incluiran casos positivos y negativos, como intentar
seleccionar mas de 4 asientos, continuar sin elegir asientos y revisar el estado
vacio de Mis Tickets.

## Proyecto previsto

En la entrega completa se construira el proyecto desde cero con TypeScript y
Playwright. Tendra `BasePage` y una clase por pagina del flujo para guardar los
localizadores y las acciones de cada pagina.

Las pruebas revisaran el mapa de asientos, sus colores y estados, el formulario
de pago dentro del iframe, la confirmacion y los tickets con QR. Tambien se
agruparan por historia de usuario y se usaran los pasos y anotaciones de
Playwright para describir lo que valida cada caso.

## Estructura prevista

```text
Stage_3/Mission/
├── README.md
└── qax-tickets-automation/
    ├── pages/
    ├── tests/
    ├── docs/
    │   └── cases.md
    ├── evidence/
    ├── .gitignore
    ├── package.json
    ├── playwright.config.ts
    ├── tsconfig.json
    └── README.md
```

## Ejecucion prevista

Cuando este creado el proyecto, se instalaran las dependencias y el navegador
Chromium desde la carpeta del proyecto:

```bash
pnpm install
pnpm exec playwright install chromium
pnpm test
pnpm report
```

La configuracion final tambien tendra capturas, trace y grabacion de video,
incluyendo `video: 'on'`, como pide la entrega.

## Entrega final

La mision completa incluira los casos Gherkin, la automatizacion del flujo
desde el filtro de eventos hasta Mis Tickets, las instrucciones para ejecutar
el proyecto y el video de la ejecucion. Luego se subira al repositorio personal
y se creara un Pull Request para que lo revise el mentor.

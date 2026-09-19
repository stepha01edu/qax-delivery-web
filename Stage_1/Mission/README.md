# Mission - Automatizando QAX Shop

## Estado de esta entrega

Este README es una construccion parcial de la Mission de automatizacion web.
Se entrega para liberar la Quick Task del Stage 2.

La entrega total de la Mission se realizara despues. En esa entrega se
agregara el proyecto Playwright completo, los casos automatizados, el reporte
y las evidencias finales.

## Objetivo

Automatizar el flujo principal de una compra en QAX Shop:

1. Revisar el catalogo.
2. Buscar un producto.
3. Agregar el producto al carrito.
4. Revisar el carrito.
5. Completar el formulario de compra.
6. Validar la confirmacion del pedido.

Pagina de practica:

`https://qaxpert.com/lab/sites/stage-1/shop/index.html`

La tienda no necesita login. El carrito se guarda en `localStorage`, por eso
debe mantenerse al navegar o recargar la pagina.

## Historia de usuario

Como usuario de QAX Shop quiero navegar el catalogo, buscar productos,
administrar mi carrito y completar una compra para recibir la confirmacion de
mi pedido.

## Criterios que se deben validar

### Catalogo

- Se muestran 12 productos.
- Cada producto muestra nombre, precio e imagen.
- Cada producto tiene el boton `Agregar al Carrito`.
- Al buscar `cafe` se muestran solo los productos relacionados.
- Al limpiar la busqueda vuelven a aparecer los productos.
- Al buscar `zzz` se muestra un mensaje de lista vacia.

### Carrito

- El badge aumenta al agregar un producto.
- Al agregar el mismo producto varias veces se actualiza la cantidad.
- El carrito muestra nombre, precio, cantidad y subtotal.
- El total coincide con la suma de los subtotales.
- Se puede eliminar un producto.
- El total se actualiza despues de eliminarlo.

### Checkout

- El boton `Ir a Checkout` abre el formulario de compra.
- El formulario solicita nombre, email, telefono y direccion.
- No se puede enviar con campos vacios.
- El email valido tiene formato como `x@y.com`.
- Un email como `xyz` debe ser rechazado.
- Con datos validos se muestra un numero de orden con formato
  `QAX-ORDER-XXXXX`.
- Despues de comprar, el carrito queda vacio.

### Navegacion y estado

- El carrito se mantiene al cambiar de pagina.
- El carrito continua visible despues de recargar la pagina.

## Casos que se planifican

Los casos se deben documentar en Gherkin antes de automatizarlos. Algunos
casos planificados son:

### Caso positivo: buscar un producto

```gherkin
Feature: Catalogo de QAX Shop

  Scenario: Buscar productos de cafe
    Given que el usuario abre el catalogo de QAX Shop
    When busca la palabra "cafe"
    Then se muestran solo productos relacionados con cafe
```

### Caso negativo: producto inexistente

```gherkin
Scenario: Buscar un producto que no existe
  Given que el usuario esta en el catalogo
  When busca "zzz"
  Then se muestra el estado de lista vacia
```

### Caso positivo: completar una compra

```gherkin
Scenario: Comprar un producto con datos validos
  Given que el usuario agrego un producto al carrito
  When completa el checkout con datos validos
  Then se muestra un numero de orden
  And el carrito queda vacio
```

### Caso negativo: checkout incompleto

```gherkin
Scenario: Intentar comprar sin completar los datos
  Given que el usuario tiene un producto en el carrito
  When intenta enviar el formulario sin completar todos los campos
  Then la compra no se completa
```

En la entrega total estos casos quedaran en `docs/cases.md` junto con los
casos de carrito, recarga y persistencia.

## Pendiente para la entrega total

- Crear el proyecto Playwright desde cero.
- Crear la carpeta `tests/`.
- Crear el archivo `docs/cases.md` con todos los casos Gherkin.
- Automatizar casos positivos y negativos.
- Usar localizadores estables.
- Agregar aserciones con `expect`.
- Configurar el `.gitignore`.
- Ejecutar todas las pruebas.
- Generar el reporte HTML.
- Tomar la captura del reporte final.
- Agregar las evidencias solicitadas al Pull Request.

## Comandos planificados

Cuando el proyecto Playwright este creado, se ejecutara desde la carpeta del
proyecto:

```bash
pnpm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

## Estructura esperada para la entrega total

```text
Stage_1/Mission/
├── README.md
└── qax-shop-automation/
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

## Nota

Esta version solo deja documentado el objetivo y la planificacion de la
Mission. La automatizacion completa se entregara en una siguiente actualizacion.

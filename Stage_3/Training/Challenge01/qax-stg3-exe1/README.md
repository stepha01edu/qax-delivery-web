# Haguazon - Exercise 1 y Challenge 1

Este proyecto tiene el flujo que se trabajo en el Exercise 1 y la continuacion del Challenge 1. Las pruebas usan Haguazon para buscar un producto, revisar el carrito, completar el checkout y confirmar una compra.

## Que tiene el proyecto

- `pages/BasePage.ts`: guarda la pestaña y permite abrir paginas del sitio.
- `pages/HomePage.ts`: busca productos y lee el contador del carrito en inicio.
- `pages/ProductPage.ts`: revisa el detalle y agrega el producto al carrito.
- `pages/CartPage.ts`: consulta productos, cambia cantidades, elimina productos y revisa los calculos.
- `pages/CheckoutPage.ts`: completa direccion, envio, pago y revision.
- `tests/search-product.spec.ts`: prueba del Exercise 1.
- `tests/cart-checkout.spec.ts`: pruebas del Challenge 1, separadas por historia de usuario.
- `docs/cases.md`: casos escritos en Gherkin.

En los Page Objects deje los localizadores en el constructor y las acciones en metodos. En los archivos `.spec.ts` estan los pasos que conectan cada parte del flujo.

## Requisitos

- Node.js 20 o superior
- pnpm
- Playwright

## Instalacion

Desde esta carpeta, ejecuta:

```bash
pnpm install
pnpm exec playwright install chromium
```

## Ejecucion

Ejecutar todas las pruebas:

```bash
pnpm test
```

Ejecutar solo una parte del proyecto:

```bash
pnpm exec playwright test tests/search-product.spec.ts
pnpm exec playwright test tests/cart-checkout.spec.ts
```

Revisar los tipos de TypeScript:

```bash
pnpm typecheck
```

Abrir el reporte HTML despues de una ejecucion:

```bash
pnpm report
```

La configuracion usa un solo worker para que las pruebas se ejecuten una por una.

## Casos que quedan en fixme

La ejecucion completa tiene 13 pruebas: 10 pasan y 3 quedan como `fixme` por diferencias de la pagina de practica.

- `CP08`: el pago con tarjeta ya aparece seleccionado y la pagina no permite dejar el metodo sin seleccionar desde sus controles.
- `CP10`: el formato pedido muestra diez caracteres despues de `HGZ-`, pero el sitio genera el identificador usando la fecha y puede tener otra longitud.
- `CP11`: el requisito pide el enlace `Seguir comprando`, pero la pagina muestra `Ver Mis Pedidos`.

Los casos estan marcados como `fixme` en `tests/cart-checkout.spec.ts` y tambien se describen en `docs/cases.md`.

## Observaciones de la pagina

- `BUG-005`: en el paso Pago, Tarjeta ya aparece seleccionada y no se puede quitar desde la pantalla. Por eso `CP08` queda como `fixme`.
- `BUG-006`: el sitio usa la fecha para crear el id, por eso la cantidad de caracteres puede cambiar. El requisito pide diez caracteres despues de `HGZ-`, por eso `CP10` queda como `fixme`.
- `BUG-007`: la confirmacion ofrece `Ver Mis Pedidos` en vez de `Seguir comprando`, por eso `CP11` queda como `fixme`.
- `BUG-008`: para avanzar desde Direccion, la pagina muestra una alerta si faltan nombre, calle o ciudad. El boton sigue visible y habilitado, pero el checkout permanece en el mismo paso. `CP06` revisa este comportamiento.
- En el checkout, Envio Estandar tambien aparece seleccionado al entrar a ese paso. Se puede elegir otra opcion, pero no dejar la seleccion vacia desde la pantalla.
- El contador del carrito aparece en la pagina principal (`index.html`), no en la ficha del producto. Por eso la prueba vuelve a inicio para revisar el numero.

## Errores encontrados al iniciar el Exercise 1

Estos fueron problemas de los primeros selectores y rutas que se probaron. Ya estan corregidos en el proyecto:

- `BUG-001`: una ruta con `/` al inicio abria la pagina general de QAXpert. Ahora se usa la ruta relativa `index.html` y la direccion base termina en `/`.
- `BUG-002`: el selector `.search-bar button` no encontraba el boton. Ahora se busca por el nombre visible `Buscar`.
- `BUG-003`: la pagina no tenia la clase `.product-title`. Ahora se toma el nombre desde el encabezado principal.

El primer reporte tambien indicaba que no habia contador del carrito. Al revisar la pagina actual, confirme que el contador si existe en inicio como `#cartCount`; el problema era buscarlo mientras se estaba en la ficha del producto. La prueba ahora lo consulta en la pagina principal.

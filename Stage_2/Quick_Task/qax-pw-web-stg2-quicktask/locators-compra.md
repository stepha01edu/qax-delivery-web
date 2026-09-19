# Localizadores del flujo de compra

Estos son los localizadores necesarios para seguir una compra desde el
catalogo hasta el formulario final de la tienda.

Pagina: `http://www.testingyes.com/onlineshop/`

| Paso | Elemento | Localizador | Accion |
| --- | --- | --- | --- |
| Catalogo | Buscador | `getByPlaceholder('Search our catalog')` | llenar y presionar Enter |
| Catalogo | Producto | `locator('h3.product-title a[href*="hummingbird-printed-t-shirt"]')` | hacer clic |
| Producto | Cantidad | `getByLabel('Quantity')` | llenar |
| Producto | Boton para agregar | `getByRole('button', { name: 'Add to cart' })` | hacer clic |
| Carrito | Carrito | `locator('#_desktop_cart a')` | abrir |
| Carrito | Producto agregado | `getByText('Hummingbird printed t-shirt', { exact: true })` | validar que se vea |
| Carrito | Checkout | `getByRole('link', { name: /Proceed to checkout/i })` | hacer clic |
| Datos personales | Nombre | `locator('#customer-form #field-firstname')` | llenar |
| Datos personales | Apellido | `locator('#customer-form #field-lastname')` | llenar |
| Datos personales | Email | `locator('#customer-form #field-email')` | llenar |
| Datos personales | Aceptar privacidad | `locator('#customer-form input[name="customer_privacy"]')` | marcar |
| Datos personales | Aceptar datos personales | `locator('#customer-form input[name="psgdpr"]')` | marcar |
| Datos personales | Continuar | `getByRole('button', { name: 'Continue' })` | hacer clic |
| Direccion | Direccion | `locator('#field-address1')` | llenar |
| Direccion | Ciudad | `locator('#field-city')` | llenar |
| Direccion | Estado | `locator('#field-id_state')` | seleccionar |
| Direccion | Codigo postal | `locator('#field-postcode')` | llenar |
| Direccion | Pais | `locator('#field-id_country')` | seleccionar |
| Direccion | Telefono | `locator('#field-phone')` | llenar |
| Pago | Condiciones | `locator('#conditions_to_approve\\[terms-and-conditions\\]')` | marcar |
| Pago | Metodo de pago | `locator('#payment-option-1')` | seleccionar |
| Pago | Confirmar compra | `getByRole('button', { name: 'Place order' })` | hacer clic |
| Confirmacion | Numero de orden | `getByText(/Order reference:/i)` | validar que se vea |

Los textos y atributos se revisan usando **Inspect** en Chrome. Algunos campos
del checkout tienen el mismo id en distintas secciones; por eso se usa el
formulario `#customer-form` cuando el campo pertenece a datos personales.

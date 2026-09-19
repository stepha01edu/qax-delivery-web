# Localizadores de Shadow DOM, IFrame y Popup

## Shadow DOM

Pagina: `https://bonigarcia.dev/selenium-webdriver-java/shadow-dom.html`

| Elemento | Localizador | Accion |
| --- | --- | --- |
| Contenedor Shadow DOM | `locator('#content')` | ubicar el componente |
| Texto dentro del Shadow DOM | `locator('#content').locator('p')` | validar `Hello Shadow DOM` |

## IFrame

Pagina: `https://bonigarcia.dev/selenium-webdriver-java/iframes.html`

| Elemento | Localizador | Accion |
| --- | --- | --- |
| IFrame | `frameLocator('#my-iframe')` | entrar al frame |
| Campo dentro del IFrame | `frameLocator('#my-iframe').locator('input')` | llenar |

## Popup y dialogos

Pagina: `https://bonigarcia.dev/selenium-webdriver-java/dialog-boxes.html`

| Elemento | Localizador | Accion |
| --- | --- | --- |
| Boton alert | `getByRole('button', { name: 'Launch alert' })` | hacer clic |
| Boton confirm | `getByRole('button', { name: 'Launch confirm' })` | hacer clic |
| Boton prompt | `getByRole('button', { name: 'Launch prompt' })` | hacer clic |
| Boton modal | `getByRole('button', { name: 'Launch modal' })` | hacer clic |
| Modal | `locator('#example-modal')` | validar que se vea |
| Boton Close | `getByRole('button', { name: 'Close' })` | cerrar |

Los elementos se encuentran usando Inspect. Para alert, confirm y prompt se
debe escuchar el evento `dialog` antes de hacer clic.

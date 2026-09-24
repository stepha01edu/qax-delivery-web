# Mission - QAX Crypto Exchange

## Estado de esta entrega

Este README es una entrega provisional. Se subira al repositorio para habilitar
el Quick Task del Stage 3. Todavia no es el proyecto real de la mision y no
significa que las historias de usuario ya esten automatizadas.

Cuando se continue con la mision, esta carpeta se actualizara con el proyecto
completo, sus pruebas, los casos en Gherkin y las evidencias de ejecucion.

## De que trata la mision

La mision real consiste en probar **QAX Crypto Exchange**, un simulador de
compra y venta de criptomonedas. Tiene 10 activos, precios que cambian en vivo,
una comision de 0.5%, un portafolio, un historial y un widget de Bitcoin dentro
de un iframe.

- **Sitio de practica:** https://qaxpert.com/lab/sites/stage-2/crypto/index.html
- **Saldo inicial:** COP 10,000,000
- **Login:** no se necesita

## Historias que tendra el proyecto

- **HU-01 - Compra:** comprar Bitcoin con pesos y revisar el calculo, la
  confirmacion y el registro de la operacion.
- **HU-02 - Portafolio:** revisar la criptomoneda comprada, los saldos y el
  grafico del portafolio.
- **HU-03 - Widget BTC:** revisar el precio, el grafico y las estadisticas del
  widget de Bitcoin dentro del iframe.
- **HU-04 - Venta:** vender parte de una criptomoneda y validar el saldo y la
  cantidad disponible.
- **HU-05 - Historial:** filtrar y ordenar las compras y ventas.

## Lo que se entregara en el proyecto real

Cuando se complete la mision, el proyecto incluira:

- Un proyecto de Playwright con TypeScript.
- Casos de prueba en Gherkin para las cinco historias y sus criterios.
- Pruebas automatizadas para validar los criterios de aceptacion.
- En el README, los pasos para instalar y ejecutar las pruebas.
- Un video de la ejecucion. Playwright se configurara para grabar las pruebas.

Esta entrega provisional solo describe el trabajo que se realizara despues. No
incluye todavia las pruebas ni los resultados de la mision.

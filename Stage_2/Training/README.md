# Training - Stage 2

En esta carpeta estan los proyectos de los Challenge 01 y Challenge 02. Cada
uno practica pruebas web con Playwright sobre una pagina distinta de QAXpert.

## Challenge 01 - Flujo de apuestas

Este proyecto prueba la pagina **QAXpert Bet**. El trabajo esta dividido en
dos partes:

- **Exercise 1:** seleccionar partidos, agregarlos al ticket, ingresar un
  monto y confirmar una apuesta.
- **Challenge 1:** probar otros casos de la apuesta, como evitar apostar mas
  que el saldo, recargar la billetera, cancelar una apuesta, revisar filtros
  del historial y arrastrar un evento al ticket.

Los casos de prueba estan en Gherkin y las pruebas automatizadas estan en la
carpeta `tests` del proyecto.

Proyecto: [`Challenge01/qax-pw-web-stg2-exe1`](Challenge01/qax-pw-web-stg2-exe1/)

Instrucciones: [README del Challenge 01](Challenge01/qax-pw-web-stg2-exe1/README.md)

## Challenge 02 - Alertas, modales e iframes

Este proyecto prueba la pagina **QAX Forms**. Incluye alertas del navegador,
modales personalizados, un iframe simple y recorridos que combinan estas
partes.

Los casos estan escritos en Gherkin y las pruebas estan en la carpeta
`tests`. Tambien hay videos de la ejecucion en
`Challenge02/qax-pw-web-stg2-exe2/evidence/videos/`.

El iframe anidado esta pendiente porque la pagina de practica no lo carga. El
caso quedo marcado como `fixme` y el problema esta explicado en el README del
proyecto.

Proyecto: [`Challenge02/qax-pw-web-stg2-exe2`](Challenge02/qax-pw-web-stg2-exe2/)

Instrucciones: [README del Challenge 02](Challenge02/qax-pw-web-stg2-exe2/README.md)

## Antes de ejecutar

Cada proyecto tiene su propio README con los pasos de instalacion, ejecucion y
los resultados de sus pruebas. Entra primero a la carpeta del proyecto que
quieres revisar.

# Casos de prueba - QAXTrade Challenge 2

Estos son los casos que disene para revisar el dashboard, las ordenes, el portafolio y las alertas.

## HU-01: Dashboard en vivo

```gherkin
Feature: Revisar el dashboard de QAXTrade

  Scenario: Ver el resumen, la watchlist y el grafico
    Given que el usuario abre el dashboard
    Then ve el valor del portafolio, el P&L y el efectivo disponible
    And la watchlist muestra 10 activos con simbolo, precio y cambio
    And el mini grafico muestra 20 velas

  Scenario: Revisar los colores de los cambios del mercado
    Given que se muestran cambios positivos y negativos
    Then los cambios positivos aparecen en verde
    And los cambios negativos aparecen en rojo

  Scenario: Revisar la actualizacion de precios
    Given que el usuario deja abierto el dashboard
    When pasan 5 segundos
    Then el precio de AAPL cambia
```

## HU-02: Orden de compra

```gherkin
Feature: Crear una orden de compra

  Scenario: Completar una orden Market
    Given que el usuario abre la pagina de ordenes
    When selecciona AAPL y el tipo Market
    Then ve el precio actual y los campos de cantidad y lado
    And no aparecen los campos de precio limite
    And el boton se habilita cuando ingresa una cantidad valida

  Scenario: Abrir el formulario sin datos
    Given que el usuario abre la pagina de ordenes
    Then el boton de confirmar esta deshabilitado

  Scenario: Completar una orden Limit
    Given que el usuario selecciona AAPL y el tipo Limit
    Then aparece el campo de precio limite
    And el boton sigue deshabilitado si faltan datos
    When completa cantidad y precio limite
    Then el boton queda habilitado

  Scenario: Confirmar una compra y revisar el saldo y el portafolio
    Given que el usuario completa una orden Market de AAPL
    When confirma dos ordenes
    Then cada orden muestra un ID con el formato ORD- y 13 numeros
    And los IDs son diferentes
    And el efectivo disponible disminuye
    And aumenta la cantidad de AAPL en el portafolio
```

## HU-03: Portafolio y P&L

```gherkin
Feature: Revisar el portafolio

  Scenario: Ver holdings, P&L y grafico
    Given que el usuario tiene activos en el portafolio
    Then la tabla muestra cantidad, precio promedio y valor total
    And las ganancias aparecen en verde y las perdidas en rojo
    And el grafico pie muestra varios colores

  Scenario: Ver el estado vacio
    Given que el usuario no tiene holdings
    Then ve un mensaje indicando que no tiene posiciones abiertas
    And la tabla y el grafico no se muestran

  Scenario: Ir al dashboard desde el estado vacio
    Given que el portafolio no tiene holdings
    When el usuario usa el CTA
    Then llega al dashboard
```

El caso del CTA queda en `fixme`: el enlace actual de la pagina lleva a Ordenes en vez del Dashboard.

El caso del boton de confirmar al abrir Ordenes tambien queda en `fixme`: la pagina lo muestra habilitado aunque los campos esten vacios. Luego de seleccionar un activo y tipo de orden, el boton si se deshabilita mientras falta completar datos.

## HU-04: Alertas de precio

```gherkin
Feature: Administrar alertas de precio

  Scenario: Crear, apagar y eliminar una alerta
    Given que el usuario crea una alerta para BTC por encima de 70000
    Then la alerta aparece en la lista y muestra ON
    When apaga la alerta
    Then cambia a OFF, baja su opacidad y muestra el fondo gris
    When elimina la alerta
    Then la lista queda sin alertas y el conteo baja a cero
```

La pagina no muestra un contador numerico separado. La prueba revisa la cantidad de alertas visibles en la lista antes y despues de eliminar.

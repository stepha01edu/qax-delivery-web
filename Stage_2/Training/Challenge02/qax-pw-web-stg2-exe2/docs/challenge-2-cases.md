# Casos de prueba - Challenge 2

Estos casos revisan las alertas, los modales, los iframes y algunas formas de
usarlos en una misma secuencia. Los casos automatizados estan en
`tests/challenge-2.spec.ts`.

## HU-01 - Alertas nativas

```gherkin
Feature: Alertas nativas de QAX Forms

  Scenario: Aceptar la alerta simple
    Given que el usuario abre la pestana Alertas y Modales
    When acepta la alerta simple
    Then la alerta se cierra
    And la pagina muestra que la alerta fue aceptada

  Scenario: Aceptar la confirmacion
    Given que el usuario abre la pestana Alertas y Modales
    When acepta la confirmacion nativa
    Then la pagina muestra "You pressed Ok"

  Scenario: Cancelar la confirmacion
    Given que el usuario abre la pestana Alertas y Modales
    When cancela la confirmacion nativa
    Then la pagina muestra "You Pressed Cancel"

  Scenario: Ingresar texto en el prompt
    Given que el usuario abre la pestana Alertas y Modales
    When ingresa "QA Manual" en el prompt
    Then el resultado incluye el texto ingresado

  Scenario: Cancelar el prompt sin ingresar texto
    Given que el usuario ya respondio un prompt con texto
    When vuelve a abrir el prompt y lo cancela
    Then el resultado anterior se conserva
    And no se muestra el valor null como texto
```

## HU-02 - Modales personalizados

```gherkin
Feature: Modales personalizados de QAX Forms

  Scenario: Cancelar el modal de confirmacion
    Given que el usuario abre el modal de confirmacion
    Then ve el titulo y el cuerpo del modal
    When presiona "Cancelar"
    Then el modal se cierra
    And la accion no se ejecuta

  Scenario: Confirmar la accion del modal
    Given que el usuario abre el modal de confirmacion
    Then ve el titulo y el cuerpo del modal
    When presiona "Confirmar"
    Then el modal se cierra
    And la pagina muestra que la operacion fue confirmada

  Scenario: Cerrar el modal informativo
    Given que el usuario abre el modal informativo
    Then ve el titulo y el cuerpo del modal
    When presiona "Cerrar"
    Then el modal informativo deja de estar visible
```

La pagina de practica ofrece los botones Cancelar, Confirmar y Cerrar para
cerrar sus modales. No muestra una X ni una opcion para cerrarlos haciendo clic
fuera del modal o presionando Escape.

## HU-03 - Iframes

```gherkin
Feature: Iframes de QAX Forms

  Scenario: Consultar el iframe simple y volver a la pagina principal
    Given que el usuario abre la pestana Frames
    When consulta el iframe de terminos y condiciones
    Then el titulo y el contenido del iframe estan visibles
    And la pagina principal sigue disponible

  Scenario: Escribir en el iframe hijo
    Given que el usuario abre la pestana Frames
    When carga el iframe hijo dentro del iframe padre
    And escribe "QAXpert" en el campo del iframe hijo
    Then el resultado muestra "Texto ingresado: QAXpert"
    And la pagina principal sigue disponible
```

El escenario anidado esta escrito, pero queda como `fixme` hasta que se corrija
la pagina de practica. Actualmente el JavaScript de `nested-frame.html` tiene
un error y el boton no logra cargar el iframe hijo. Por eso este criterio aun
no tiene una ejecucion exitosa.

## HU-04 - Flujo combinado

```gherkin
Feature: Combinaciones de alertas, modales e iframes

  Scenario: Aceptar una alerta, confirmar un modal y consultar un iframe
    Given que el usuario abre la pestana Alertas y Modales
    When acepta la alerta simple
    And confirma una accion en el modal
    And abre la pestana Frames y consulta el iframe simple
    Then el contenido del iframe esta visible
    And la pagina principal sigue disponible
    When vuelve a Alertas y Modales
    Then el resultado del modal confirmado sigue disponible

  Scenario: Cancelar una alerta, cerrar un modal y consultar un iframe
    Given que el usuario abre la pestana Alertas y Modales
    When cancela una confirmacion nativa
    And abre y cierra el modal informativo
    And abre la pestana Frames y consulta el iframe simple
    Then el contenido del iframe esta visible
    And la pagina principal sigue disponible
    When vuelve a Alertas y Modales
    Then el resultado de cancelar la alerta sigue disponible
```

## Evidencia de ejecucion

Playwright graba un video por cada prueba. Los videos de la ultima ejecucion
se guardan en `evidence/videos/` y se enlazan desde el README.

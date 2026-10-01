# Casos de prueba - Haguazon

Estos casos estan separados entre el Exercise 1 y el Challenge 1. Los escribi antes de agregar las nuevas pruebas para tener claro que revisar en cada parte.

## Exercise 1 - Buscar producto

```gherkin
Feature: Buscar un producto en Haguazon

  Scenario: Buscar una laptop y revisar su detalle
    Given que el usuario abre la pagina principal de Haguazon
    When busca "laptop"
    And abre el primer producto
    Then ve el nombre, precio y stock del producto
    And puede agregarlo al carrito
    And el producto aparece en el carrito
```

## Challenge 1 - HU-01: Gestion del carrito

```gherkin
Feature: Revisar y actualizar el carrito

  Scenario: Ver los datos del producto agregado
    Given que el carrito tiene una laptop
    When el usuario abre el carrito
    Then ve el nombre, el precio unitario y la cantidad del producto

  Scenario: Actualizar la cantidad y revisar los calculos
    Given que el carrito tiene una laptop
    When el usuario cambia la cantidad a 2
    Then el subtotal del producto se actualiza
    And el total coincide con los subtotales y el envio mostrado

  Scenario: Eliminar el producto del carrito
    Given que el carrito tiene una laptop
    When el usuario la elimina
    Then el carrito queda vacio
    And ya no se muestra el resumen de compra

  Scenario: Conservar el carrito al navegar a otra pagina
    Given que el carrito tiene una laptop
    When el usuario navega a la pagina principal y vuelve al carrito
    Then la laptop sigue en el carrito
    And el contador de la pagina principal muestra 1

  Scenario: Rechazar la cantidad cero
    Given que el carrito tiene una laptop con cantidad 1
    When el usuario intenta cambiar la cantidad a 0
    Then la cantidad vuelve a 1
    And el subtotal no cambia
```

## Challenge 1 - HU-02: Checkout en cuatro pasos

```gherkin
Feature: Completar los pasos del checkout

  Scenario: No avanzar sin completar los datos obligatorios de direccion
    Given que el usuario inicia el checkout con productos en el carrito
    When intenta continuar sin ingresar nombre, calle y ciudad
    Then permanece en el paso Direccion

  Scenario: Elegir envio y pago y revisar los datos antes de confirmar
    Given que el usuario completo los datos de direccion
    When elige el envio Express
    And elige el pago PSE
    And avanza al paso Revision
    Then las opciones elegidas aparecen marcadas
    And la revision muestra la direccion, el envio, el pago y los productos
```

### Caso disenado que no se puede automatizar por ahora

```gherkin
Scenario: No continuar al pago si no se elige un metodo
  Given que el usuario esta en el paso Pago
  When no selecciona ningun metodo de pago
  And intenta continuar
  Then permanece en el paso Pago
```

La pagina deja Tarjeta seleccionada desde que se abre el paso y no permite quitar la seleccion desde la pantalla. Por eso este caso queda disenado, pero no se puede probar usando solo los controles de la pagina.

## Challenge 1 - HU-03: Confirmacion del pedido

```gherkin
Feature: Confirmar una compra

  Scenario: Confirmar el pedido y vaciar el carrito
    Given que el usuario completo los datos de compra y llega a Revision
    When confirma el pedido
    Then ve el mensaje de pedido confirmado y un identificador
    And el carrito queda vacio
    And el contador vuelve a 0 al abrir la pagina principal

  Scenario: No confirmar una compra con el carrito vacio
    Given que el carrito esta vacio
    When el usuario intenta confirmar el pedido
    Then no se registra el pedido
```

### Casos disenados con diferencias en la pagina

```gherkin
Scenario: El identificador tiene diez caracteres despues de HGZ-
  When el usuario confirma una compra
  Then el identificador cumple el formato HGZ-XXXXXXXXXX

Scenario: Volver a comprar desde la confirmacion
  When el pedido queda confirmado
  Then se muestra un enlace "Seguir comprando"
```

Estos dos resultados no coinciden con la pagina actual: el identificador se genera con una longitud variable y el enlace que aparece dice "Ver Mis Pedidos". Quedan anotados como diferencias para revisar con el mentor.

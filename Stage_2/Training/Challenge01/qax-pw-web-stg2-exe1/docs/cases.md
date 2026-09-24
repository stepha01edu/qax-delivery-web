# Casos de prueba - QAXpert Bet

Estos casos se diseñaron a partir de los criterios de aceptacion del ejercicio.
Primero se documenta el comportamiento esperado. Algunos casos ya tienen una
automatizacion y otros solo quedaron diseñados para trabajarlos despues.

Saldo inicial para las pruebas: **COP 500,000**.

Total de casos documentados: **20**.

## Resumen de TC

| ID | Tipo | Caso de prueba | Prioridad |
| --- | --- | --- | --- |
| TC-01 | HP | Cargar los eventos disponibles | Alta |
| TC-02 | HP | Mostrar datos y cuotas de cada evento | Alta |
| TC-03 | HP | Agregar una cuota al ticket | Alta |
| TC-04 | HP | Recalcular odds al agregar dos eventos | Alta |
| TC-05 | UH | No duplicar la misma cuota | Media |
| TC-06 | HP | Mostrar el resumen de Mi Ticket | Alta |
| TC-07 | UH | Rechazar monto vacio | Alta |
| TC-08 | UH | Rechazar monto no numerico | Alta |
| TC-09 | UH | Rechazar monto mayor al saldo | Alta |
| TC-10 | UH | Cancelar el ticket y liberar los eventos | Media |
| TC-11 | HP | Abrir confirmacion con monto valido | Alta |
| TC-12 | HP | Mostrar monto y odds en la confirmacion | Alta |
| TC-13 | UH | Cancelar la confirmacion sin cambiar el saldo | Alta |
| TC-14 | HP | Confirmar apuesta y descontar el saldo | Alta |
| TC-15 | HP | Mostrar la apuesta en el historial | Alta |
| TC-16 | UH | Bloquear una apuesta mayor al saldo | Alta |
| TC-17 | HP | Recargar la billetera con un monto predefinido | Media |
| TC-18 | UH | Cancelar una apuesta desde el modal | Alta |
| TC-19 | HP | Consultar el historial con filtros y orden | Alta |
| TC-20 | HP | Agregar un evento por drag and drop | Alta |

`HP` significa Happy Path, cuando el resultado esperado es exitoso.
`UH` significa Unhappy Path, cuando se valida un rechazo o una situacion
negativa.

## Exercise 1

Los TC-01 a TC-15 corresponden al flujo y a los criterios del Exercise 1.

### Estado de los casos del Exercise 1

#### Casos cubiertos por la automatizacion actual

- **TC-03:** agregar una cuota al ticket.
- **TC-11:** abrir el modal de confirmacion.

Estos casos tienen pasos automatizados y fueron ejecutados dentro de
`tests/bet-flow.spec.ts`.

#### Casos con cobertura parcial

- **TC-01:** se valida que cargue el titulo, pero aun no se cuentan los 8 partidos.
- **TC-06:** se navega a Mi Ticket, pero no se validan todos los datos del resumen.
- **TC-14:** se valida el modal exitoso, pero no se confirma el nuevo saldo.

Estos casos tienen algunos pasos automatizados, pero aun no cubren todo lo
que indica su caso de prueba.

#### Casos documentados, pero no automatizados ni probados

Los siguientes casos solo estan diseñados en Gherkin. Todavia no tienen una
automatizacion ni una ejecucion de prueba:

- **TC-02:** mostrar datos y cuotas de cada evento.
- **TC-04:** recalcular odds al agregar dos eventos.
- **TC-05:** no duplicar la misma cuota.
- **TC-07:** rechazar monto vacio.
- **TC-08:** rechazar monto no numerico.
- **TC-09:** rechazar monto mayor al saldo.
- **TC-10:** cancelar el ticket y liberar los eventos.
- **TC-12:** mostrar monto y odds en la confirmacion.
- **TC-13:** cancelar la confirmacion sin cambiar el saldo.
- **TC-15:** mostrar la apuesta en el historial.

Estos casos quedan como diseño de pruebas para una siguiente ampliacion del
Exercise 1.

## Gherkin

### TC-01 - Cargar los eventos disponibles

```gherkin
Feature: Catalogo de eventos

  Scenario: Ver los partidos disponibles
    Given que el apostador abre QAXpert Bet
    Then la pagina muestra 8 partidos visibles
```

### TC-02 - Mostrar datos y cuotas de cada evento

```gherkin
Feature: Informacion de los eventos

  Scenario: Revisar la informacion de un partido
    Given que el apostador ve el catalogo de eventos
    When revisa un partido
    Then observa los equipos
    And observa la fecha y la hora
    And observa las cuotas Local, Empate y Visitante
```

### TC-03 - Agregar una cuota al ticket

```gherkin
Feature: Seleccion de eventos

  Scenario: Agregar una cuota al ticket lateral
    Given que el apostador ve los eventos disponibles
    When hace clic en una cuota de un partido
    Then el partido aparece en el ticket lateral
```

### TC-04 - Recalcular odds al agregar dos eventos

```gherkin
Feature: Odds combinadas

  Scenario: Actualizar las odds combinadas
    Given que el apostador agrego una cuota al ticket
    When agrega una cuota de un segundo partido
    Then las odds combinadas se recalculan automaticamente
```

### TC-05 - No duplicar la misma cuota

```gherkin
Feature: Seleccion repetida de eventos

  Scenario: Agregar dos veces la misma cuota
    Given que el apostador agrego una cuota al ticket
    When hace clic nuevamente en la misma cuota
    Then el evento no se duplica en el ticket
```

### TC-06 - Mostrar el resumen de Mi Ticket

```gherkin
Feature: Mi Ticket

  Scenario: Consultar el resumen de la apuesta
    Given que el apostador tiene eventos seleccionados
    When hace clic en "Mi Ticket"
    Then se muestra el resumen de los eventos
    And se muestra el monto de la apuesta
    And se muestran las odds combinadas
```

### TC-07 - Rechazar monto vacio

```gherkin
Feature: Validacion del monto

  Scenario: Intentar apostar sin ingresar un monto
    Given que el apostador tiene eventos en el ticket
    And se encuentra en la pagina Mi Ticket
    When deja el monto vacio
    And hace clic en "Realizar Apuesta"
    Then el sistema muestra un mensaje de validacion
    And no abre el modal de confirmacion
```

### TC-08 - Rechazar monto no numerico

```gherkin
Feature: Validacion del monto

  Scenario: Intentar apostar con un monto no numerico
    Given que el apostador tiene eventos en el ticket
    And se encuentra en la pagina Mi Ticket
    When escribe "abc" como monto
    And hace clic en "Realizar Apuesta"
    Then el sistema rechaza el monto
    And no abre el modal de confirmacion
```

### TC-09 - Rechazar monto mayor al saldo

```gherkin
Feature: Validacion de saldo

  Scenario: Intentar apostar mas dinero del disponible
    Given que el saldo del apostador es COP 500000
    And el apostador tiene eventos en el ticket
    When ingresa un monto de COP 600000
    And hace clic en "Realizar Apuesta"
    Then el sistema muestra un mensaje de fondos insuficientes
    And el saldo continua en COP 500000
```

### TC-10 - Cancelar el ticket y liberar los eventos

```gherkin
Feature: Cancelar ticket

  Scenario: Cancelar la seleccion de eventos
    Given que el apostador tiene eventos en Mi Ticket
    When cancela el ticket
    Then los eventos vuelven a estar disponibles para seleccionarlos
    And el ticket queda sin eventos
```

### TC-11 - Abrir confirmacion con monto valido

```gherkin
Feature: Confirmacion de apuesta

  Scenario: Mostrar la confirmacion antes de apostar
    Given que el apostador tiene eventos en el ticket
    And ingresa un monto valido menor o igual a COP 500000
    When hace clic en "Realizar Apuesta"
    Then se abre el modal de confirmacion
```

### TC-12 - Mostrar monto y odds en la confirmacion

```gherkin
Feature: Datos de confirmacion

  Scenario: Revisar los datos antes de confirmar
    Given que el modal de confirmacion esta abierto
    Then el modal muestra el monto ingresado
    And el modal muestra las odds combinadas
```

### TC-13 - Cancelar la confirmacion sin cambiar el saldo

```gherkin
Feature: Cancelar confirmacion

  Scenario: Cancelar la apuesta desde el modal
    Given que el modal de confirmacion esta abierto
    And el saldo del apostador es COP 500000
    When hace clic en "Cancelar"
    Then el modal de confirmacion se cierra
    And el ticket conserva sus eventos
    And el saldo continua en COP 500000
```

### TC-14 - Confirmar apuesta y descontar el saldo

```gherkin
Feature: Realizar apuesta

  Scenario: Confirmar una apuesta valida
    Given que el modal de confirmacion muestra un monto de COP 50000
    And el saldo del apostador es COP 500000
    When hace clic en "Confirmar"
    Then el saldo se descuenta a COP 450000
    And se muestra el modal de apuesta exitosa
```

### TC-15 - Mostrar la apuesta en el historial

```gherkin
Feature: Historial de apuestas

  Scenario: Consultar una apuesta confirmada
    Given que el apostador confirmo una apuesta de COP 50000
    When abre el historial de apuestas
    Then la apuesta aparece registrada
    And muestra el monto apostado
    And muestra el estado de la apuesta
```

## Challenge 1

Los TC-16 a TC-20 corresponden al Challenge 1.
Se automatizo un happy path por cada historia de usuario.

### TC-16 - Bloquear una apuesta mayor al saldo

```gherkin
Feature: Proteccion contra sobregiro

  Scenario: Intentar apostar mas dinero del disponible
    Given que el saldo del apostador es COP 500000
    And el apostador tiene un evento en el ticket
    When ingresa un monto de COP 600000
    Then el boton "Realizar Apuesta" queda deshabilitado
    And el sistema muestra visualmente que el monto excede el saldo
```

### TC-17 - Recargar la billetera con un monto predefinido

```gherkin
Feature: Recarga de billetera

  Scenario: Agregar fondos usando un monto preseleccionado
    Given que el saldo del apostador es COP 500000
    When selecciona el monto predefinido de COP 100000
    Then el monto de COP 100000 queda marcado como activo
    When hace clic en "Agregar Fondos"
    Then el saldo nuevo es COP 600000
    And el saldo nuevo coincide con el saldo anterior mas el monto agregado
```

### TC-18 - Cancelar una apuesta desde el modal

```gherkin
Feature: Cancelacion de apuesta

  Scenario: Cancelar la apuesta antes de confirmarla
    Given que el apostador tiene un evento y un monto valido en el ticket
    When abre el modal de confirmacion
    And hace clic en "Cancelar"
    Then la apuesta no se registra
    And el saldo conserva su valor anterior
    And la apuesta cancelada no aparece en el historial
```

### TC-19 - Consultar el historial con filtros y orden

```gherkin
Feature: Filtros del historial

  Scenario: Filtrar, ordenar y buscar apuestas registradas
    Given que existen dos apuestas en el historial
    When filtra por estado "Pendiente"
    Then solo se muestran apuestas con estado Pendiente
    When ordena por "Mayor monto"
    Then la apuesta de mayor monto aparece primero
    When busca por nombre de equipo
    Then solo se muestran las apuestas que coinciden con el equipo
```

### TC-20 - Agregar un evento por drag and drop

```gherkin
Feature: Drag and drop de eventos

  Scenario: Agregar un evento arrastrandolo al ticket
    Given que el apostador ve el catalogo de eventos
    When arrastra un evento hasta el ticket lateral
    Then el evento aparece en el ticket
    And se muestra la cuota del evento
    And las odds combinadas se recalculan
```

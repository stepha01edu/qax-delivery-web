# Casos de prueba - QAX PayLater

## CP01 - Titulo de la pagina

```gherkin
Caracteristica: Formulario de QAX PayLater

  Escenario: Verificar el titulo de la pagina
    Dado que la QA abre el formulario de solicitud
    Entonces el titulo contiene "QAX PayLater"
```

## CP02 - Carga del formulario y boton inicial

```gherkin
  Escenario: Revisar el formulario al cargar
    Dado que la QA abre el formulario de solicitud
    Entonces la seccion de datos personales esta visible
    Y el boton principal esta deshabilitado mientras los campos obligatorios estan vacios
```

## CP03 - Completar los campos obligatorios

```gherkin
  Escenario: Habilitar el boton con datos validos
    Dado que la QA abre el formulario de solicitud
    Cuando completa todos los campos obligatorios con datos validos
    Entonces el boton principal esta habilitado
```

## CP04 - Mantener el valor despues de salir del campo

```gherkin
  Escenario: Mantener el nombre ingresado
    Dado que la QA escribe un nombre en el campo Nombres
    Cuando sale del campo
    Entonces el campo conserva el nombre ingresado
```

## CP05 - Editar varias veces un campo

```gherkin
  Escenario: Cambiar el contenido del campo Nombres
    Dado que la QA escribe un nombre en el campo Nombres
    Cuando cambia el texto del campo mas de una vez
    Entonces el campo permite guardar el nuevo texto
```

## CP06 - Validar el campo numerico

```gherkin
  Escenario: Rechazar letras y aceptar digitos en Ingreso Mensual
    Dado que la QA abre el formulario de solicitud
    Cuando intenta escribir letras en Ingreso Mensual
    Entonces el campo no conserva las letras
    Cuando escribe un monto numerico permitido
    Entonces el campo conserva el monto ingresado
```

## CP07 - Enviar el formulario con datos validos

```gherkin
  Escenario: Guardar los datos personales
    Dado que la QA completa todos los campos obligatorios con datos validos
    Cuando selecciona Continuar a Verificacion
    Entonces aparece un mensaje indicando que los datos se guardaron
    Y se abre el paso de verificacion
```

## CP08 - Enviar el formulario vacio

```gherkin
  Escenario: Mostrar errores visuales en los campos obligatorios vacios
    Dado que la QA abre el formulario sin completar los campos
    Cuando intenta enviar el formulario
    Entonces cada campo obligatorio vacio muestra un borde rojo
```

Este caso esta disenado, pero queda omitido con `test.skip` porque el ejercicio
indica que requiere un mock que todavia no esta construido.

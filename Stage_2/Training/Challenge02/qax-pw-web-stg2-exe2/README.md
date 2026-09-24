# Exercise 2 y Challenge 2 - QAX Forms

En este proyecto se prueban alertas, modales e iframes de QAX Forms usando
Playwright. Tambien se revisan dos recorridos que combinan esas partes.

## Que se prueba

- Aceptar y cancelar alertas del navegador.
- Escribir texto en un prompt o cancelarlo.
- Abrir, confirmar y cerrar modales.
- Leer el contenido de un iframe simple.
- Usar las alertas, los modales y el iframe en una misma prueba.

Los casos estan escritos en Gherkin en
[`docs/challenge-2-cases.md`](docs/challenge-2-cases.md). Las pruebas estan en
[`tests/challenge-2.spec.ts`](tests/challenge-2.spec.ts).

## Requisitos

- Node.js 18 o superior
- pnpm
- Playwright

## Instalacion

```bash
pnpm install
pnpm exec playwright install chromium
```

## Ejecutar las pruebas

Para ejecutar todos los archivos de prueba del proyecto, usando un worker:

```bash
pnpm exec playwright test --workers=1
```

Para ejecutar solo los casos del Challenge 2:

```bash
pnpm exec playwright test tests/challenge-2.spec.ts --workers=1
```

Para abrir el reporte de Playwright:

```bash
pnpm report
```

## Resultado de la ultima ejecucion

En la ultima ejecucion de todos los archivos pasaron 13 pruebas y 8 quedaron
omitidas porque estan marcadas como `fixme`. En el Challenge 2 pasaron 5 y se
omitio el caso del iframe anidado.

## Videos de evidencia

Playwright graba un video por cada prueba que ejecuta. Los videos originales
quedan en `test-results/`. Se guardaron copias de los cinco videos del
Challenge 2 en `evidence/videos/`:

- HU-01 - Alertas: [ver video](evidence/videos/hu-01-alertas.webm)
- HU-02 - Modales: [ver video](evidence/videos/hu-02-modales.webm)
- HU-03 - Iframe simple: [ver video](evidence/videos/hu-03-iframe-simple.webm)
- HU-04 - Flujo con confirmacion: [ver video](evidence/videos/hu-04-flujo-confirmado.webm)
- HU-04 - Flujo con cancelacion: [ver video](evidence/videos/hu-04-flujo-cancelado.webm)

El iframe anidado no tiene video porque su prueba quedo omitida por el bug de
la pagina indicado abajo.

## Problemas encontrados

### BUG-001 - La alerta deja la prueba esperando

- **Donde ocurre:** en `utils/dialogUtils.ts`, al intentar aceptar una alerta.
- **Que pasa:** la prueba espera que termine el clic antes de cerrar la alerta.
  El clic queda esperando mientras la alerta esta abierta.
- **Resultado esperado:** aceptar la alerta y continuar con la prueba.
- **Resultado obtenido:** la prueba se queda esperando.
- **Estado:** las pruebas ajustadas de `tests/alerts-fix.spec.ts` muestran el
  orden que permite cerrar la alerta y seguir.

### BUG-002 - El localizador encuentra mas de un texto en el iframe simple

- **Donde ocurre:** en la prueba original de `tests/iframes.spec.ts`.
- **Que pasa:** el texto `Términos y Condiciones` aparece mas de una vez y la
  prueba no sabe cual elemento revisar.
- **Resultado esperado:** encontrar un solo elemento y revisar que este visible.
- **Resultado obtenido:** Playwright indica que encontro dos elementos.
- **Estado:** la prueba original quedo como `fixme`. En
  `tests/iframes-fix.spec.ts` se usa un localizador mas especifico.

### BUG-003 - QAX Forms no carga el iframe hijo

- **Tipo:** bug de la pagina de practica, no de la prueba.
- **Donde ocurre:** pestana `3. Frames`, dentro del iframe padre `#parentIframe`.
- **Como reproducirlo:** abrir la pestana Frames y hacer clic en
  `Cargar Iframe Hijo`.
- **Resultado esperado:** aparece el iframe hijo con el campo `#childInput`.
- **Resultado obtenido:** la pagina muestra el error `loadChildFrame is not
  defined`. El iframe hijo y el campo no aparecen.
- **Impacto:** no se puede escribir en el iframe hijo ni comprobar el mensaje
  que pide la HU-03.
- **Estado:** el caso esta como `fixme` en `tests/challenge-2.spec.ts` hasta
  que corrijan la pagina de practica.

## Archivos principales

- `tests/challenge-2.spec.ts`: pruebas nuevas de las cuatro historias.
- `docs/challenge-2-cases.md`: casos escritos en Gherkin.
- `tests/alerts-fix.spec.ts`: pruebas de alertas con el orden corregido.
- `tests/iframes-fix.spec.ts`: prueba del iframe simple con un localizador mas
  especifico; el iframe anidado sigue pendiente por BUG-003.
- `utils/navigation.ts`: funcion corta para abrir una pestana de QAX Forms.
- `utils/dialogUtils.ts`: funciones de apoyo para aceptar o cancelar alertas.
- `playwright.config.ts`: indica que se usa Chromium y que se graban los videos.

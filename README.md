<p align="center">
  <img src="assets/qax-logo.png" alt="QAX Logo" />
</p>

# Portafolio de automatizacion web

Este repositorio es el espacio de trabajo para guardar las entregas
del modulo Web de QAX.

Aqui se documentael proceso de automatizacion paso a paso. Por eso cada proyecto busca
mostrar de forma clara que se probo, como se ejecuto y que resultado se obtuvo.

## Proposito del repositorio

En este repositorio se guardan ejercicios y proyectos de pruebas web con
Playwright. El trabajo puede incluir:

- Pruebas de login.
- Validaciones de paginas y formularios.
- Busqueda de elementos con localizadores.
- Uso de arrays y ciclos sencillos para no repetir validaciones.
- Evidencias de las pruebas cuando sean solicitadas.
- Documentacion de cada entrega.

## Tecnologias usadas

- TypeScript.
- Playwright.
- Node.js.
- pnpm.
- Google Chrome.
- Git y GitHub.

## Estructura del repositorio

```text
qax-delivery-web/
├── Stage_1/
│   ├── Challenge/
│   │   └── README.md
│   ├── Mission/
│   │   └── README.md
│   └── Quick_Task/
│       └── README.md
├── assets/
│   └── qax-logo.png
├── .gitignore
├── LICENSE
├── QAX-CERT.md
└── README.md
```

Cada entrega se coloca dentro de la carpeta que corresponda:

- `Challenge`: retos practicos del modulo.
- `Mission`: trabajos mas completos del modulo.
- `Quick_Task`: tareas pequenas para practicar un tema puntual.

## Como se organiza cada proyecto

Cada proyecto de automatizacion debe tener sus propios archivos. Por ejemplo:

```text
nombre-del-proyecto/
├── tests/
├── README.md
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

El README de cada proyecto debe explicar:

- Que se esta probando.
- Que pagina o flujo se automatizo.
- Como instalar las dependencias.
- Como ejecutar la prueba.
- Que resultado se espera.
- Donde se encuentran las evidencias, si fueron solicitadas.

## Como ejecutar un proyecto web

Los comandos se ejecutan dentro de la carpeta del proyecto, no desde la raiz
del repositorio. Los pasos normales son:

```bash
pnpm install
npx playwright install chromium
pnpm test
```

Para ver el navegador durante la prueba:

```bash
pnpm test:headed
```

Cada proyecto puede tener comandos adicionales explicados en su propio
`README.md`.

## Forma de trabajo con Git

Para cada entrega se trabaja con una rama propia:

1. Actualizar la rama `main`.
2. Crear una rama nueva desde `main`.
3. Realizar los cambios del proyecto.
4. Ejecutar y revisar las pruebas localmente.
5. Hacer un commit con un mensaje claro.
6. Subir la rama al repositorio personal.
7. Crear un Pull Request hacia la rama que indique el equipo.

Ejemplos de nombres de ramas:

```text
stage1/challenge/login-web
stage1/mission/validaciones-dashboard
stage1/quicktask/localizadores
```

Ejemplos de commits:

```text
feat: add web login test
test: add dashboard validations
docs: update project readme
```

## Archivos que no se deben subir

No se deben subir archivos generados o datos personales, por ejemplo:

- `node_modules/`
- `test-results/`
- `playwright-report/`
- archivos `.env` con datos reales
- contrasenas o tokens

Las reglas para ignorar estos archivos se encuentran en `.gitignore`.

## Entregas

Antes de crear el Pull Request, la QA debe revisar que:

- La prueba este dentro de la carpeta correcta.
- El proyecto tenga su README actualizado.
- Los nombres de los archivos sean claros.
- La prueba se haya ejecutado correctamente, si la entrega lo solicita.
- Las evidencias esten incluidas cuando sean parte del requisito.
- No se hayan subido credenciales ni archivos personales.

## Carpetas del modulo

- [Stage 1 - Challenge](Stage_1/Challenge/README.md)
- [Stage 1 - Mission](Stage_1/Mission/README.md)
- [Stage 1 - Quick Task](Stage_1/Quick_Task/README.md)

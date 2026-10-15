# Quick Task - Stage 4: Codegen, servidor mock y Postman

## Estado de la entrega

Esta es la entrega final del Quick Task. La Parte 2 incluye el servidor mock, la coleccion de Postman y las capturas de las peticiones realizadas desde Postman.

En la Parte 1 se intento grabar el recorrido de compra en Mercado Libre, pero la verificacion de seguridad para confirmar que la persona no es un robot no permitio continuar. El bloqueo queda documentado como **BUG-01** y se incluye una captura como evidencia. Por este motivo, el flujo real no pudo grabarse y el caso de prueba permanece marcado como `test.fixme`.

## Parte 1: Codegen en Mercado Libre

El recorrido solicitado es buscar un producto, abrirlo, iniciar la compra y llegar hasta la pantalla de pagos. No se debe confirmar ni pagar una compra.

### BUG-01 - La verificacion humana bloquea la grabacion con Codegen

- **Pagina probada:** Mercado Libre Colombia.
- **Resultado esperado:** poder buscar un producto y avanzar por las pantallas del proceso de compra hasta pagos.
- **Resultado obtenido:** Mercado Libre muestra el mensaje "Por seguridad, completa este paso" y la verificacion "No soy un robot". El boton para continuar queda bloqueado y no permite avanzar.
- **Impacto:** Codegen no pudo grabar el recorrido completo; por lo tanto, no se genero el codigo real de la automatizacion solicitada.
- **Estado:** pendiente de revision con el mentor o de una alternativa autorizada para practicar. No se intento evitar la verificacion.
- **Evidencia:** [Mercadolibre_error.png](evidencias/Mercadolibre_error.png).

El archivo `tests/mercado-libre.spec.ts` queda con `test.fixme` mientras no se pueda grabar el recorrido real. La utilidad `utils/user-data.ts` contiene las funciones para crear un nombre y un correo dinamicos, para usarlos si el flujo los solicita.

## Parte 2: Servidor mock

El servidor esta en `server.js` y usa Express. Los datos se guardan en memoria: al detener y volver a iniciar el servidor, se cargan los datos iniciales otra vez.

Desde esta carpeta, instala las dependencias y levanta el servidor:

```bash
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`. Para detenerlo, vuelve a la terminal y presiona `Ctrl + C`.

### Servicios disponibles

**Users**

- `GET /api/users`: obtiene todos los usuarios.
- `GET /api/users/:id`: obtiene un usuario por ID; si no existe, responde con 404.
- `POST /api/users`: crea un usuario.
- `DELETE /api/users/:id`: elimina un usuario.

**Products**

- `GET /api/products`: obtiene todos los productos.
- `POST /api/products`: crea un producto.
- `DELETE /api/products/:id`: elimina un producto.

**Orders**

- `GET /api/orders`: obtiene todas las ordenes.
- `POST /api/orders`: crea una orden con fecha y estado inicial `pendiente`.
- `PUT /api/orders/:id`: actualiza una orden; si no existe, responde con 404.

## Coleccion de Postman

El archivo `mi-servidor-mock.postman_collection.json` se puede importar en Postman. La coleccion se llama **Mi Servidor Mock - Stage 4** y utiliza `base_url` con el valor `http://localhost:3000`. Las peticiones POST y PUT tienen un body JSON de ejemplo y no incluyen scripts.

Para probar una eliminacion sin borrar los datos iniciales, ejecuta primero el POST correspondiente y luego el DELETE. La coleccion usa el ID 3 para el primer recurso nuevo.

## Evidencias

Las capturas se tomaron en las aplicaciones correspondientes y estan dentro de `evidencias/`. La primera pertenece a la Parte 1; las demas muestran las peticiones manuales de la Parte 2 en Postman.

### Parte 1 - Mercado Libre

| Captura | Que muestra |
| --- | --- |
| [Mercadolibre_error.png](evidencias/Mercadolibre_error.png) | Codegen abierto con Mercado Libre Colombia y la verificacion humana que impidio continuar. Corresponde al BUG-01. |

### Parte 2 - Users

| Captura | Que muestra |
| --- | --- |
| [Get_users.png](evidencias/Get_users.png) | GET de todos los usuarios. |
| [Get_userID.png](evidencias/Get_userID.png) | GET de un usuario por ID. |
| [Post_user.png](evidencias/Post_user.png) | POST para crear un usuario. |
| [Delete_user.png](evidencias/Delete_user.png) | DELETE para eliminar un usuario. |
| [Get_user_inex.png](evidencias/Get_user_inex.png) | GET de un usuario inexistente; respuesta 404. |

### Parte 2 - Products

| Captura | Que muestra |
| --- | --- |
| [get_prod.png](evidencias/get_prod.png) | GET de todos los productos. |
| [post_pro.png](evidencias/post_pro.png) | POST para crear un producto. |
| [Del_pro.png](evidencias/Del_pro.png) | DELETE para eliminar un producto. |
| [Get_pro_inex.png](evidencias/Get_pro_inex.png) | GET a `/api/products/999`; responde 404 porque el servidor no tiene una ruta GET por ID para Products. |

### Parte 2 - Orders

| Captura | Que muestra |
| --- | --- |
| [Get_or.png](evidencias/Get_or.png) | GET de todas las ordenes. |
| [Post_or.png](evidencias/Post_or.png) | POST para crear una orden. |
| [Put_or.png](evidencias/Put_or.png) | PUT para actualizar una orden. |
| [Put_or_inex.png](evidencias/Put_or_inex.png) | PUT de una orden inexistente; respuesta 404. |

La lista de servicios del ejercicio no define todos los metodos HTTP para cada carpeta. Por eso la coleccion incluye los metodos solicitados para cada servicio: Users no tiene PUT, Products no tiene PUT y Orders no tiene DELETE.

## Archivos del proyecto

- `server.js`: servidor mock con los servicios de Users, Products y Orders.
- `mi-servidor-mock.postman_collection.json`: peticiones listas para importar en Postman.
- `tests/mercado-libre.spec.ts`: caso de Mercado Libre marcado como `test.fixme` por el BUG-01.
- `utils/user-data.ts`: funciones para generar un nombre y un correo dinamicos.
- `evidencias/`: capturas del bloqueo de Mercado Libre y de las peticiones de Postman.

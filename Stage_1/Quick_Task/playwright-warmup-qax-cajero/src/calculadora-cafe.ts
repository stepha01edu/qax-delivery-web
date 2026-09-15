// ============================================================
// CALCULADORA DE CAFÉ
// ============================================================

// PASO 1: Importar readline para leer datos del teclado
import * as readline from 'readline';

// PASO 2: Configurar la interfaz de entrada/salida
const rl = readline.createInterface({
  input: process.stdin,  // leer del teclado
  output: process.stdout // escribir en pantalla
});

// PASO 3: Definir tipos con interfaces
// Una interfaz describe la forma que debe tener un objeto
interface Producto {
  codigo: string;
  nombre: string;
  precio: number;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

// PASO 4: Crear el menú de productos (array de objetos)
const menu: Producto[] = [
  { codigo: '1', nombre: 'Espresso',    precio: 2.50 },
  { codigo: '2', nombre: 'Cappuccino',  precio: 3.50 },
  { codigo: '3', nombre: 'Latte',       precio: 4.00 },
  { codigo: '4', nombre: 'Mocha',       precio: 4.50 }
];

// PASO 5: Inicializar el carrito de compras vacío
const carrito: ItemCarrito[] = [];

// PASO 6: Función para preguntar al usuario (devuelve una Promise)
// Esto es necesario porque readline trabaja con callbacks
function preguntar(pregunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta); // cuando el usuario escriba, devolvemos su respuesta
    });
  });
}

// PASO 7: Función principal (async porque usaremos await)
async function main() {
  console.log('=== CAFETERÍA QAX ===');
  console.log();

  let pedirMas = true;

  // Bucle principal: se repite hasta que el usuario diga "no"
  while (pedirMas) {

    // Mostrar el menú de opciones
    console.log('--- MENÚ DE CAFÉS ---');
    for (const prod of menu) {
      console.log(`${prod.codigo}. ${prod.nombre} - $${prod.precio.toFixed(2)}`);
    }
    console.log('---------------------');

    // Pedir al usuario que seleccione un café
    const opcion = await preguntar('Selecciona un café (1-4): ');

    // Buscar el producto en el menú
    const productoSeleccionado = menu.find(p => p.codigo === opcion);

    if (productoSeleccionado) {
      // Preguntar cantidad
      const cantidadTexto = await preguntar('¿Cuántos? ');
      const cantidad = parseInt(cantidadTexto);

      if (cantidad > 0) {
        // Agregar al carrito
        carrito.push({ producto: productoSeleccionado, cantidad });
        console.log(`✅ Agregado: ${cantidad}x ${productoSeleccionado.nombre}`);
      } else {
        console.log('❌ Cantidad inválida');
      }
    } else {
      console.log('❌ Opción no válida');
    }

    // Preguntar si quiere seguir comprando
    const respuesta = await preguntar('¿Algo más? (s/n): ');
    pedirMas = respuesta.toLowerCase() === 's';
    console.log();
  }

  // PASO 8: Mostrar resumen final
  console.log('=== RESUMEN DE COMPRA ===');
  let total = 0;

  for (const item of carrito) {
    const subtotal = item.producto.precio * item.cantidad;
    total = total + subtotal;
    console.log(`${item.cantidad}x ${item.producto.nombre} = $${subtotal.toFixed(2)}`);
  }

  console.log('-------------------------');
  console.log(`TOTAL: $${total.toFixed(2)}`);

  // Cerrar la interfaz de readline
  rl.close();
}

// PASO 9: Ejecutar la función principal
main();

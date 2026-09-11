// ============================================================
// QUICK TASK: CAJERO AUTOMATICO QAX
// ============================================================

// Importa readline para leer datos escritos en la terminal.
import * as readline from 'readline';

// Crea la entrada y salida que usara el programa para conversar con la persona. la cuañ sera todo por la terminal.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Describe los datos basicos de una cuenta bancaria.
interface Cuenta {
  numero: string;
  titular: string;
  saldo: number;
}

// Describe un movimiento realizado sobre una cuenta.
interface Transaccion {
  cuenta: string;
  tipo: string;
  monto: number;
  saldoFinal: number;
}

// Guarda las cuentas que se registran durante la ejecucion.
const cuentas: Cuenta[] = [];

// Guarda el historial de aperturas, consultas, depositos y retiros.
const transacciones: Transaccion[] = [];

// Hace una pregunta y devuelve la respuesta sin espacios al inicio o al final.
function preguntar(pregunta: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(pregunta, (respuesta) => {
      resolve(respuesta.trim());
    });
  });
}

// Comprueba que el numero de cuenta tenga exactamente cuatro digitos.
function esNumeroValido(numero: string): boolean {
  const valorNumerico = parseInt(numero, 10);
  return numero.length === 4 && !Number.isNaN(valorNumerico);
}

// Registra el estado de una cuenta despues de una operacion.
function registrarTransaccion(
  cuenta: Cuenta,
  tipo: string,
  monto: number,
): void {
  transacciones.push({
    cuenta: cuenta.numero,
    tipo,
    monto,
    saldoFinal: cuenta.saldo,
  });
}

// Solicita y valida los datos de las cuentas antes de operar con ellas.
async function registrarCuentas(): Promise<boolean> {
  console.log('\n=== REGISTRO DE CUENTAS ===');
  console.log('Puedes registrar hasta 10 cuentas. Escribe 000 para continuar.');

  while (cuentas.length < 10) {
    // Permite salir del registro escribiendo 000.
    const numero = await preguntar('Número de cuenta (4 dígitos): ');

    if (numero === '000') {
      return true;
    }

    if (!esNumeroValido(numero)) {
      console.log('El número de cuenta debe tener 4 dígitos.');
      continue;
    }

    // Evita registrar dos veces el mismo numero de cuenta.
    const cuentaExistente = cuentas.find((cuenta) => cuenta.numero === numero);

    if (cuentaExistente) {
      console.log('Ya existe una cuenta con ese número.');
      continue;
    }

    // Solicita el nombre y el saldo inicial de la cuenta.
    const titular = await preguntar('Nombre del titular: ');
    const saldoTexto = await preguntar('Saldo inicial: ');
    const saldoInicial = parseFloat(saldoTexto);

    if (Number.isNaN(saldoInicial) || saldoInicial < 0) {
      console.log('El saldo inicial debe ser un número mayor o igual a cero.');
      continue;
    }

    // Crea la cuenta usando los datos validados.
    const nuevaCuenta: Cuenta = {
      numero,
      titular,
      saldo: saldoInicial,
    };

    // Guarda la cuenta y registra su apertura en el historial.
    cuentas.push(nuevaCuenta);
    registrarTransaccion(nuevaCuenta, 'Apertura', saldoInicial);
    console.log(`Cuenta ${numero} registrada correctamente.`);
  }

  console.log('Se alcanzó el máximo de 10 cuentas.');
  return true;
}

// Ejecuta la operacion seleccionada para una cuenta existente.
async function operarCuenta(cuenta: Cuenta, opcion: string): Promise<void> {
  if (opcion === '1') {
    // La consulta solo muestra el saldo y registra el movimiento.
    console.log(`Saldo de ${cuenta.titular}: $${cuenta.saldo.toFixed(2)}`);
    registrarTransaccion(cuenta, 'Consulta', 0);
  } else if (opcion === '2') {
    // Solicita el monto y valida que el deposito sea positivo.
    const montoTexto = await preguntar('Monto a depositar: ');
    const monto = parseFloat(montoTexto);

    if (Number.isNaN(monto) || monto <= 0) {
      console.log('El depósito debe ser mayor a cero.');
      return;
    }

    // Actualiza el saldo y guarda el deposito en el historial.
    cuenta.saldo = cuenta.saldo + monto;
    registrarTransaccion(cuenta, 'Depósito', monto);
    console.log(`Depósito realizado. Nuevo saldo: $${cuenta.saldo.toFixed(2)}`);
  } else if (opcion === '3') {
    // Solicita el monto y valida las reglas del retiro.
    const montoTexto = await preguntar('Monto a retirar: ');
    const monto = parseFloat(montoTexto);

    if (Number.isNaN(monto) || monto <= 0) {
      console.log('El retiro debe ser mayor a cero.');
      return;
    }

    if (monto > 10_000) {
      console.log('Límite de retiro excedido');
      return;
    }

    if (monto > cuenta.saldo) {
      console.log('Fondos insuficientes');
      return;
    }

    // Descuenta el monto y guarda el retiro en el historial.
    cuenta.saldo = cuenta.saldo - monto;
    registrarTransaccion(cuenta, 'Retiro', monto);
    console.log(`Retiro realizado. Nuevo saldo: $${cuenta.saldo.toFixed(2)}`);
  } else {
    console.log('Opción no válida.');
  }
}

// Muestra todos los movimientos y suma los saldos finales.
function mostrarResumen(): void {
  console.log('\n=== RESUMEN DE TRANSACCIONES ===');

  for (const transaccion of transacciones) {
    console.log(
      `${transaccion.cuenta} | ${transaccion.tipo} | ` +
      `$${transaccion.monto.toFixed(2)} | ` +
      `Saldo: $${transaccion.saldoFinal.toFixed(2)}`,
    );
  }

  let totalCuentas = 0;

  // Recorre las cuentas para calcular el total general.
  for (const cuenta of cuentas) {
    totalCuentas = totalCuentas + cuenta.saldo;
  }

  console.log('-------------------------------');
  console.log(`Total de todas las cuentas: $${totalCuentas.toFixed(2)}`);
}

// Coordina el registro de cuentas, las operaciones y el resumen final.
async function main(): Promise<void> {
  console.log('=== CAJERO AUTOMÁTICO QAX ===');

  // Primero se registran las cuentas que podran usarse en el cajero.
  await registrarCuentas();

  if (cuentas.length === 0) {
    // Si no hay cuentas, se omite mostrar el menu de operaciones.
    console.log('No se registraron cuentas.');
    rl.close();
    return;
  }

  let continuar = true;

  while (continuar) {
    // Muestra las opciones disponibles en cada vuelta del menu.
    console.log('\n--- MENÚ DE OPERACIONES ---');
    console.log('1. Consultar saldo');
    console.log('2. Depositar');
    console.log('3. Retirar');
    console.log('000. Finalizar');

    const opcion = await preguntar('Selecciona una opción: ');

    if (opcion === '000') {
      // Finaliza el cajero cuando la persona escribe 000.
      continuar = false;
      continue;
    }

    const numeroCuenta = await preguntar('Número de cuenta (000 para finalizar): ');

    if (numeroCuenta === '000') {
      // Tambien permite finalizar despues de elegir una operacion.
      continuar = false;
      continue;
    }

    const cuenta = cuentas.find((item) => item.numero === numeroCuenta);

    if (!cuenta) {
      console.log('Cuenta no encontrada.');
      continue;
    }

    // Ejecuta la operacion elegida sobre la cuenta encontrada.
    await operarCuenta(cuenta, opcion);
  }

  // Al terminar, muestra el historial y el total de las cuentas.
  mostrarResumen();
  rl.close();
}

main();

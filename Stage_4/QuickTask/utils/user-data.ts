// Crea un nombre distinto para usar en el recorrido de compra.
export function generateRandomName(): string {
  return `QA_User_${Date.now()}`;
}

// Crea un correo distinto para usar en el recorrido de compra.
export function generateRandomEmail(): string {
  return `qa_${Date.now()}@test.com`;
}

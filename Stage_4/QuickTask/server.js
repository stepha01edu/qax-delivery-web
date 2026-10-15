// Importamos Express para crear las rutas del servidor.
const express = require('express');

// Creamos el servidor y le indicamos que pueda leer datos enviados en formato JSON.
const app = express();
app.use(express.json());

// Estas listas guardan los datos mientras el servidor esta encendido.
// Al detener y volver a iniciar el servidor, se cargan estos datos iniciales otra vez.

// Estos usuarios sirven para practicar las peticiones de Users en Postman.
let users = [
  { id: 1, nombre: 'QA User Uno', email: 'qa_user_1@test.com' },
  { id: 2, nombre: 'QA User Dos', email: 'qa_user_2@test.com' }
];

// Estos productos sirven para practicar GET, POST y DELETE en Postman.
let products = [
  { id: 1, nombre: 'Laptop', precio: 2500000, categoria: 'tecnologia' },
  { id: 2, nombre: 'Mouse', precio: 50000, categoria: 'tecnologia' }
];

// Las ordenes empiezan vacias y se agregan al enviar una peticion POST.
let orders = [];

// Devuelve la lista completa de usuarios.
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Busca el usuario que tenga el ID escrito al final de la URL, Si lo encuentra, responde con sus datos; si no, devuelve un error 404.
app.get('/api/users/:id', (req, res) => {
  const user = users.find((item) => item.id === parseInt(req.params.id));

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
});

// Recibe los datos de un usuario desde el body de Postman, Le asigna un ID, lo guarda en la lista y responde con estado 201 porque se creo.
app.post('/api/users', (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Quita de la lista el usuario cuyo ID aparece en la URL.
app.delete('/api/users/:id', (req, res) => {
  users = users.filter((user) => user.id !== parseInt(req.params.id));
  res.json({ message: 'Usuario eliminado' });
});

// Devuelve todos los productos que estan guardados en la lista.
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Recibe los datos de un producto desde el body de Postman, le asigna un ID, lo guarda en la lista y responde con estado 201 porque se creo.
app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Quita de la lista el producto cuyo ID aparece en la URL.
app.delete('/api/products/:id', (req, res) => {
  products = products.filter((product) => product.id !== parseInt(req.params.id));
  res.json({ message: 'Producto eliminado' });
});

// Devuelve todas las ordenes registradas.
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Recibe los datos de una orden desde el body de Postman, el servidor agrega el ID, la fecha y el estado inicial antes de guardarla.
app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    ...req.body,
    fecha: new Date().toISOString(),
    estado: 'pendiente'
  };
  orders.push(newOrder);
  res.status(201).json(newOrder);
});

// Busca una orden por el ID de la URL y actualiza los datos enviados en el body.
// Si ese ID no existe, responde con un error 404.
app.put('/api/orders/:id', (req, res) => {
  const order = orders.find((item) => item.id === parseInt(req.params.id));

  if (order) {
    Object.assign(order, req.body);
    res.json(order);
  } else {
    res.status(404).json({ error: 'Orden no encontrada' });
  }
});

// Deja el servidor escuchando en el puerto 3000 para recibir las peticiones.
app.listen(3000, () => {
  console.log('Servidor mock disponible en http://localhost:3000');
});

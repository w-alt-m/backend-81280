*Read this in English: [English 🇬🇧](README.md)*

# Backend de E-Commerce & Aplicación Web

Plataforma backend de comercio electrónico construida con **Node.js**, **Express**, **MongoDB** (a través de Mongoose), **Handlebars** y **Socket.IO**. La aplicación ofrece una API RESTful completa para la gestión de productos y carritos de compra, además de vistas dinámicas renderizadas con Handlebars y sincronización en tiempo real mediante WebSockets.

---

## 🚀 Características

- **API RESTful**: Operaciones CRUD completas para productos y carritos de compras.
- **Integración con Base de Datos**: Conexión y modelos de MongoDB gestionados a través del ODM Mongoose.
- **Renderizado del Lado del Servidor**: Plantillas HTML dinámicas generadas con Handlebars y estilizadas con Bootstrap 5.
- **Actualización en Tiempo Real**: Sincronización instantánea en la interfaz mediante Socket.IO al crear o eliminar productos.
- **Paginación y Popularización**: Listado paginado de productos y popularización (`populate`) de referencias en los carritos de compras.

---

## 🛠️ Tecnologías y Librerías

- **Entorno de Ejecución**: [Node.js](https://nodejs.org/) (Módulos ES)
- **Framework Web**: [Express.js](https://expressjs.com/) (v5)
- **Base de Datos y ODM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Motor de Plantillas**: [Express-Handlebars](https://github.com/express-handlebars/express-handlebars)
- **Comunicación en Tiempo Real**: [Socket.IO](https://socket.io/)
- **Estilos UI**: [Bootstrap 5](https://getbootstrap.com/) (vía CDN)
- **Variables de Entorno**: [Dotenv](https://github.com/motdotla/dotenv)

---

## ⚙️ Instalación y Ejecución

### Requisitos Previos

- [Node.js](https://nodejs.org/) (v18+ recomendado)
- Una instancia activa de [MongoDB](https://www.mongodb.com/) o un clúster en MongoDB Atlas.

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=8080
MONGO_URI=tu_cadena_de_conexion_mongodb
```

### 3. Scripts de Inicio

- **Modo Producción**:
  ```bash
  npm start
  ```
- **Modo Desarrollo** (con recarga automática mediante `node --watch`):
  ```bash
  npm run dev
  ```

Una vez iniciado el servidor, accede a la aplicación en `http://localhost:8080`.

---

## 📁 Estructura del Proyecto

```text
backend-81280/
├── public/
│   └── js/
│       └── realtime.js        # Script cliente de Socket.IO
├── src/
│   ├── config/
│   │   └── database.js        # Conexión a MongoDB
│   ├── controllers/
│   │   ├── cart.controller.js # Lógica de los endpoints del carrito
│   │   └── product.controller.js # Lógica de los endpoints de productos
│   ├── models/
│   │   ├── cart.model.js      # Esquema de Mongoose para Carritos
│   │   └── product.model.js   # Esquema de Mongoose para Productos
│   ├── routes/
│   │   ├── carts.router.js    # Rutas API de carritos
│   │   ├── products.router.js # Rutas API de productos
│   │   └── views.router.js    # Rutas de vistas Handlebars
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars # Plantilla base con Bootstrap
│   │   ├── cart.handlebars       # Vista del carrito de compras
│   │   ├── productDetail.handlebars # Vista de detalle de producto
│   │   ├── products.handlebars   # Vista del catálogo de productos
│   │   └── realTimeProducts.handlebars # Vista de productos en tiempo real
│   └── app.js                 # Punto de entrada de la aplicación Express
├── .env                       # Variables de entorno
├── package.json               # Configuración del proyecto y scripts
├── README.md                  # Documentación en Inglés
└── README.es.md               # Documentación en Español
```

---

## 🖥️ Vistas Renderizadas

| Ruta | Descripción |
|---|---|
| `GET /` | Redirige automáticamente a `/products`. |
| `GET /products` | Muestra el catálogo paginado de productos (soporta parámetros de consulta `?limit=X&page=Y`). |
| `GET /products/:limit/:page` | Catálogo paginado de productos mediante parámetros en la URL. |
| `GET /products/:pid` | Muestra la información detallada de un producto específico. |
| `GET /carts/:cid` | Muestra la vista del carrito con el detalle completo de productos y precios unitarios. |
| `GET /realtimeproducts` | Muestra la lista de productos actualizada en tiempo real mediante Socket.IO. |

---

## 📡 Endpoints de la API

### Productos (`/api/products`)

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/products` | Obtiene la lista de productos (admite `?limit=` y `?page=`). |
| `GET` | `/api/products/:limit/:page` | Obtiene productos paginados según parámetros en la URL. |
| `GET` | `/api/products/:pid` | Obtiene los detalles de un producto por su ID. |
| `POST` | `/api/products` | Crea un nuevo producto (emite actualización en tiempo real por WebSockets). |
| `PUT` | `/api/products/:pid` | Actualiza los datos de un producto por su ID. |
| `DELETE` | `/api/products/:pid` | Elimina un producto por su ID (emite actualización en tiempo real por WebSockets). |

### Carritos (`/api/carts`)

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/carts` | Crea un nuevo carrito vacío. |
| `GET` | `/api/carts/:cid` | Obtiene un carrito por ID con la información de los productos popularizada. |
| `POST` | `/api/carts/:cid/products/:pid` | Agrega un producto a un carrito (o incrementa su cantidad). |
| `PUT` | `/api/carts/:cid` | Reemplaza el arreglo completo de productos de un carrito. |
| `PUT` | `/api/carts/:cid/products/:pid` | Actualiza la cantidad de un producto específico en el carrito. |
| `DELETE` | `/api/carts/:cid/products/:pid` | Elimina un producto específico del carrito. |
| `DELETE` | `/api/carts/:cid` | Vacía todos los productos del carrito. |

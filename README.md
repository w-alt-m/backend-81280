*Leer esto en español: [Español 🇪🇸](README.es.md)*

# E-Commerce Backend API & Web App

An e-commerce backend platform built with **Node.js**, **Express**, **MongoDB** (via Mongoose), **Handlebars**, and **Socket.IO**. This application provides a full RESTful API for product and cart management, along with dynamic views rendered with Handlebars and real-time product synchronization via WebSockets.

---

## 🚀 Features

- **RESTful API**: Complete CRUD operations for products and shopping carts.
- **Database Integration**: MongoDB connection handled via Mongoose ODM.
- **Server-Side Rendering**: Dynamic HTML templates rendered using Handlebars and styled with Bootstrap 5.
- **Real-Time Updates**: Instant UI product updates powered by Socket.IO when products are created or deleted.
- **Pagination & Population**: Paginated product listings and Mongoose path population for shopping cart items.

---

## 🛠️ Technologies & Libraries

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Web Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database & ODM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Template Engine**: [Express-Handlebars](https://github.com/express-handlebars/express-handlebars)
- **Real-Time Communication**: [Socket.IO](https://socket.io/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/) (via CDN)
- **Environment Management**: [Dotenv](https://github.com/motdotla/dotenv)

---

## ⚙️ Installation & Running

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A running [MongoDB](https://www.mongodb.com/) instance or MongoDB Atlas cluster.

### 1. Clone the repository & Install dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
```

### 3. Execution Scripts

- **Production mode**:
  ```bash
  npm start
  ```
- **Development mode** (with auto-reload using `node --watch`):
  ```bash
  npm run dev
  ```

Once started, access the application at `http://localhost:8080`.

---

## 📁 Project Structure

```text
backend-81280/
├── public/
│   └── js/
│       └── realtime.js        # Socket.IO client-side script
├── src/
│   ├── config/
│   │   └── database.js        # MongoDB connection setup
│   ├── controllers/
│   │   ├── cart.controller.js # Logic for cart endpoints
│   │   └── product.controller.js # Logic for product endpoints
│   ├── models/
│   │   ├── cart.model.js      # Mongoose Cart schema
│   │   └── product.model.js   # Mongoose Product schema
│   ├── routes/
│   │   ├── carts.router.js    # API cart routes
│   │   ├── products.router.js # API product routes
│   │   └── views.router.js    # Handlebars view routes
│   ├── views/
│   │   ├── layouts/
│   │   │   └── main.handlebars # Main Bootstrap layout
│   │   ├── cart.handlebars       # Shopping cart view
│   │   ├── productDetail.handlebars # Product detail view
│   │   ├── products.handlebars   # Product catalog view
│   │   └── realTimeProducts.handlebars # Socket.IO live products view
│   └── app.js                 # Express application entry point
├── .env                       # Environment variables
├── package.json               # Project manifest and scripts
├── README.md                  # Documentation in English
└── README.es.md               # Documentation in Spanish
```

---

## 🖥️ Rendered Views

| Route | Description |
|---|---|
| `GET /` | Redirects automatically to `/products`. |
| `GET /products` | Displays the paginated product catalog (supports query parameters `?limit=X&page=Y`). |
| `GET /products/:limit/:page` | Alternative URL-parameter based paginated product catalog. |
| `GET /products/:pid` | Displays detailed information for a specific product. |
| `GET /carts/:cid` | Displays the cart view with populated product details and unit prices. |
| `GET /realtimeproducts` | Displays products updated live in real time via Socket.IO. |

---

## 📡 API Endpoints

### Products (`/api/products`)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/products` | Get list of products (supports `?limit=` and `?page=`). |
| `GET` | `/api/products/:limit/:page` | Get paginated products via URL parameters. |
| `GET` | `/api/products/:pid` | Get details of a single product by ID. |
| `POST` | `/api/products` | Create a new product (triggers real-time WebSocket update). |
| `PUT` | `/api/products/:pid` | Update product attributes by ID. |
| `DELETE` | `/api/products/:pid` | Delete a product by ID (triggers real-time WebSocket update). |

### Carts (`/api/carts`)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/carts` | Create a new empty cart. |
| `GET` | `/api/carts/:cid` | Get a cart by ID with populated product details. |
| `POST` | `/api/carts/:cid/products/:pid` | Add a product to a cart (or increment its quantity). |
| `PUT` | `/api/carts/:cid` | Replace the products array of a cart. |
| `PUT` | `/api/carts/:cid/products/:pid` | Update the quantity of a specific product in the cart. |
| `DELETE` | `/api/carts/:cid/products/:pid` | Remove a product from the cart. |
| `DELETE` | `/api/carts/:cid` | Clear all products from the cart. |

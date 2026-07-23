import express from "express";
import connectDB from './config/database.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { engine } from 'express-handlebars';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
connectDB();

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views'));

// Middleware archivos estáticos
app.use(express.static('public'));

// Test
app.get('/test-view', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
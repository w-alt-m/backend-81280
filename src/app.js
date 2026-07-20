import express from "express";
import connectDB from './config/database.js';
import productsRouter from './routes/products.router.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB database
connectDB();

app.use(express.json());

app.use('/api/products', productsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
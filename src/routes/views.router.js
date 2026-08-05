import { Router } from 'express';
import productModel from '../models/product.model.js';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('products', { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
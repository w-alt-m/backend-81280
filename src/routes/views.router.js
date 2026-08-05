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

router.get('/products/:limit/:page', async (req, res) => {
    try {
        const { limit, page } = req.params;

        const parsedLimit = Number(limit) || 10;
        const parsedPage = Number(page) || 1;

        const products = await productModel.find()
            .skip((parsedPage - 1) * parsedLimit)
            .limit(parsedLimit)
            .lean();

        res.render('products', { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid).lean();

        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('productDetail', { product });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
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

router.get('/carts/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.product').lean();

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.render('cart', { cart });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productModel.find().lean();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
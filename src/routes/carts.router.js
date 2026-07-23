import { Router } from 'express';
import {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart
} from '../controllers/cart.controller.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);

export default router;
import { Router } from 'express';
import {
    createCart,
    getCartById,
    addProductToCart,
    deleteProductFromCart,
    clearCart,
    updateCart,
    updateProductQuantityInCart
} from '../controllers/cart.controller.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', clearCart);
router.put('/:cid', updateCart);
router.put('/:cid/product/:pid', updateProductQuantityInCart);

export default router;
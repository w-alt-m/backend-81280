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
router.post('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', clearCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantityInCart);

export default router;
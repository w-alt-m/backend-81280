import cartModel from '../models/cart.model.js';

export const createCart = async (req, res) => {
    try {
        const newCart = await cartModel.create({ products: [] });
        res.status(201).json({ status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartModel.findById(cid).populate('products.product');
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);

        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

        const existingProduct = cart.products.find(p => p.product.toString() === pid);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

        cart.products = cart.products.filter(p => p.product.toString() !== pid);

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

        cart.products = [];

        await cart.save();
        res.json({ status: 'success', message: 'Carrito vaciado correctamente', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

        cart.products = products;

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProductQuantityInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const cart = await cartModel.findById(cid);
        if (!cart) return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });

        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (!productInCart) return res.status(404).json({ status: 'error', error: 'Producto no encontrado en el carrito' });

        productInCart.quantity = quantity;

        await cart.save();
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};
import productModel from '../models/product.model.js';

export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productModel.create(newProduct);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productModel.findById(pid);
        if (!product) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const updateData = req.body;
        delete updateData._id;
        const updatedProduct = await productModel.findByIdAndUpdate(pid, updateData, { new: true });
        if (!updatedProduct) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json({ status: 'success', payload: updatedProduct });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await productModel.findByIdAndDelete(pid);
        if (!deletedProduct) return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
};
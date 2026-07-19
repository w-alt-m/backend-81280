import { Router } from "express";
import productModel from "../models/product.model.js";

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productModel.create(newProduct);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).json({ status: 'error', error: error.message });
    }
});

/*
router.get("/:id", (req, res) => { });
router.put("/:id", (req, res) => { });
router.delete("/:id", (req, res) => { }); */

export default router;
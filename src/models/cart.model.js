import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
});

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

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
import ShoppingCart from '../Shopping/shopping.model.js';
import Product from '../products/products.model.js';
import Bill from '../bills/bill.model.js';

export const buyingProcess = async (req, res) => {
    try {
        const { userId, paymentMethod } = req.body;

        if (!userId || !paymentMethod) {
            return res.status(400).json({ message: "El id del usuario y el metodo de pago son necesarios" });
        }

        const cart = await ShoppingCart.findOne({ user: userId }).populate('products.product');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: "El carro esta vacio" });
        }

        let totalAmount = 0;
        const billProducts = [];

        for (let item of cart.products) {
            const product = item.product;

            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    message: `Insufficient stock for product: ${product.name}` 
                });
            }

            totalAmount += product.price * item.quantity;

            billProducts.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }

        for (let item of cart.products) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity }
            });
        }

        const bill = new Bill({
            user: userId,
            products: billProducts,
            totalAmount,
            paymentMethod,
            status: 'paid'
        });

        await bill.save();

        await ShoppingCart.findOneAndUpdate({ user: userId }, { products: [] });

        res.status(200).json({ 
            message: "Compra realizada con exito", 
            bill 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
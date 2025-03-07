import Product from "../models/Product.js";
import Bill from "../models/Bill.js";
import User from "../models/User.js";

const processPurchase = async (req, res) => {
    try {
        const { userId, products } = req.body;
        
        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let total = 0;
        let productDetails = [];
        
        for (let item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }
            
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product ${product.name}` });
            }
            
            // Calcular subtotal y actualizar stock
            const subtotal = product.price * item.quantity;
            total += subtotal;
            product.stock -= item.quantity;
            await product.save();

            productDetails.push({
                name: product.name,
                quantity: item.quantity,
                price: product.price,
                subtotal
            });
        }

        const iva = total * 0.12; // IVA del 12%
        const finalTotal = total + iva;
        
        // Crear factura
        const newBill = new Bill({
            user: userId,
            products: productDetails,
            iva,
            total: finalTotal,
        });
        await newBill.save();

        res.status(201).json({
            message: "Purchase completed successfully",
            bill: newBill
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default processPurchase;

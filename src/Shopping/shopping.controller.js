import ShoppingCart from '../Shopping/shopping.model.js';
import Product from '../products/products.model.js';

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        // Verificar si el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Buscar el carrito del usuario
        let cart = await ShoppingCart.findOne({ user: userId });
        
        if (!cart) {
            // Si no tiene carrito, crear uno nuevo
            cart = new ShoppingCart({ user: userId, products: [] });
        }
        
        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.products.find(item => item.product.toString() === productId);
        
        if (existingProduct) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            existingProduct.quantity += quantity;
        } else {
            // Si no está en el carrito, agregarlo
            cart.products.push({ product: productId, quantity });
        }
        
        await cart.save();

        res.status(200).json({ message: "Product added to cart", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { addToCart };
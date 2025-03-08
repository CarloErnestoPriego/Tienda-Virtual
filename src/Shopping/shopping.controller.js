import ShoppingCart from '../Shopping/shopping.model.js';
import Product from '../products/products.model.js';

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity || quantity <= 0) {
            return res.status(400).json({ message: "Datos de entrada no válidos" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: `Solamente ${product.stock} se encuentran disponibles en el stock` });
        }

        let cart = await ShoppingCart.findOne({ user: userId });

        if (!cart) {
            cart = new ShoppingCart({ user: userId, products: [] });
        }

        const existingProduct = cart.products.find(item => item.product.toString() === productId);

        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity;
            
            if (newQuantity > product.stock) {
                return res.status(400).json({ message: `No se pueden agregar mas de ${product.stock} items` });
            }

            existingProduct.quantity = newQuantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json({ message: "Producto agregado al carrito", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
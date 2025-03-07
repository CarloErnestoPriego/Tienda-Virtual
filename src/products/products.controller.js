import Product from "./products.model.js";

export const registerProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);

        return res.status(201).json({
            message: "Product has been created",
            product
        });
    } catch (e) {
        return res.status(500).json({
            message: "Error when entering product",
            error: e.message
        });
    }
};

export const getProduct = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { state: true };

    try {
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting products',
            error
        });
    }
};

export const searchProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving product',
            error
        });
    }
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product successfully removed',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { _id, ...data } = req.body;

    try {
        const product = await Product.findByIdAndUpdate(id, data, { new: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error
        });
    }
};

export const getOutOfStockProducts = async (req, res) => {  //arreglar
    try {
        // Consulta los productos cuyo stock sea igual a 0
        const products = await Product.find({ stock: 0 });

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No products out of stock found'
            });
        }

        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving out-of-stock products',
            error: error.message
        });
    }
};

export const getTopSellingProducts = async (req, res) => {  //arreglar
    try {
        const products = await Product.find().sort({ sold: -1 }).limit(10);
        res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving top-selling products',
            error
        });
    }
};

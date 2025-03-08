import Product from "./products.model.js";

export const registerProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);

        return res.status(201).json({
            message: "El producto se ha registrado correctamente",
            product
        });
    } catch (e) {
        return res.status(500).json({
            message: "Error al registrar el producto",
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
            message: 'Error obteniendo productos',
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
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error buscando producto',
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
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto eliminado correctamente',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error eliminando producto',
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
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Producto actualizado correctamente',
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error actualizando producto',
            error
        });
    }
};

export const getOutOfStockProducts = async (req, res) => {
    try {
        const products = await Product.find({ stock: 0 });
        if (products.length === 0) {
            console.log('No hay productos agotados.');
        } else {
            console.log('Productos agotados:', products);
        }
        return products;
    } catch (error) {
        console.error('Error obteniendo productos sin stock:', error);
    }
};


export const getTopSellingProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ sold: -1 })
            .limit(limit);

        if (products.length === 0) {
            console.log('No hay productos vendidos.');
        } else {
            console.log('Productos más vendidos:', products);
        }
        return products;
    } catch (error) {
        console.error('Error obteniendo los productos más vendidos:', error);
    }
};

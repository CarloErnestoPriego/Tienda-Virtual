import Category from './categories.model.js';
import Product from '../products/products.model.js';

export const registerCategory = async (req, res) => {
    try {
        const { category } = req.body;

        // Comprobar si la categoría ya existe
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({
                message: "La categoría ya existe",
            });
        }

        const newCategory = await Category.create({ category });

        return res.status(201).json({
            message: "La categoría ha sido creada",
            category: newCategory
        });
    } catch (e) {
        return res.status(500).json({
            message: "Error al ingresar categoría",
            error: e.message
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener categorías',
            error
        });
    }
};

export const searchCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener categoría',
            error
        });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, { category }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Categoria actualizada',
            category: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error actualizando categoría',
            error
        });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Categoria no encontrada'
            });
        }

        const defaultCategory = await Category.findOne({ category: 'General' });

        if (!defaultCategory) {
            await Category.create({ category: 'General' });
        }

        if (!defaultCategory) {
            return res.status(404).json({
                success: false,
                message: 'Categoria por defecto no encontrada'
            });
        }

        await Product.updateMany(
            { category: id },
            { $set: { category: defaultCategory._id } }
        );

        await category.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Categoria eliminada, productos movidos a la categoría por defecto',
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar categoría',
            error
        });
    }
};
import Category from './categories.model.js';

export const registerCategory = async (req, res) => {
    try {
        const { category } = req.body;

        // Comprobar si la categoría ya existe
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        const newCategory = await Category.create({ category });

        return res.status(201).json({
            message: "Category has been created",
            category: newCategory
        });
    } catch (e) {
        return res.status(500).json({
            message: "Error when entering category",
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
            message: 'Error getting categories',
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
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving category',
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
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category updated',
            category: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating category',
            error
        });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Category successfully deleted',
            category
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting category',
            error
        });
    }
};

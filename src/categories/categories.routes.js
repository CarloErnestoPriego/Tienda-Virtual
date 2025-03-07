import { Router } from 'express'
import { validarJWT } from '../middlewares/validar-jwt.js';
import { registerCategory, getCategories, searchCategory, deleteCategory, updateCategory } from './categories.controller.js';

const router = new Router();

router.post(
    '/', 
    validarJWT,
    registerCategory
);

router.get(
    '/',
    getCategories
);

router.get(
    '/:id',
    searchCategory
);

router.delete(
    '/:id',
    validarJWT,
    deleteCategory
);

router.put(
    '/:id',
    validarJWT,
    updateCategory
);

export default router;
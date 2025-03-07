import Router from 'express'
import { validarJWT } from '../middlewares/validar-jwt.js';
import { registerProduct, getProduct, searchProduct, deleteProduct, updateProduct, getOutOfStockProducts, getTopSellingProducts } from './products.controller.js';

const router = Router();

router.post(
    '/', 
    validarJWT,
    registerProduct
);

router.get(
    '/',
    getProduct
);

router.get(
    '/:id',
    searchProduct
);

router.get(
    '/ceroStock',
    getOutOfStockProducts
);

router.get(
    '/topVentas',
    getTopSellingProducts
);

router.delete(
    '/:id',
    validarJWT,
    deleteProduct
);

router.put(
    '/:id',
    validarJWT,
    updateProduct
);

export default router;
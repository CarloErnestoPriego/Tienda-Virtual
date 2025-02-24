import Router from 'express'
import { registerProduct, getProduct, searchProduct, deleteProduct, updateProduct } from './products.controller.js';

const router = Router();

router.post(
    '/', 
    registerProduct
);

router.get(
    '/',
    getProduct
);

router.get(
    '/findUser/:id',
    searchProduct
);

router.delete(
    '/:id',
    deleteProduct
);

router.put(
    '/:id',
    updateProduct
);

export default router;
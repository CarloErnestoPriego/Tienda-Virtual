import Router from 'express';
import { addToCart } from '../Shopping/shopping.controller.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/', 
    validarJWT,
    addToCart
);

export default router;
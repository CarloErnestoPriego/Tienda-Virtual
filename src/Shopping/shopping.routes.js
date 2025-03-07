import { Router } from 'express';
import addToCart from '../Shopping/shopping.controller.js';

const router = new Router();

router.post(
    '/cart', 
    addToCart
);

export default router;
import Router from 'express'
import {searchBill, updateBill } from './bill.controller.js'


const router = Router();

router.get(
    '/:id',
    searchBill
);

router.put(
    '/:id',
    
    updateBill
);

export default router;
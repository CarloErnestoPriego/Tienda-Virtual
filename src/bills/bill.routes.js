import Router from 'express'
import { getBill, searchBill, deleteBill, updateBill } from './bill.controller.js'

const router = Router();

router.get(
    '/',
    getBill
);

router.get(
    '/findBill/:id',
    searchBill
)

router.delete(
    '/:id',
    deleteBill
)

router.put(
    '/:id',
    updateBill
)
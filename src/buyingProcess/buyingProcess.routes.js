import Router from 'express';
import { buyingProcess } from './buyingProcess.controller.js';

const router = Router();

router.post(
    '/',
    buyingProcess
);

export default router;
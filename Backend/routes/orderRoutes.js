import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect(['supplier']), createOrder);
router.get('/', protect(['vendor', 'admin']), getOrders);

export default router;

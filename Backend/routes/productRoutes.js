import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect(['vendor']), createProduct);
router.get('/', protect(['vendor', 'supplier', 'admin']), getProducts);

export default router;

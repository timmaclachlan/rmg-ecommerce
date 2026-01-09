import express from 'express';
import { getAllCategories } from '../services/categoryService.js';

const router = express.Router();

/**
 * GET /api/categories
 */
router.get('/', (_req, res) => {
  console.log('Express GET /api/categories');

  const categories = getAllCategories();

  res.json({
    success: true,
    data: categories,
  });
});

export default router;

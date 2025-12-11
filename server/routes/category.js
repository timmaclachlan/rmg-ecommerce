import express from 'express';

import { getAllCategories } from '../services/categoryService.js';

const router = express.Router();

// GET /api/categories
router.get('/api/categories', (req, res, ctx) => {
  console.log('MSW → categories');

  return res(ctx.status(200), ctx.json(getAllCategories()));
});

export default router;

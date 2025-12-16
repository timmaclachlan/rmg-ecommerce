import express from 'express';

import { getAllCategories } from '../services/categoryService.js';

const router = express.Router();

// GET /api/categories
router.get('/', (req, res) => {
  return res.status(200).json(getAllCategories());
});

export default router;

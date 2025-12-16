import express from 'express';

import {
  getProductById,
  getProductsOnSale,
  getProductsByCategory,
  getProductsBySearchTerm,
} from '../services/productService.js';

const router = express.Router();

// Get products on sale
router.get('/onsale', (req, res) => {
  console.log('Express: GET /api/product/onsale');
  const products = getProductsOnSale();
  res.json(products);
});

// Get product by ID
router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  console.log(`Express: GET /api/product/${productId}`);
  const product = getProductById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Get products by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  console.log(`Express: GET /api/products/category/${category}`);
  const products = getProductsByCategory(category);

  if (!products || products.length === 0) {
    return res
      .status(404)
      .json({ error: 'No products found in this category' });
  }
  res.json(products);
});

// Get products by search term
router.get('/', (req, res) => {
  const searchTerm = req.query.search || '';
  console.log(`Express: GET /api/products?search=${searchTerm}`);
  const products = getProductsBySearchTerm(searchTerm);

  if (!products || products.length === 0) {
    return res
      .status(404)
      .json({ error: 'No products found with this search term' });
  }
  res.json(products);
});

export default router;

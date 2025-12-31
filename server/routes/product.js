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
  try {
    console.log('Express: GET /api/product/onsale');
    const products = getProductsOnSale();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get('/:productId', (req, res, next) => {
  try {
    const { productId } = req.params;
    console.log(`Express: GET /api/product/${productId}`);
    const product = getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Get products by category
router.get('/category/:category', (req, res) => {
  try {
    const { category } = req.params;
    console.log(`Express: GET /api/products/category/${category}`);
    const products = getProductsByCategory(category);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ error: 'No products found in this category' });
    }
    res.json(products);
  } catch (error) {
    next(error);
  }
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

// get all products
router.get('/', async (req, res, next) => {
  try {
    const products = getProducts();
    throw error('Test error handling');
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
});

export default router;

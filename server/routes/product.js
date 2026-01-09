import express from 'express';

import {
  getProductById,
  getProductsOnSale,
  getProductsByCategory,
  getProductsBySearchTerm,
} from '../services/productService.js';

import catchAsync from '../utils/catchAsync.js';

const router = express.Router();

/* ----------------------------------
   GET products on sale
   /api/products/onsale
----------------------------------- */
router.get(
  '/onsale',
  catchAsync(async (req, res) => {
    console.log('Express: GET /api/products/onsale');

    const products = getProductsOnSale();

    res.json({
      success: true,
      data: products,
    });
  }),
);

/* ----------------------------------
   GET products by category
   /api/products/category/:category
----------------------------------- */
router.get(
  '/category/:category',
  catchAsync(async (req, res) => {
    const { category } = req.params;
    console.log(`Express: GET /api/products/category/${category}`);

    const products = getProductsByCategory(category);

    if (!products || products.length === 0) {
      const err = new Error('No products found in this category');
      err.status = 404;
      throw err;
    }

    res.json({
      success: true,
      data: products,
    });
  }),
);

/* ----------------------------------
   GET product by ID
   /api/products/:productId
----------------------------------- */
router.get(
  '/:productId',
  catchAsync(async (req, res) => {
    const { productId } = req.params;
    console.log(`Express: GET /api/products/${productId}`);

    const product = getProductById(productId);

    if (!product) {
      const err = new Error('Product not found');
      err.status = 404;
      throw err;
    }

    res.json({
      success: true,
      data: product,
    });
  }),
);

/* ----------------------------------
   GET all products OR search
   /api/products
   /api/products?search=term
----------------------------------- */
router.get(
  '/',
  catchAsync(async (req, res) => {
    const searchTerm = req.query.search;
    console.log(
      `Express: GET /api/products${searchTerm ? `?search=${searchTerm}` : ''}`,
    );

    const products = searchTerm
      ? getProductsBySearchTerm(searchTerm)
      : getProducts();

    if (!products || products.length === 0) {
      const err = new Error(
        searchTerm
          ? 'No products found with this search term'
          : 'No products found',
      );
      err.status = 404;
      throw err;
    }

    res.json({
      success: true,
      data: products,
    });
  }),
);

export default router;

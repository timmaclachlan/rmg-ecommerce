// /mocks/handlers/productHandlers.js
import { rest } from 'msw';

import {
  getProductById,
  getProductsByCategory,
  getProductsOnSale,
  getProductsBySearchTerm,
} from '../../services/productService';

export const productHandlers = [
  // Get products on sale
  rest.get('/api/products/onsale', (req, res, ctx) => {
    console.log('MSW intercepted /api/products/onsale');

    const products = getProductsOnSale();
    return res(ctx.status(200), ctx.json(products));
  }),

  // Get product by ID
  rest.get('/api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    console.log(`MSW intercepted /api/products/${productId}`);
    const product = getProductById(productId);

    if (!product) {
      return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
    }
    return res(ctx.status(200), ctx.json(product));
  }),

  // Get products by category ID
  rest.get('/api/products/category/:category', (req, res, ctx) => {
    const { category } = req.params;
    console.log(`MSW intercepted /api/products/category/${category}`);

    const products = getProductsByCategory(category);

    if (!products || products.length === 0) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'No products found in this category' }),
      );
    }
    return res(ctx.status(200), ctx.json(products));
  }),

  // Get products by search term
  rest.get('/api/products', (req, res, ctx) => {
    const searchTerm = req.url.searchParams.get('search') || '';
    console.log(`MSW intercepted /api/products?search=${searchTerm}`);

    const products = getProductsBySearchTerm(searchTerm);
    if (!products || products.length === 0) {
      return res(
        ctx.status(404),
        ctx.json({ error: 'No products found with this search term' }),
      );
    }
    return res(ctx.status(200), ctx.json(products));
  }),
];

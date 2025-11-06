// /mocks/handlers/productHandlers.js
import { rest } from 'msw';

import {
  getProductById,
  getProductsByCategory,
} from '../../services/productService';

export const productHandlers = [
  // Get product by ID
  rest.get('http://localhost/api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    console.log(`MSW intercepted /api/products/${productId}`);
    const product = getProductById(productId);

    if (!product) {
      return res(ctx.status(404), ctx.json({ error: 'Product not found' }));
    }
    return res(ctx.status(200), ctx.json(product));
  }),

  // Get products by category ID NOTE CHANGE OF URL
  rest.get(
    'http://localhost/api/products/category/:categoryId',
    (req, res, ctx) => {
      const { categoryId } = req.params;
      const products = getProductsByCategory(categoryId);
      console.log(`Intercepted products by category: ${categoryId}`);

      if (!products) {
        return res(
          ctx.status(404),
          ctx.json({ error: 'No products found in this category' }),
        );
      }
      return res(ctx.status(200), ctx.json(products));
    },
  ),
];

// /mocks/handlers/productHandlers.js
import { rest } from 'msw';
import { db } from '../db';

export const productHandlers = [
  // Get product by ID
  rest.get('http://localhost/api/products/:productId', (req, res, ctx) => {
    const { productId } = req.params;
    console.log(`MSW intercepted /api/products/${productId}`);
    const product = db.products.find((p) => p.id === Number(productId));

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
      const products = db.products.filter((c) => c.category === categoryId);
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

// /mocks/handlers/categoryHandlers.js
import { rest } from 'msw';
import { getAllCategories } from '../../services/categoryService';

export const categoryHandlers = [
  // GET /api/categories
  rest.get('/api/categories', (req, res, ctx) => {
    console.log('MSW → categories');

    return res(ctx.status(200), ctx.json(getAllCategories()));
  }),
];

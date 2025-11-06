// /mocks/handlers/categoryHandlers.js
import { rest } from 'msw';

import { getAllCategories } from '../../services/categoryService';

export const categoryHandlers = [
  // Get all categories NOTE CHANGE OF URL
  rest.get('http://localhost/api/categories', (req, res, ctx) => {
    console.log('Intercepted request for all categories');
    return res(ctx.status(200), ctx.json(getAllCategories()));
  }),
];

// /mocks/handlers/basketHandlers.js
import { rest } from 'msw';

import {
  getBasketByUserId,
  addItemToBasket,
  removeItemFromBasket,
  updateItemQuantity,
} from '../../services/basketService';

export const basketHandlers = [
  rest.get('/api/basket/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const basket = getBasketByUserId(userId);
    return res(ctx.status(200), ctx.json(basket));
  }),

  rest.post('/api/basket/:userId', async (req, res, ctx) => {
    console.log('POST /api/basket/:userId called');
    const { userId } = req.params;
    const newItem = await req.json();

    const basket = addItemToBasket(userId, newItem);
    return res(ctx.status(200), ctx.json(basket));
  }),

  rest.put('/api/basket/:userId/:productId', async (req, res, ctx) => {
    const { userId, productId } = req.params;
    const { quantity } = await req.json();
    const basket = updateItemQuantity(userId, productId, quantity);
    return res(ctx.status(200), ctx.json(basket));
  }),

  rest.delete('/api/basket/:userId/:productId', (req, res, ctx) => {
    const { userId, productId } = req.params;
    const basket = removeItemFromBasket(userId, productId);
    return res(ctx.status(200), ctx.json(basket));
  }),
];

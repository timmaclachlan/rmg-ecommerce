// /mocks/handlers/basketHandlers.js
import { rest } from 'msw';
import { db } from '../db';

export const basketHandlers = [
  rest.get('http://localhost/api/basket/:userId', (req, res, ctx) => {
    const { userId } = req.params;
    const basket = db.baskets.find((b) => b.id === userId) || {
      id: userId,
      items: [],
    };
    return res(ctx.status(200), ctx.json(basket));
  }),

  rest.post('http://localhost/api/basket/:userId', async (req, res, ctx) => {
    console.log('POST /api/basket/:userId called');
    const { userId } = req.params;
    const newItem = await req.json();
    let basket = db.baskets.find((b) => b.id === userId);

    if (!basket) {
      console.log('Creating new basket for user:', userId);
      basket = { id: userId, items: [newItem] };
      db.baskets.push(basket);
    } else {
      console.log('Adding item to existing basket for user:', userId);
      const existing = basket.items.find(
        (i) => i.productId === newItem.productId,
      );
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        basket.items.push(newItem);
      }
    }

    return res(ctx.status(200), ctx.json(basket));
  }),

  rest.put(
    'http://localhost/api/basket/:userId/:productId',
    async (req, res, ctx) => {
      const { userId, productId } = req.params;
      const { quantity } = await req.json();
      const basket = db.baskets.find((b) => b.id === userId);

      if (basket) {
        const item = basket.items.find((i) => i.productId === productId);
        if (item) item.quantity = quantity;
      }

      return res(ctx.status(200), ctx.json(basket));
    },
  ),

  rest.delete('/api/basket/:userId/:productId', (req, res, ctx) => {
    const { userId, productId } = req.params;
    const basket = db.baskets.find((b) => b.id === userId);

    if (basket) {
      basket.items = basket.items.filter((i) => i.productId !== productId);
    }

    return res(ctx.status(200), ctx.json(basket));
  }),
];

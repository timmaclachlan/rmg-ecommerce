import express from 'express';
import {
  getBasketByUserId,
  addItemToBasket,
  updateItemQuantity,
  removeItemFromBasket,
  clearBasket,
} from '../services/basketService.js';

const router = express.Router();

/**
 * GET /api/basket/:userId
 */
router.get('/:userId', (req, res) => {
  console.log('Express GET /api/basket/:userId');

  const userId = Number(req.params.userId);
  const basket = getBasketByUserId(userId);

  if (!basket) {
    return res.status(404).json({ error: 'Basket not found' });
  }

  res.json({
    success: true,
    data: basket,
  });
});

/**
 * POST /api/basket/:userId/items
 */
router.post('/:userId/items', (req, res) => {
  console.log('Express POST /api/basket/:userId/items');

  const userId = Number(req.params.userId);
  const item = req.body;

  const basket = addItemToBasket(userId, item);

  res.status(201).json({
    success: true,
    data: basket,
  });
});

/**
 * PUT /api/basket/:userId/items/:productId
 */
router.put('/:userId/items/:productId', (req, res) => {
  console.log('Express PUT /api/basket/:userId/items/:productId');

  const userId = Number(req.params.userId);
  const productId = Number(req.params.productId);
  const { quantity } = req.body;

  const basket = updateItemQuantity(userId, productId, quantity);

  if (!basket) {
    return res.status(404).json({ error: 'Item not found in basket' });
  }
  res.json({
    success: true,
    data: basket,
  });
});

/**
 * DELETE /api/basket/:userId/items/:productId
 */
router.delete('/:userId/items/:productId', (req, res) => {
  console.log('Express DELETE /api/basket/:userId/items/:productId');

  const userId = Number(req.params.userId);
  const productId = Number(req.params.productId);

  const basket = removeItemFromBasket(userId, productId);

  if (!basket) {
    return res.status(404).json({ error: 'Item not found in basket' });
  }

  res.json({
    success: true,
    data: basket,
  });
});

/**
 * DELETE /api/basket/:userId
 */
router.delete('/:userId', (req, res) => {
  console.log('Express DELETE /api/basket/:userId');

  const userId = Number(req.params.userId);
  const basket = clearBasket(userId);

  if (!basket) {
    return res.status(404).json({ error: 'Basket not found' });
  }

  res.json({
    success: true,
    data: basket,
  });
});

export default router;

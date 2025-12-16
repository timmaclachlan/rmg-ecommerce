import express from 'express';

import {
  getBasketByUserId,
  addItemToBasket,
  updateItemQuantity,
  removeItemFromBasket,
  clearBasket,
} from '../services/basketService.js';

const router = express.Router();

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const basket = getBasketByUserId(userId);
  return res.status(200).json(basket);
});

router.post('/:userId', (req, res) => {
  console.log('POST /api/basket/:userId called');
  const { userId } = req.params;
  const newItem = req.body;

  const basket = addItemToBasket(userId, newItem);
  return res.status(200).json(basket);
});

router.put('/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;
  const basket = updateItemQuantity(userId, productId, quantity);
  return res.status(200).json(basket);
});

router.delete('/:userId/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const basket = removeItemFromBasket(userId, productId);
  return res.status(200).json(basket);
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  const basket = clearBasket(userId);
  return res.status(200).json(basket);
});

export default router;

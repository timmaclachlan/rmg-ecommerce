import { db } from '../data/db.js';

export function getBasketByUserId(userId) {
  return db.baskets.getById(userId) || null;
}

export function addItemToBasket(userId, newItem) {
  let basket = getBasketByUserId(userId);

  if (!basket) {
    basket = {
      id: userId,
      items: [newItem],
    };
    db.baskets.add(basket);
  } else {
    const existing = basket.items.find(
      (i) => i.productId === newItem.productId,
    );

    if (existing) {
      existing.quantity += newItem.quantity;
    } else {
      basket.items.push(newItem);
    }

    db.baskets.update(userId, { items: basket.items });
  }

  return basket;
}

export function updateItemQuantity(userId, productId, quantity) {
  const basket = getBasketByUserId(userId);
  if (!basket) return null;

  const item = basket.items.find((i) => i.productId === productId);
  if (item) {
    item.quantity = quantity;
    db.baskets.update(userId, { items: basket.items });
  }

  return basket;
}

export function removeItemFromBasket(userId, productId) {
  const basket = getBasketByUserId(userId);
  if (!basket) return null;

  basket.items = basket.items.filter((i) => i.productId !== productId);

  db.baskets.update(userId, { items: basket.items });
  return basket;
}

export function clearBasket(userId) {
  const basket = getBasketByUserId(userId);
  if (!basket) return null;

  basket.items = [];
  db.baskets.update(userId, { items: [] });

  return basket;
}

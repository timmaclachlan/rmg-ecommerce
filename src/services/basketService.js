import { db } from '../mocks/db';

export function getBasketByUserId(userId) {
  return (
    db.baskets.find((b) => b.id === userId) || {
      id: userId,
      items: [],
    }
  );
}

export function addItemToBasket(userId, newItem) {
  {
    let basket = getBasketByUserId(userId);

    if (!basket) {
      basket = { id: userId, items: [newItem] };
      db.baskets.push(basket);
    } else {
      const existing = basket.items.find(
        (i) => i.productId === newItem.productId,
      );
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        basket.items.push(newItem);
      }
    }

    return basket;
  }
}

export function updateItemQuantity(userId, productId, quantity) {
  const basket = getBasketByUserId(userId);

  if (basket) {
    const item = basket.items.find((i) => i.productId === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  return basket;
}

export function removeItemFromBasket(userId, productId) {
  const basket = getBasketByUserId(userId);

  if (basket) {
    basket.items = basket.items.filter((i) => i.productId !== productId);
  }

  return basket;
}

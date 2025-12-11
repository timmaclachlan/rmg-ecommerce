import {
  getBasketByUserId,
  addItemToBasket,
  updateItemQuantity,
  removeItemFromBasket,
} from './basketService';

import { db } from '../../src/mocks/db';

describe('basketService', () => {
  beforeEach(() => {
    db.baskets = [
      {
        id: 1,
        items: [
          { productId: 1, quantity: 2 },
          { productId: 2, quantity: 1 },
        ],
      },
    ];
  });

  describe('getBasketByUserId', () => {
    it('returns existing basket for known user', () => {
      const basket = getBasketByUserId(1);
      expect(basket.items.length).toBe(2);
    });

    it('returns empty basket for unknown user', () => {
      const basket = getBasketByUserId(999);
      expect(basket).toBeNull();
    });
  });

  describe('addItemToBasket', () => {
    it('adds new item to existing basket', () => {
      const basket = addItemToBasket(1, { productId: 3, quantity: 2 });
      expect(basket.items).toContainEqual({ productId: 3, quantity: 2 });
    });

    it('increments quantity of existing item', () => {
      const basket = addItemToBasket(1, { productId: 1, quantity: 2 });
      const item = basket.items.find((i) => i.productId === 1);
      expect(item.quantity).toBe(4);
    });

    it('creates new basket for unknown user', () => {
      const basket = addItemToBasket(999, { productId: 1, quantity: 2 });
      expect(basket.id).toBe(999);
      expect(basket.items).toEqual([{ productId: 1, quantity: 2 }]);
    });
  });

  describe('updateItemQuantity', () => {
    it('updates quantity of existing item', () => {
      const basket = updateItemQuantity(1, 1, 3);
      const item = basket.items.find((i) => i.productId === 1);
      expect(item.quantity).toBe(3);
    });

    it('does nothing if item not found', () => {
      const basket = updateItemQuantity(1, 1, 3);
      expect(basket.items.find((i) => i.productId === 3)).toBeUndefined();
    });

    it('returns empty basket for unknown user', () => {
      const basket = updateItemQuantity(999, 3, 3);
      expect(basket).toBeNull();
    });
  });

  describe('removeItemFromBasket', () => {
    it('removes item from basket', () => {
      const basket = removeItemFromBasket(1, 1);
      expect(basket.items.find((i) => i.productId === 1)).toBeUndefined();
    });

    it('does nothing if item not found', () => {
      const basket = removeItemFromBasket(1, 999);
      expect(basket.items.length).toBe(2);
    });

    it('returns empty basket for unknown user', () => {
      const basket = removeItemFromBasket(999, 3);
      expect(basket).toBeNull();
    });
  });
});

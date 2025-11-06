import {
  getBasketByUserId,
  addItemToBasket,
  updateItemQuantity,
  removeItemFromBasket,
} from './basketService';

import { db } from '../mocks/db';

describe('basketService', () => {
  beforeEach(() => {
    db.baskets = [
      {
        id: 1,
        items: [
          { productId: 'apple', quantity: 2 },
          { productId: 'banana', quantity: 1 },
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
      expect(basket).toEqual({ id: 999, items: [] });
    });
  });

  describe('addItemToBasket', () => {
    it('adds new item to existing basket', () => {
      const basket = addItemToBasket(1, { productId: 'orange', quantity: 3 });
      expect(basket.items).toContainEqual({ productId: 'orange', quantity: 3 });
    });

    it('increments quantity of existing item', () => {
      const basket = addItemToBasket(1, { productId: 'apple', quantity: 2 });
      const item = basket.items.find((i) => i.productId === 'apple');
      expect(item.quantity).toBe(4);
    });

    it('creates new basket for unknown user', () => {
      const basket = addItemToBasket(2, { productId: 'pear', quantity: 1 });
      expect(basket.id).toBe(2);
      expect(basket.items).toEqual([{ productId: 'pear', quantity: 1 }]);
    });
  });

  describe('updateItemQuantity', () => {
    it('updates quantity of existing item', () => {
      const basket = updateItemQuantity(1, 'banana', 5);
      const item = basket.items.find((i) => i.productId === 'banana');
      expect(item.quantity).toBe(5);
    });

    it('does nothing if item not found', () => {
      const basket = updateItemQuantity(1, 'pear', 2);
      expect(basket.items.find((i) => i.productId === 'pear')).toBeUndefined();
    });

    it('returns empty basket for unknown user', () => {
      const basket = updateItemQuantity(999, 'apple', 1);
      expect(basket.items).toEqual([]);
    });
  });

  describe('removeItemFromBasket', () => {
    it('removes item from basket', () => {
      const basket = removeItemFromBasket(1, 'banana');
      expect(
        basket.items.find((i) => i.productId === 'banana'),
      ).toBeUndefined();
    });

    it('does nothing if item not found', () => {
      const basket = removeItemFromBasket(1, 'pear');
      expect(basket.items.length).toBe(2);
    });

    it('returns empty basket for unknown user', () => {
      const basket = removeItemFromBasket(999, 'apple');
      expect(basket.items).toEqual([]);
    });
  });
});

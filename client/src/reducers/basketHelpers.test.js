import {
  calculateTotalForBasket,
  calculateTotalForItem,
  getItemCount,
  getInvalidItems,
} from './basketHelpers';

describe('basketHelpers', () => {
  const basket = [
    { id: 1, price: 100, quantity: 2, category: 'Synths' },
    { id: 2, price: 50, quantity: 3, category: 'Drums' },
    { id: 3, price: 75, quantity: 0, category: 'Synths' },
    { id: 4, price: null, quantity: 1 },
  ];

  it('calculates total price', () => {
    expect(calculateTotalForBasket(basket)).toBe(100 * 2 + 50 * 3 + 75 * 0 + 0);
  });

  it('calculates total for single item', () => {
    const item = { id: 5, price: 200, quantity: 4 };
    expect(calculateTotalForItem(item)).toBe(200 * 4);
  });

  it('counts total quantity', () => {
    expect(getItemCount(basket)).toBe(2 + 3 + 0 + 1);
  });

  it('finds invalid items', () => {
    const invalid = getInvalidItems(basket);
    expect(invalid).toEqual([
      { id: 3, price: 75, quantity: 0, category: 'Synths' },
      { id: 4, price: null, quantity: 1 },
    ]);
  });

});

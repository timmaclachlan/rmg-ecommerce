import {
  calculateTotal,
  getItemCount,
  getInvalidItems,
} from './basketHelpers';

describe('basketHelpers', () => {
  const cart = [
    { id: 1, price: 100, quantity: 2, category: 'Synths' },
    { id: 2, price: 50, quantity: 3, category: 'Drums' },
    { id: 3, price: 75, quantity: 0, category: 'Synths' },
    { id: 4, price: null, quantity: 1 },
  ];

  it('calculates total price', () => {
    expect(calculateTotal(cart)).toBe(100 * 2 + 50 * 3 + 75 * 0 + 0);
  });

  it('counts total quantity', () => {
    expect(getItemCount(cart)).toBe(2 + 3 + 0 + 1);
  });

  it('finds invalid items', () => {
    const invalid = getInvalidItems(cart);
    expect(invalid).toEqual([
      { id: 3, price: 75, quantity: 0, category: 'Synths' },
      { id: 4, price: null, quantity: 1 },
    ]);
  });

});

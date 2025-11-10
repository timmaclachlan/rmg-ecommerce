// useBasket.test.js
import { renderHook, act } from '@testing-library/react';
import { useBasket } from './useBasket';
import * as basketActions from '../actions/basketActions';
import * as basketHelpers from '../reducers/basketHelpers';

// Mock context
jest.mock('../context/BasketContext', () => ({
  useBasketContext: () => ({
    basketItems: [
      { productId: 'apple', quantity: 2, price: 1 },
      { productId: 'banana', quantity: 1, price: 2 },
    ],
    dispatch: jest.fn(),
  }),
}));

// Mock actions
jest.spyOn(basketActions, 'addItemToBasket').mockResolvedValue();
jest.spyOn(basketActions, 'deleteBasketItem').mockResolvedValue();
jest.spyOn(basketActions, 'updateBasketItem').mockResolvedValue();
jest.spyOn(basketActions, 'clearBasketItems').mockResolvedValue();

describe('useBasket', () => {
  it('adds item and dispatches ADDITEM', async () => {
    const { result } = renderHook(() => useBasket());
    await act(() =>
      result.current.addItem({ productId: 'orange', quantity: 1 }),
    );
    expect(basketActions.addItemToBasket).toHaveBeenCalledWith(1, {
      productId: 'orange',
      quantity: 1,
    });
  });

  it('deletes item and dispatches DELETEITEM', async () => {
    const { result } = renderHook(() => useBasket());
    await act(() => result.current.deleteItem({ id: 'apple' }));
    expect(basketActions.deleteBasketItem).toHaveBeenCalledWith(1, 'apple');
  });

  it('updates quantity and dispatches UPDATEQUANTITY', async () => {
    const { result } = renderHook(() => useBasket());
    await act(() => result.current.updateQuantity('banana', 5));
    expect(basketActions.updateBasketItem).toHaveBeenCalledWith(1, 'banana', 5);
  });

  it('clears basket and dispatches CLEARBASKET', async () => {
    const { result } = renderHook(() => useBasket());
    await act(() => result.current.clearBasket());
    expect(basketActions.clearBasketItems).toHaveBeenCalledWith(1);
  });

  it('calculates total for basket', () => {
    const { result } = renderHook(() => useBasket());
    expect(result.current.getTotalForBasket).toBe(4); // 2*1 + 1*2
  });

  it('calculates total for item', () => {
    const { result } = renderHook(() => useBasket());
    expect(result.current.getTotalForItem({ quantity: 3, price: 2 })).toBe(6);
  });

  it('returns correct item count', () => {
    const { result } = renderHook(() => useBasket());
    expect(result.current.getCount).toBe(3);
  });

  it('returns invalid items', () => {
    jest
      .spyOn(basketHelpers, 'getInvalidItems')
      .mockReturnValue([{ productId: 'apple' }]);
    const { result } = renderHook(() => useBasket());
    expect(result.current.invalidItems).toEqual([{ productId: 'apple' }]);
  });
});

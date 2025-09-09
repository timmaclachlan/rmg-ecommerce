import { useBasketContext } from "../context/BasketContext";
import {
  calculateTotalForCart,
  calculateTotalForItem,
  getItemCount,
  getInvalidItems,
} from '../reducers/basketHelpers';

import { ADDITEM, DELETEITEM, UPDATEQUANTITY, CLEARCART } from '../reducers/basketReducer';

export function useBasket() {
  const { basketItems, dispatch } = useBasketContext();


  const addItem = (item) => dispatch({ type: ADDITEM, payload: item });
  const deleteItem = (item) => dispatch({ type: DELETEITEM, payload: item });
  const clearBasket = () => dispatch({ type: CLEARCART });
  const updateQuantity = (id, quantity) => dispatch({ type: UPDATEQUANTITY, payload: { id, quantity } });

  return {
    basketItems,
    addItem,
    deleteItem,
    clearBasket,
    updateQuantity,

    getTotalForCart: calculateTotalForCart(basketItems),
    getTotalForItem: (item) => calculateTotalForItem(item),
    getCount: getItemCount(basketItems),
    invalidItems: getInvalidItems(basketItems),
  };
}

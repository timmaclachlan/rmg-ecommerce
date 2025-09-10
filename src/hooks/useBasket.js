import { useBasketContext } from "../context/BasketContext";
import {
  calculateTotalForBasket,
  calculateTotalForItem,
  getItemCount,
  getInvalidItems,
} from '../reducers/basketHelpers';

import { ADDITEM, DELETEITEM, UPDATEQUANTITY, CLEARBASKET } from '../reducers/basketReducer';

export function useBasket() {
  const { basketItems, dispatch } = useBasketContext();


  const addItem = (item) => dispatch({ type: ADDITEM, payload: item });
  const deleteItem = (item) => dispatch({ type: DELETEITEM, payload: item });
  const clearBasket = () => dispatch({ type: CLEARBASKET });
  const updateQuantity = (id, quantity) => dispatch({ type: UPDATEQUANTITY, payload: { id, quantity } });

  return {
    basketItems,
    addItem,
    deleteItem,
    clearBasket,
    updateQuantity,

    getTotalForBasket: calculateTotalForBasket(basketItems),
    getTotalForItem: (item) => calculateTotalForItem(item),
    getCount: getItemCount(basketItems),
    invalidItems: getInvalidItems(basketItems),
  };
}

import { useBasketContext } from "../context/BasketContext";
import {
  calculateTotalForBasket,
  calculateTotalForItem,
  getItemCount,
  getInvalidItems,
} from '../reducers/basketHelpers';

import { addItemToBasket, deleteBasketItem, updateBasketItem, clearBasketItems } from '../actions/basketActions';
//import { getBasket } from '../loaders/basketLoaders';

import { ADDITEM, DELETEITEM, UPDATEQUANTITY, CLEARBASKET } from '../reducers/basketReducer';

export function useBasket() {
  const { basketItems, dispatch } = useBasketContext();

  const userId = 1;

  // const syncBasket = async () => {
  //   const cart = await getBasket(userId);
  //   dispatch({ type: SETBASKET, payload: cart.items });
  // };

  const addItem = async (item) => {
    await addItemToBasket(userId, item);
    dispatch({ type:ADDITEM, payload: item });
  };

  const deleteItem = async (item) => {
    await deleteBasketItem(userId, item.id);
    dispatch({ type: DELETEITEM, payload: item });
  };

  const updateQuantity = async (id, quantity) => {
    await updateBasketItem(userId, id, quantity);
    dispatch({ type: UPDATEQUANTITY, payload: { id, quantity } });
  };

  const clearBasket = async () => {
    await clearBasketItems(userId);
    dispatch({ type: CLEARBASKET });
  };


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

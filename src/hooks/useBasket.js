import { useBasketContext } from "../context/BasketContext";

export function useBasket() {
  const { basketItems, dispatch } = useBasketContext();


  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const deleteItem = (item) => dispatch({ type: 'DELETE_ITEM', payload: item });
  const clearBasket = () => dispatch({ type: 'CLEAR_BASKET' });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });

  return {
    basketItems,
    addItem,
    deleteItem,
    clearBasket,
    updateQuantity,
  };
}

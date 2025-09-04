import { useBasketContext } from "../context/BasketContext";

export function useBasket() {
  const { basketItems, dispatch } = useBasketContext();


  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const deleteItem = (item) => dispatch({ type: 'DELETE_ITEM', payload: item });

  return {
    basketItems,
    addItem,
    deleteItem,
  };
}

import { useBasketContext } from "../context/BasketContext";

export function useBasket() {
  const { basketItems, setBasketItems } = useBasketContext();

  const addItem = (item) => {
    const existingItem = basketItems.find((i) => i.id === item.id);

    const newItems = existingItem
      ? basketItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      : [...basketItems, { ...item, quantity: 1 }];

    setBasketItems(newItems);
  };

  const deleteItem = (item) => {
    const filtered = basketItems.filter((i) => i.id !== item.id);
    setBasketItems(filtered);
  };

  return {
    basketItems,
    addItem,
    deleteItem,
  };
}

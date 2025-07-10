import { createContext, useState, useContext } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basketItems, setBasketItems] = useState([]);

  return (
    <BasketContext.Provider value={{ basketItems, setBasketItems }}>
      {children}
    </BasketContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useBasketContext() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error("useBasket must be used within a BasketProvider");
  }
  return context;
}

import { createContext, useReducer, useContext } from 'react';
import { basketReducer } from '../reducers/basketReducer';

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basketItems, dispatch] = useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={{ basketItems, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useBasketContext() {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}

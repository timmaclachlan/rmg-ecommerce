import { createContext, useContext } from 'react';

import { useCustomer } from '../hooks/useCustomer';

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const { customer, updateCustomer } = useCustomer();

  return (
    <CustomerContext.Provider value={{ customer, setCustomer: updateCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useCustomerContext() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      'useCustomerContext must be used within a CustomerProvider',
    );
  }
  return context;
}

import { createContext, useState, useContext } from "react";

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState({
    name: "John Doe",
    email: "john@test2.com",
    phone: "342344",
    newsletter: false,
    shipping: "Standard",
  });

  return (
    <CustomerContext.Provider value={{ customer, setCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useCustomerContext() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext must be used within a CustomerProvider"
    );
  }
  return context;
}

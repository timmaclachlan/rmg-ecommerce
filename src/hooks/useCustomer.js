import { useCustomerContext } from "../context/CustomerContext";

export function useCustomer() {
  const { customer, setCustomer } = useCustomerContext();

  // update customer details etc
  function updateCustomer(customer) {
    // do validation here
    setCustomer(customer);
  }

  return {
    customer,
    updateCustomer,
  };
}

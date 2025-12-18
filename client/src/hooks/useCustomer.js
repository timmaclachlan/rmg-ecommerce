import { useState } from 'react';
import axios from 'axios';

export function useCustomer() {
  const [customer, setCustomer] = useState(null);

  async function login(userId) {
    try {
      const response = await axios.get(`/api/customer/${userId}`);
      const user = response.data;
      setCustomer({ ...user, user: { isAuthenticated: true } });
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  function logout() {
    setCustomer(null);
  }

  // update customer details etc
  function updateCustomer(customer) {
    const putCustomer = async (updated) => {
      try {
        const response = await axios.put('/api/customer', updated);
        setCustomer(response.data);
      } catch (error) {
        console.error('Failed to update customer:', error);
      }
    };

    // do validation here
    putCustomer(customer);
  }

  return {
    customer,
    login,
    logout,
    updateCustomer,
  };
}

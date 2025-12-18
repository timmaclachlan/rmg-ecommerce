import { useReducer, useEffect } from 'react';
import { useCustomer } from '../hooks/useCustomer';
import { authReducer } from '../reducers/authReducer';

export function useAuthWithCustomerSync() {
  const { customer, login, logout, updateCustomer } = useCustomer();

  const [authState, dispatchAuth] = useReducer(
    authReducer,
    undefined,
    () => customer?.user ?? { isAuthenticated: false },
  );

  useEffect(() => {
    if (customer?.user?.isAuthenticated) {
      dispatchAuth({ type: 'LOGIN', payload: customer });
    }
  }, [customer]);

  function dispatch(action) {
    if (action.type === 'LOGIN') {
      login(action.payload.id); // triggers API fetch
    }

    if (action.type === 'LOGOUT') {
      logout();
    }

    if (action.type === 'UPDATE_PROFILE' && customer) {
      const updatedUser = { ...customer, ...action.payload };
      updateCustomer(updatedUser);
    }

    dispatchAuth(action);
  }

  return { authState, dispatch };
}

import { useReducer } from 'react';
import { useCustomer } from '../hooks/useCustomer';
import { authReducer } from '../reducers/authReducer';

export function useAuthWithCustomerSync() {
  const { customer, updateCustomer } = useCustomer();
  const [authState, dispatchAuth] = useReducer(authReducer, customer.user);

  function dispatch(action) {
    const nextState = authReducer(authState, action);

    // Sync user to customer context
    if ('user' in nextState) {
      updateCustomer({...customer, user: nextState.user});
    }

    dispatchAuth(action);
  }

  return { authState, dispatch };
}

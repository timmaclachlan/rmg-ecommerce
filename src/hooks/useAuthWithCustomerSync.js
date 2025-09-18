import { useReducer } from 'react';
import { useCustomer } from '../hooks/useCustomer';
import { authReducer, initialAuthState } from '../reducers/authReducer';

export function useAuthWithCustomerSync() {
  const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState);
  const { updateUser } = useCustomer();

  function dispatch(action) {
    const nextState = authReducer(authState, action);

    // Sync user to customer context
    if ('user' in nextState) {
      updateUser(nextState.user);
    }

    dispatchAuth(action);
  }

  return { authState, dispatch };
}

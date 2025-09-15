import { useReducer } from 'react';

import { Typography } from '@mui/material';

import { useCustomer } from '../../hooks/useCustomer';
import { authReducer, initialAuthState } from '../../reducers/authReducer';

function User() {
  const { customer } = useCustomer();
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const handleLogin = () => {
    dispatch({
      type: 'LOGIN',
      payload: { name: 'Alice', email: 'alice@example.com' },
    });
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleUpdateProfile = () => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { name: 'Alice Cooper' },
    });
  };

  if (state.isAuthenticated) {
    return (
      <div>
        <Typography variant="caption">
          Logged in as: {state.user.name}
        </Typography>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleUpdateProfile}>Update Profile</button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="caption">Not logged in</Typography>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default User;

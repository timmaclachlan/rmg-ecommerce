import { useState } from 'react';

import { Typography, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useAuthWithCustomerSync } from '../../hooks/useAuthWithCustomerSync';

function User() {
  const { authState, dispatch } = useAuthWithCustomerSync();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    dispatch({
      type: 'LOGIN',
      payload: { name: 'Alice', email: 'alice@example.com' },
    });
    handleMenuClose();
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    handleMenuClose();
  };

  const handleProfile = () => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { name: 'Alice Cooper' },
    });
    handleMenuClose();
  };

  const header = authState.isAuthenticated
    ? `Hello, ${authState.user.name}`
    : 'Not logged in';

  function getMenuItems() {
    var items = [];
    if (authState.isAuthenticated) {
      items.push(
        <MenuItem key="profile" onClick={handleProfile}>
          Profile
        </MenuItem>,
      );
      items.push(
        <MenuItem key="logout" onClick={handleLogout}>
          Logout
        </MenuItem>,
      );
    } else {
      items.push(
        <MenuItem key="login" onClick={handleLogin}>
          Login
        </MenuItem>,
      );
    }
    return items;
  }

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <AccountCircleIcon fontSize="large" sx={{ color: '#ffffff' }} />
      </IconButton>

      <Typography variant="caption" sx={{ ml: 1 }}>
        {header}
      </Typography>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {getMenuItems()}
      </Menu>
    </>
  );
}

export default User;

const initialAuthState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        user: null,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: state.user
          ? { ...state.user, ...action.payload }
          : null,
      };
    default:
      return state;
  }
}

export { initialAuthState, authReducer };

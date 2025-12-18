import { authReducer, initialAuthState, LOGIN, LOGOUT, UPDATE_PROFILE } from './authReducer';

describe('authReducer', () => {
  it('should return initial state by default', () => {
    const action = { type: 'UNKNOWN' };
    const state = authReducer(undefined, action);
    expect(state).toEqual(initialAuthState);
  });

  it('should handle LOGIN action', () => {
    const action = {
      type: LOGIN,
      payload: { name: 'Alice', email: 'alice@example.com' },
    };
    const state = authReducer(initialAuthState, action);
    expect(state).toEqual({
      isAuthenticated: true,
      user: { name: 'Alice', email: 'alice@example.com' },
    });
  });

  it('should handle LOGOUT action', () => {
    const loggedInState = {
      isAuthenticated: true,
      user: { name: 'Alice', email: 'alice@example.com' },
    };
    const action = { type: LOGOUT };
    const state = authReducer(loggedInState, action);
    expect(state).toEqual({
      isAuthenticated: false,
      user: null,
    });
  });

  it('should handle UPDATE_PROFILE action', () => {
    const currentState = {
      isAuthenticated: true,
      user: { name: 'Alice', email: 'alice@example.com' },
    };
    const action = {
      type: UPDATE_PROFILE,
      payload: { name: 'Alice Cooper' },
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual({
      isAuthenticated: true,
      user: { name: 'Alice Cooper', email: 'alice@example.com' },
    });
  });

  it('should not update profile if user is null', () => {
    const currentState = {
      isAuthenticated: false,
      user: null,
    };
    const action = {
      type: UPDATE_PROFILE,
      payload: { name: 'Ghost' },
    };
    const state = authReducer(currentState, action);
    expect(state).toEqual(currentState);
  });
});

import { AnyAction } from 'redux';
import { authReducer, AuthState } from './auth.reducer';
import { authActions } from './auth.actions';
import { AuthCredentials } from './auth.types';

describe('Auth reducer', () => {
  describe('login', () => {
    it('should store athentication state and token on login', () => {
      // arrange
      const action = authActions.loginAction({
        token: 'test',
      });
      // act & assert
      expect(authReducer(defaultState, action)).toEqual({
        isAuthenticated: true,
        token: 'test',
      });
    });
  });

  describe('logout', () => {
    it('should clear athentication state and token on logout', () => {
      // arrange
      const state = {
        isAuthenticated: true,
        token: 'test',
      };
      const action = authActions.logoutAction();
      // act & assert
      expect(authReducer(state, action)).toEqual({
        isAuthenticated: false,
        token: '',
      });
    });
  });

  it('should return the default state by default', () => {
    // arrange
    const action = {
      type: 'TEST',
    } as AnyAction;
    // act & assert
    expect(authReducer(undefined, action)).toEqual(defaultState);
  });

  const defaultState: AuthState = {
    isAuthenticated: false,
    token: '',
  };
});

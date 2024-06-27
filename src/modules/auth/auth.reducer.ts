import { AuthActionTypes, LoginAction } from './auth.actions';
import { AnyAction } from 'redux';

export type AuthState = {
  isAuthenticated: boolean;
  token: string;
};

export type AuthStore = {
  auth: AuthState;
};

export const authReducer = (
  state: AuthState = { isAuthenticated: false, token: '' },
  action: AnyAction
) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN: {
      const { payload: loginPayload } = action as LoginAction;
      const { token } = loginPayload;

      return {
        isAuthenticated: true,
        token,
      };
    }

    case AuthActionTypes.AUTH_LOGOUT:
      return {
        isAuthenticated: false,
        token: '',
      };
  }

  return state;
};

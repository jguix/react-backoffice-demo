export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH_LOGIN',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
}

export type LoginPayload = {
  token: string;
};

export type LoginAction = {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: LoginPayload;
};

const loginAction = (payload: LoginPayload): LoginAction => {
  return {
    payload,
    type: AuthActionTypes.AUTH_LOGIN,
  };
};

export type LogoutAction = {
  type: AuthActionTypes.AUTH_LOGOUT;
};

const logoutAction = (): LogoutAction => {
  return {
    type: AuthActionTypes.AUTH_LOGOUT,
  };
};

export const authActions = {
  loginAction,
  logoutAction,
};

import { store } from '../../store/store';
import { authActions } from './auth.actions';

const login = (): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(authActions.loginAction({ token: '1234567890' }));
    resolve();
  });
};

const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    store.dispatch(authActions.logoutAction());
    resolve();
  });
};

export const authCommands = {
  login,
  logout,
};

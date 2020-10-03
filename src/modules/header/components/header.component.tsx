import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { authCommands } from '../../auth/auth.commands';

export const BOHeader: FC = () => {
  const history = useHistory();
  const isAuthenticated = useSelector<ApplicationStore, boolean>((state) => state.ui.auth.isAuthenticated);

  const logout = () => {
    authCommands.logout().then(() => history.push('/login'));
  };

  return isAuthenticated ? (
    <>
      <span>
        <Link to="/customers">Customers</Link>
      </span>
      <span> | </span>
      <span>
        <Link to="/products">Products</Link>
      </span>
      <span> | </span>
      <span>
        <a href="" onClick={logout}>
          Logout
        </a>
      </span>
    </>
  ) : (
    <></>
  );
};

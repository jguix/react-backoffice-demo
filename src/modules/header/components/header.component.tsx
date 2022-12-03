import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { authCommands } from '../../auth/auth.commands';
import './header.component.scss';

export const BOHeader: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const isAuthenticated = useSelector<ApplicationStore, boolean>((state) => state.ui.auth.isAuthenticated);

  const logout = () => {
    authCommands.logout().then(() => history.push('/login'));
  };

  const isCurrentPath = (path: string) => path === location.pathname;

  return isAuthenticated ? (
    <div className="header">
      <div className="headerTitle">backoffice</div>
      <div className="headerNavigation">
        <div className="headerNavigationItem">
          <Link className={`buttonLink${isCurrentPath('/customers') ? ' selected' : ''}`} to="/customers">
            Customers
          </Link>
        </div>
        <div className="headerNavigationItem">
          <Link className={`buttonLink${isCurrentPath('/products') ? ' selected' : ''}`} to="/products">
            Products
          </Link>
        </div>
        <div className="headerNavigationItem">
          <button className="buttonLink" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

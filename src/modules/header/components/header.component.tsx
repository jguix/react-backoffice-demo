import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';
import { authCommands } from '../../auth/auth.commands';
import './header.component.scss';

export const BOHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector<ApplicationStore, boolean>((state) => state.ui.auth.isAuthenticated);

  const logout = () => {
    authCommands.logout().then(() => navigate('/login'));
  };

  const isCurrentPath = (path: string) => path === location.pathname;

  return isAuthenticated ? (
    <div className="header">
      <div className="headerTitle">backoffice</div>
      <div className="headerNavigation">
        <div className="headerNavigationItem">
          <Link
            data-testid="header-navigation-customers"
            className={`buttonLink${isCurrentPath('/customers') ? ' selected' : ''}`}
            to="/customers"
          >
            Customers
          </Link>
        </div>
        <div className="headerNavigationItem">
          <Link
            data-testid="header-navigation-products"
            className={`buttonLink${isCurrentPath('/products') ? ' selected' : ''}`}
            to="/products"
          >
            Products
          </Link>
        </div>
        <div className="headerNavigationItem">
          <button data-testid="header-navigation-logout" className="buttonLink" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

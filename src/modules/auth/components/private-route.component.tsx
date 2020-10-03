import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';

export const PrivateRoute: FC<RouteProps> = ({ component, ...rest }) => {
  const isAuthenticated = useSelector<ApplicationStore, boolean>((state) => state.ui.auth.isAuthenticated);

  return isAuthenticated ? (
    <Route {...rest} component={component} />
  ) : (
    <Route {...rest} render={() => <Redirect to={'/login'} />} />
  );
};

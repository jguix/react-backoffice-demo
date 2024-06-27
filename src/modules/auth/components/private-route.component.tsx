import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ApplicationStore } from '../../../store/store';

type PropsWithChildren<P> = P & { children?: ReactNode | undefined };

export const PrivateRoute: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isAuthenticated = useSelector<ApplicationStore, boolean>(
    (state) => state.ui.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

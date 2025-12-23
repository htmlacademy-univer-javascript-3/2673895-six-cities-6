import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../App/AppRoutes';
import { ReactElement } from 'react';

type PrivateRouteProps = {
  children: ReactElement;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  // заглушка
  const isAuthorized = false;

  return isAuthorized ? children : <Navigate to={AppRoutes.Login} replace />;
}


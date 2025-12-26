import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoutes } from '../App/AppRoutes';
import { getAuthorizationStatus } from '../store/selectors';
import { ReactElement } from 'react';

type PrivateRouteProps = {
  children: ReactElement;
};

export function PrivateRoute({ children }: PrivateRouteProps) {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  return authorizationStatus === 'AUTH' ? children : <Navigate to={AppRoutes.Login} replace />;
}


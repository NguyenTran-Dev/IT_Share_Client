import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import isLogin from '../filters/isLogin';
import { ROUTES } from '../config/routes';

type WithUserRoleProps = {
  component: React.ComponentType;
};
const PrivateRoute: FC<WithUserRoleProps> = ({
  component: Component,
  ...rest
}) => {
  return isLogin() ? <Component {...rest} /> : <Navigate to={ROUTES.LOGIN} />;
};
export default PrivateRoute;

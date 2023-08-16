import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { getSession } from '../filters/servicesSession';

type WithUserRoleProps = {
  component: React.ComponentType;
  allowedRoles: string[];
};

const WithUserRole: FC<WithUserRoleProps> = ({
  component: Component,
  allowedRoles,
}) => {
  const userInfo = getSession('user-info');

  if (allowedRoles.includes(userInfo?.role)) {
    return <Component />;
  } else {
    return <Navigate to={ROUTES.NOTFOUND} replace />;
  }
};
export default WithUserRole;

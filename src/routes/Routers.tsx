import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import Admin from '../pages/admin/Admin';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import Login from '../pages/auth/login/Login';
import Example from '../pages/Example';
import NotFound from '../pages/NotFound';
import User from '../pages/user/User';

const Routers = () => {
  return (
    <Routes>
      {/* Route Admin */}
      <Route path={ROUTES.ADMIN} element={<Admin />}>
        <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
      </Route>

      {/* Route User */}
      <Route path={ROUTES.USER} element={<User />}></Route>

      {/* Router Public */}
      <Route path={ROUTES.EXAMPLE} element={<Example />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      <Route path="*" element={<Navigate to={ROUTES.NOTFOUND} replace />} />
    </Routes>
  );
};

export default Routers;

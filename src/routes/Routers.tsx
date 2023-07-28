import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import Login from '../pages/auth/login/Login';
import Example from '../pages/Example';

const PublicRouters = () => {
  return (
    <Routes>
      <Route path={ROUTES.EXAMPLE} element={<Example />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </Routes>
  );
};

export default PublicRouters;

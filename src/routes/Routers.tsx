import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import Example from '../pages/Example';

const Routers = () => {
  return (
    <Routes>
      <Route path={ROUTES.EXAMPLE} element={<Example />} />
    </Routes>
  );
};

export default Routers;

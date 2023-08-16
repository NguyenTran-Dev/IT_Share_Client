import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import Admin from '../pages/admin/Admin';
import DashBoard from '../pages/admin/dashboard/DashBoard';
import Login from '../pages/auth/login/Login';
import Register from '../pages/auth/register/Register';
import NotFound from '../pages/NotFound';
import HomePage from '../pages/user/home/HomePage';
import Layout from '../pages/user/Layout';
import Create from '../pages/user/post/create/Create';
import Detail from '../pages/user/post/detail/Detail';
import Posts from '../pages/user/post/Posts';
import LayoutProfile from '../pages/user/profile/LayoutProfile';
import MyPost from '../pages/user/profile/post/MyPost';
import ChatLayout from '../pages/user/chatBot/ChatLayout';
import { useDispatch } from 'react-redux';
import { refreshToken } from '../reducers/authReducer';
import { AppDispatch } from '../stores/store';
import { getCookie } from '../filters/servicesCookie';
import isLogin from '../filters/isLogin';
import User from '../pages/admin/managementUser/User';
import { RoleUser } from '../constants/enum';
import WithUserRole from './WithUserRole';
import PrivateRoute from './PrivateRoute';

const Routers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refreshTokenRaw = getCookie('refresh_token');

  const handleRefreshToken = () => {
    if (refreshTokenRaw) {
      dispatch(refreshToken({ refresh_token: refreshTokenRaw })).then(() => {
        if (!isLogin()) window.location.reload();
      });
    }
  };

  useEffect(() => {
    if (refreshTokenRaw && !isLogin()) {
      handleRefreshToken();
    }
  }, [refreshTokenRaw, isLogin()]);

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user-info' && event.newValue !== event.oldValue) {
        handleRefreshToken();
      }
    });
  }, [dispatchEvent(new Event('storage'))]);

  return (
    <Routes>
      {/* Route Admin */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <WithUserRole component={Admin} allowedRoles={[RoleUser.ADMIN]} />
        }
      >
        <Route index element={<DashBoard />} />
        <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
        <Route path={ROUTES.MUSERS} element={<User />} />
        <Route path={ROUTES.MPOST} element={<Create />} />
      </Route>

      {/* Route User */}
      <Route path={'/'} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route
          path={ROUTES.QUESTION}
          element={<PrivateRoute component={ChatLayout} />}
        />
        <Route path={ROUTES.POST} element={<Posts />}>
          <Route
            path={ROUTES.CREATE}
            element={<PrivateRoute component={Create} />}
          />
          <Route
            path={`${ROUTES.UPDATE}/:id`}
            element={<PrivateRoute component={Create} />}
          />
          <Route path={ROUTES.DETAIL} element={<Detail />} />
        </Route>
        <Route
          path={ROUTES.PROFILE}
          element={<PrivateRoute component={LayoutProfile} />}
        >
          <Route path={ROUTES.MYPOST} element={<MyPost />} />
        </Route>
      </Route>

      {/* Router Public */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
      <Route path="*" element={<Navigate to={ROUTES.NOTFOUND} replace />} />
    </Routes>
  );
};

export default Routers;

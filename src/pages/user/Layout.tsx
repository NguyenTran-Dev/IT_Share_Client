import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/Footer';
import FooterLogin from './components/layout/FooterLogin';
import Header from './components/layout/Header';
import { useLogin } from '../../hooks/useLogin';

const Layout = () => {
  const { isSigIn } = useLogin();

  return (
    <Box backgroundColor="#F2F3F5">
      <Header />
      <Box minH="93.4vh">
        <Outlet />
      </Box>
      <Footer />
      {!isSigIn && <FooterLogin />}
    </Box>
  );
};

export default Layout;

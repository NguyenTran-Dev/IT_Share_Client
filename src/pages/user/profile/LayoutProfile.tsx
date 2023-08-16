import { Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const LayoutProfile = () => {
  return (
    <Container w="100%" maxW="70rem" pt="5.5rem">
      <Outlet />
    </Container>
  );
};

export default LayoutProfile;

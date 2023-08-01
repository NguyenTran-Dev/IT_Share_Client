import { Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';

const Admin = () => {
  return (
    <Grid gap={4}>
      <GridItem colSpan={4}>
        <NavBar />
      </GridItem>
      <GridItem colSpan={6}>
        <Outlet />
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Admin;

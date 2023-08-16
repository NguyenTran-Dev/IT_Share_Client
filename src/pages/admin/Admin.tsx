import React from 'react';
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react';
import Footer from './components/layout/Footer';
import ProfileMenu from '../../components/ProfileMenu';
import NavBar from './components/layout/NavBar';
import { Outlet } from 'react-router-dom';
import { AiFillBell } from 'react-icons/ai';

const Admin = () => {
  return (
    <Grid
      templateAreas={`"nav header"
                  "nav main"
                  "nav footer"`}
      gridTemplateRows={'70px 1fr 30px'}
      gridTemplateColumns={'250px 1fr'}
      h="200px"
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem
        p="0.7rem 1rem"
        area={'header'}
        borderBottom="0.1rem solid #ebedf0"
      >
        <Flex justifyContent="end" alignItems="center">
          <Box mr="2rem">
            <AiFillBell fontSize="1.5rem" />
          </Box>
          <ProfileMenu />
        </Flex>
      </GridItem>
      <GridItem area={'nav'} bg="linkedin.900" color="white">
        <Heading
          p="1rem 0 0.6rem"
          textAlign="center"
          borderBottom="0.1rem solid gray"
        >
          Tech Base
        </Heading>
        <NavBar />
      </GridItem>
      <GridItem area={'main'} height="88.5vh" p="2rem">
        <Outlet />
      </GridItem>
      <GridItem area={'footer'}>
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Admin;

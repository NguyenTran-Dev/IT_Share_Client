import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  List,
  ListItem,
  Text,
  useBoolean,
} from '@chakra-ui/react';
import {
  AiFillHome,
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineWechat,
  // AiTwotoneEdit,
} from 'react-icons/ai';
import { NavLink, useNavigate } from 'react-router-dom';
import ProfileMenu from '../../../../components/ProfileMenu';
import { ROUTES } from '../../../../config/routes';
import isLogin from '../../../../filters/isLogin';
import { logOut } from '../../../../filters/logOut';

const Header = () => {
  const [flag, setFlag] = useBoolean(true);
  const navigator = useNavigate();

  const listItemPc = [
    { link: ROUTES.HOME, icon: <AiFillHome size="2rem" /> },
    // { link: ROUTES.CREATE, icon: <AiTwotoneEdit size="2rem" /> },
    { link: ROUTES.QUESTION, icon: <AiOutlineWechat size="2rem" /> },
  ];

  const listItemSP = [
    { link: ROUTES.HOME, title: 'Home' },
    { link: ROUTES.CREATE, title: 'Create Post' },
    { link: ROUTES.QUESTION, title: 'Questions' },
  ];

  const renderItemPc = () => {
    return listItemPc.map((item) => {
      return (
        <ListItem key={item?.link}>
          <NavLink to={item?.link} className="header_nav-link">
            {item?.icon}
          </NavLink>
        </ListItem>
      );
    });
  };

  const renderItemSP = () => {
    const navLogin = [
      { link: ROUTES.MYPOST, title: 'My Account' },
      { link: ROUTES.HOME, title: 'Setting' },
    ];
    const result = isLogin() ? listItemSP.concat(navLogin) : listItemSP;
    return result.map((item) => {
      return (
        <ListItem key={item?.title} p={2} borderTop="1px solid gray">
          <NavLink
            to={item?.link}
            className="header_nav-link"
            onClick={setFlag.toggle}
          >
            {item?.title}
          </NavLink>
        </ListItem>
      );
    });
  };

  return (
    <Box
      className="header"
      position="fixed"
      zIndex="9"
      width="100%"
      top="0"
      p="4"
    >
      <Container maxW="70rem">
        <Box className="header-main">
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={4}
            backgroundColor="white"
          >
            <GridItem colSpan={3}>
              <Heading
                color="linkedin.700"
                cursor="pointer"
                onClick={() => {
                  navigator(ROUTES.HOME);
                }}
              >
                Tech Base
              </Heading>
            </GridItem>
            <GridItem colSpan={6}>
              <List
                display="flex"
                justifyContent="space-around"
                h="100%"
                alignItems="center"
              >
                {renderItemPc()}
              </List>
            </GridItem>
            <GridItem colSpan={3} textAlign="right">
              {!isLogin() ? (
                <Button
                  backgroundColor="linkedin.700"
                  color="white"
                  onClick={() => navigator(ROUTES.LOGIN)}
                >
                  <Text as="span">Sign In/Sign Up</Text>
                </Button>
              ) : (
                <ProfileMenu />
              )}
            </GridItem>
          </Grid>
        </Box>
        <Box className="header-sub">
          <Grid
            templateColumns="repeat(12, 1fr)"
            gap={4}
            backgroundColor="white"
          >
            <GridItem colSpan={9}>
              <Heading color="linkedin.700">Tech Base</Heading>
            </GridItem>
            <GridItem colSpan={3} textAlign="right">
              <List>
                <Button variant="outline" onClick={setFlag.toggle}>
                  {flag ? <AiOutlineMenu /> : <AiOutlineClose />}
                </Button>
                <List
                  display={flag ? 'none' : 'block'}
                  justifyContent="space-between"
                  position="absolute"
                  backgroundColor="white"
                  width="100%"
                  top="4.5rem"
                  left="0"
                  textAlign="center"
                  h="100vh"
                >
                  {renderItemSP()}
                  {!isLogin() ? (
                    <ListItem p={2} borderTop="1px solid gray">
                      <Button
                        backgroundColor="linkedin.700"
                        color="white"
                        onClick={() => navigator(ROUTES.LOGIN)}
                      >
                        <Text as="span">Sign In/Sign Up</Text>
                      </Button>
                    </ListItem>
                  ) : (
                    <ListItem
                      p={2}
                      borderTop="1px solid gray"
                      borderBottom="1px solid gray"
                    >
                      <Text onClick={logOut} color="red">
                        Log out
                      </Text>
                    </ListItem>
                  )}
                </List>
              </List>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;

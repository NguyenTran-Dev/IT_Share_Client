import React, { useMemo } from 'react';
import { Box, Button, Center, Image } from '@chakra-ui/react';
import NotFoundImage from '../assets/images/404.gif';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
import { getSession } from '../filters/servicesSession';
import { RoleUser } from '../constants/enum';
const NotFound = () => {
  const navigator = useNavigate();
  const userInfo = getSession('user-info');
  const nextScreen = useMemo(() => {
    return userInfo?.role === RoleUser.ADMIN ? ROUTES.ADMIN : ROUTES.HOME;
  }, userInfo);
  return (
    <Box>
      <Center>
        <Image alignItems="center" src={NotFoundImage} />
      </Center>
      <Center>
        <Button
          colorScheme="yellow"
          color="white"
          onClick={() => navigator(nextScreen)}
        >
          Back Page
        </Button>
      </Center>
    </Box>
  );
};

export default NotFound;

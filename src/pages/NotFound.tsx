import React from 'react';
import { Box, Button, Center, Image } from '@chakra-ui/react';
import NotFoundImage from '../assets/images/404.gif';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';
const NotFound = () => {
  const navigator = useNavigate();
  return (
    <Box>
      <Center>
        <Image alignItems="center" src={NotFoundImage} />
      </Center>
      <Center>
        <Button
          colorScheme="yellow"
          color="white"
          onClick={() => navigator(ROUTES.EXAMPLE)}
        >
          Back Home
        </Button>
      </Center>
    </Box>
  );
};

export default NotFound;

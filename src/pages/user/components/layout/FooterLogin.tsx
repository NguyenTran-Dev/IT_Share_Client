import {
  Box,
  Button,
  Center,
  CloseButton,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  useBoolean,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../config/routes';

const FooterLogin = () => {
  const [flag, setFlag] = useBoolean(true);
  const navigator = useNavigate();
  return (
    <Box
      className="footer_login"
      background="white"
      position="fixed"
      bottom="0"
      w="100%"
      display={flag ? 'block' : 'none'}
    >
      <Container maxW="70rem">
        <Grid h="200px" templateColumns="repeat(12, 1fr)" gap={4}>
          <GridItem colSpan={4}>
            <Center h="100%" color="linkedin.700">
              <Heading className="footer_logo">Tech Base</Heading>
            </Center>
          </GridItem>
          <GridItem colSpan={7}>
            <Center h="100%" color="gray.700" flexDirection="column">
              <Heading fontSize="md">
                Sign up for a Tech Base account to receive more interesting
                articles.
              </Heading>
              <Flex justifyContent="space-around" w="100%" mt="2rem">
                <Button
                  width="100%"
                  maxW="15rem"
                  bgColor="linkedin.700"
                  color="white"
                  onClick={() => navigator(ROUTES.LOGIN)}
                >
                  Sign In
                </Button>
                <Button
                  width="100%"
                  maxW="15rem"
                  color="linkedin.700"
                  onClick={() => navigator(ROUTES.REGISTER)}
                >
                  Sign Up
                </Button>
              </Flex>
            </Center>
          </GridItem>
          <GridItem colSpan={1}>
            <CloseButton
              mt="2rem"
              color="linkedin.700"
              onClick={setFlag.toggle}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default FooterLogin;

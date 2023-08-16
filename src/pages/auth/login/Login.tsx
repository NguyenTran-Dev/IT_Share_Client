import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import React, { useId } from 'react';
import { Controller } from 'react-hook-form';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { FormControl } from '../../../components';
import InputCommon from '../../../components/InputCommon';
import InputPassword from '../../../components/InputPassword';
import { ROUTES } from '../../../config/routes';
import { useRoot } from './hooks/useRoot';

const Login = () => {
  const $id = useId();
  const { handleSubmit, onSubmit, control, errors, loadingBtn } = useRoot();

  return (
    <Box className="login">
      <Center w="100%" h="100vh">
        <Card p="4" w="100%" maxW="35rem">
          <Heading textAlign="center" color="linkedin.500">
            Tech Base
          </Heading>
          <Heading textAlign="center" fontSize="1.5rem">
            Login
          </Heading>
          {Object.keys(errors).length >= 1 && (
            <Card p="1rem" m="1rem">
              <List>
                {Object.entries(errors).map(([key, value]) => (
                  <ListItem key={key} color="red" display="flex">
                    <Box mr="0.5rem">
                      <AiOutlineWarning size="1.6rem" />
                    </Box>
                    <Text as="p" mt="0.1rem">
                      {value.message}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </Card>
          )}
          <Box as="form" id={$id} onSubmit={handleSubmit(onSubmit)}>
            <FormControl label="Email" require>
              <InputCommon
                name="email"
                control={control}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl label="Password" require>
              <Controller
                name="password"
                control={control}
                render={({ field }) => <InputPassword field={field} />}
              />
            </FormControl>
          </Box>
          <Center w="100%">
            <Button
              form={$id}
              type={loadingBtn ? 'button' : 'submit'}
              colorScheme="linkedin"
              w="100%"
              mx="1rem"
              disabled={loadingBtn}
            >
              Login
            </Button>
          </Center>
          <Flex
            justifyContent="space-between"
            mx="1rem"
            mt="0.5rem"
            color="linkedin.500"
            fontStyle="italic"
          >
            <Link to={`${ROUTES.REGISTER}`}>Forgot password?</Link>
            <Link to={`${ROUTES.REGISTER}`}>Register account</Link>
          </Flex>
        </Card>
      </Center>
    </Box>
  );
};

export default Login;

import React, { useId } from 'react';
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
import { FormControl, InputCommon } from '../../../components';
import { Controller } from 'react-hook-form';
import InputPassword from '../../../components/InputPassword';
import { useRoot } from './hooks/useRoot';
import { AiOutlineWarning } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../config/routes';

const Register = () => {
  const $id = useId();
  const { handleSubmit, onSubmit, control, errors, msgPass } = useRoot();

  return (
    <Box className="login">
      <Center w="100%" h="100vh">
        <Card p="4" w="100%" maxW="35rem">
          <Heading textAlign="center" color="linkedin.500">
            Tech Base
          </Heading>
          <Heading textAlign="center" fontSize="1.5rem">
            Register
          </Heading>
          {(Object.keys(errors).length >= 1 || !!msgPass) && (
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
                {!!msgPass && (
                  <ListItem color="red" display="flex">
                    <Box mr="0.5rem">
                      <AiOutlineWarning size="1.6rem" />
                    </Box>
                    <Text as="p" mt="0.1rem">
                      {msgPass}
                    </Text>
                  </ListItem>
                )}
              </List>
            </Card>
          )}
          <Box as="form" id={$id} onSubmit={handleSubmit(onSubmit)}>
            <FormControl label="Full name" require>
              <InputCommon
                name="full_name"
                control={control}
                placeholder="Enter full name"
              />
            </FormControl>
            <FormControl
              label="Email"
              require
              helperText="Ex: example@gmail.com"
            >
              <InputCommon
                name="email"
                control={control}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl
              label="Password"
              require
              helperText="Note: Length from 8 to 16 characters including uppercase, lowercase and at least one special character"
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => <InputPassword field={field} />}
              />
            </FormControl>
            <FormControl label="Confirm Password" require>
              <Controller
                name="cf_password"
                control={control}
                render={({ field }) => <InputPassword field={field} />}
              />
            </FormControl>
          </Box>
          <Center w="100%">
            <Button
              form={$id}
              type="submit"
              colorScheme="linkedin"
              w="100%"
              mx="1rem"
            >
              Register
            </Button>
          </Center>
          <Flex justifyContent="space-between" mx="1rem" mt="0.5rem">
            <Link to={`${ROUTES.REGISTER}`}>
              <Text
                color="linkedin.400"
                fontStyle="italic"
                _hover={{ textDecoration: 'underline' }}
              >
                Forgot password?
              </Text>
            </Link>
            <Link to={`${ROUTES.LOGIN}`}>
              <Text
                color="linkedin.400"
                fontStyle="italic"
                _hover={{ textDecoration: 'underline' }}
              >
                Login
              </Text>
            </Link>
          </Flex>
        </Card>
      </Center>
    </Box>
  );
};

export default Register;

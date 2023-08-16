import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useUser } from './hooks/useUser';
import { AiTwotoneDelete } from 'react-icons/ai';
import { RoleUser } from '../../../constants/enum';
import UpdateUser from './components/UpdateUser';
import { ModalCommon } from '../../../components';
import InputSearch from '../components/InputSearch';

const User = () => {
  const {
    users,
    handleDeletedUsers,
    isOpenModal,
    setIsOpenModal,
    handleSearch,
  } = useUser();
  const [idUserDel, setIdUserDel] = useState('');

  const renderUsers = () => {
    return users?.map((item, index) => {
      return (
        <Tr key={item?._id}>
          <Td>{index + 1}</Td>
          <Td>{item?.full_name}</Td>
          <Td>{item?.email}</Td>
          <Td>
            <Tag colorScheme={item?.role === RoleUser.ADMIN ? 'red' : 'green'}>
              {item?.role === RoleUser.ADMIN ? 'Admin' : 'User'}
            </Tag>
          </Td>
          <Td isNumeric>
            <UpdateUser _id={item?._id} />
            <Button
              color="white"
              bg="red.500"
              _hover={{ bg: 'red.600' }}
              isDisabled={item.role === RoleUser.ADMIN}
              onClick={() => {
                setIsOpenModal(true);
                setIdUserDel(item?._id);
              }}
            >
              <AiTwotoneDelete />
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  return (
    <Box>
      <Heading fontSize={{ base: '1rem', md: '1.5rem' }} fontWeight="300">
        Users
      </Heading>
      <Flex>
        <InputSearch onSearch={handleSearch} rest={{ mt: '2rem' }} />
      </Flex>
      <TableContainer mt="2rem">
        <Table
          size="md"
          border="1px solid  #ebedf0"
          variant="striped"
          colorScheme="gray"
        >
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>Full Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th isNumeric>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>{renderUsers()}</Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Text>Total: {users?.length ?? 0}</Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <ModalCommon
        isOpen={isOpenModal}
        setOpen={() => setIsOpenModal(false)}
        isIconClose
      >
        <>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            borderRadius="0.2rem"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              You definitely want to delete?
            </AlertTitle>
          </Alert>
          <Flex mt="1rem" justifyContent="space-between">
            <Button
              color="white"
              bg="red.500"
              maxW="12rem"
              w="100%"
              _hover={{ bg: 'red.600' }}
              onClick={() => handleDeletedUsers(idUserDel)}
            >
              Delete
            </Button>
            <Button maxW="12rem" w="100%" onClick={() => setIsOpenModal(false)}>
              Cancel
            </Button>
          </Flex>
        </>
      </ModalCommon>
    </Box>
  );
};

export default User;

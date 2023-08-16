import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { FC, useId } from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { getUserById } from '../../../../reducers/userReducer';
import FormControlCommon from '../../../../components/FormControl';
import LoadingSub from '../../../../components/loading/LoadingSub';
import { useUpdate } from './hooks/useUpdate';
import { InputCommon } from '../../../../components';
import RadioCommon from '../../../../components/RadioCommon';
import { RoleUser } from '../../../../constants/enum';

interface IUpdateUser {
  _id: string;
}

const UpdateUser: FC<IUpdateUser> = (props) => {
  const { _id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const $id = useId();
  const { handleSubmit, control, onUpdate, loading, dispatch, errors } =
    useUpdate();

  const onEdit = () => {
    dispatch(getUserById(_id));
    onOpen();
  };

  return (
    <>
      <Button
        onClick={onEdit}
        color="white"
        bg="green.500"
        _hover={{ bg: 'green.600' }}
        mr="2rem"
      >
        <AiTwotoneEdit />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Information User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!loading ? (
              <Box id={$id} as="form" onSubmit={handleSubmit(onUpdate)}>
                <FormControlCommon
                  label="FullName"
                  require
                  errorMessage={errors.full_name?.message}
                >
                  <InputCommon
                    control={control}
                    name="full_name"
                    placeholder="Full name"
                  />
                </FormControlCommon>

                <FormControlCommon
                  label="Email"
                  require
                  errorMessage={errors.email?.message}
                >
                  <InputCommon
                    control={control}
                    name="email"
                    placeholder="Email"
                  />
                </FormControlCommon>

                <FormControlCommon
                  label="Role"
                  require
                  errorMessage={errors.role?.message}
                >
                  <RadioCommon
                    control={control}
                    name="role"
                    defaultValue={control._defaultValues.role}
                    options={[
                      { key: 1, title: 'Admin', value: RoleUser.ADMIN },
                      { key: 2, title: 'User', value: RoleUser.USER },
                    ]}
                  />
                </FormControlCommon>
              </Box>
            ) : (
              <LoadingSub isLoading={loading} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              form={$id}
              type={loading ? 'button' : 'submit'}
              isDisabled={loading}
            >
              Save
            </Button>
            <Button
              onClick={onClose}
              color="white"
              bg="red.400"
              _hover={{ bg: 'red.600' }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateUser;

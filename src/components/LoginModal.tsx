import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ModalCommon } from '.';
import { logOut } from '../filters/logOut';

const LoginModal: React.FC<any> = (props) => {
  const { isOpen, setIsOpen } = props;
  const [isAlert, setAlert] = useState(false);
  useEffect(() => {
    setAlert(isOpen);
  }, [isOpen]);

  return (
    <ModalCommon
      isOpen={isAlert}
      setOpen={() => setIsOpen(false)}
      isBtnClose={false}
    >
      <>
        <Alert
          status="warning"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="0.2rem"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Please log in!
          </AlertTitle>
        </Alert>
        <Button
          mt="1rem"
          w="100%"
          color="white"
          colorScheme="linkedin"
          onClick={logOut}
        >
          Sign In Now
        </Button>
      </>
    </ModalCommon>
  );
};

export default LoginModal;

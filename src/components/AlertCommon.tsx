import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { IAlert } from '../interfaces/IAlert';
import { useAlert } from '../providers/AlertProvider';

const AlertCommon: React.FC<IAlert> = () => {
  const { alert, hideAlert } = useAlert();

  useEffect(() => {
    if (alert.isOpen)
      setTimeout(() => {
        hideAlert();
      }, 3000);
  }, [alert.isOpen]);

  return alert.isOpen ? (
    <Alert
      status={alert.status}
      zIndex={99}
      position="fixed"
      top="5.6rem"
      right="1rem"
      w="100%"
      maxW={{ base: '18rem', md: '30rem' }}
      variant="top-accent"
    >
      <AlertIcon />
      <Box>
        <AlertTitle>{alert.title}</AlertTitle>
        <AlertDescription>{alert.desc}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="absolute"
        right="0.1rem"
        top="0.1rem"
        onClick={hideAlert}
      />
    </Alert>
  ) : (
    <></>
  );
};

export default AlertCommon;

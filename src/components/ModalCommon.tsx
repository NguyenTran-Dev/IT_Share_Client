import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

interface IModelProps {
  children: ReactElement;
  title?: string;
  isOpen: boolean;
  isBtnClose?: boolean;
  isIconClose?: boolean;
  setOpen: () => void;
}

const ModalCommon: React.FC<IModelProps> = (props) => {
  const { isOpen, children, title, isBtnClose, isIconClose, setOpen } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    setIsOpenModal(isOpen);
  }, [isOpen]);

  return (
    <Modal
      onClose={() => {
        setIsOpenModal(false);
        setOpen();
      }}
      isOpen={isOpenModal}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {isIconClose && <ModalCloseButton />}
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          {isBtnClose && (
            <Button
              onClick={() => {
                setIsOpenModal(false);
                setOpen();
              }}
            >
              Close
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalCommon;

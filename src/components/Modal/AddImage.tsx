import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { FormAddImage } from '../Form/FormAddImage';

interface ModalAddImageProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalAddImage({
  isOpen,
  onClose,
}: ModalAddImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='4xl'>
      <ModalOverlay />

      <ModalContent bgColor='pGray.900'>
        <ModalHeader fontSize='4xl'>Nova imagem</ModalHeader>

        <ModalCloseButton />

        <ModalBody px={60}>
          <FormAddImage closeModal={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

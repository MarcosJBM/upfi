import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent maxWidth='900px' maxHeight='600px'>
        <ModalBody p={0}>
          <Image
            src={imgUrl}
            maxWidth='900px'
            width='full'
            maxHeight='600px'
            height='full'
          />
        </ModalBody>

        <ModalFooter
          justifyContent='flex-start'
          rounded='0 0 6px 6px'
          bgColor='pGray.800'
        >
          <Link href={imgUrl} target='_blank' fontSize='sm' color='pGray.50'>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

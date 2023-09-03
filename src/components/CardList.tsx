import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface CardProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: CardProps[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [selectedImageUrl, setSelectedImageUrl] = useState<string>('');

  function handleViewImage(url: string) {
    setSelectedImageUrl(url);

    onOpen();
  }

  return (
    <Fragment>
      <SimpleGrid columns={3} spacing={10}>
        {cards.map(card => (
          <Card
            key={card.id}
            data={card}
            viewImage={url => handleViewImage(url)}
          />
        ))}
      </SimpleGrid>

      <ModalViewImage
        imgUrl={selectedImageUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Fragment>
  );
}

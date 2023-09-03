import { Button, Box } from '@chakra-ui/react';
import { Fragment, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface FetchImagesProps {
  pageParam?: string | null;
}

interface ImageProps {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface FetchImagesResponse {
  data: ImageProps[];
  after: string;
}

async function fetchImages({ pageParam = null }: FetchImagesProps) {
  const { data } = await api.get<FetchImagesResponse>('api/images', {
    params: { after: pageParam },
  });

  return data;
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['images'],
    queryFn: fetchImages,
    getNextPageParam: lastPage => lastPage.after || null,
  });

  const formattedData = useMemo(() => {
    if (!data) return [];

    return data.pages.map(page => page.data).flat();
  }, [data]);

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <Fragment>
      <Header />

      <Box maxW={1120} px={20} mx='auto' my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button onClick={() => fetchNextPage()} mt='10'>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </Fragment>
  );
}

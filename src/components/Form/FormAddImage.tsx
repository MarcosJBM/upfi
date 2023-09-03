import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';
import { api } from '../../services/api';

const IMAGE_LIMIT_SIZE_IN_MB = 10;

function validateImageSize(file: File) {
  const fileSizeInMb = file.size / (1024 * 1024);

  if (fileSizeInMb <= IMAGE_LIMIT_SIZE_IN_MB) return true;

  return 'O arquivo deve ser menor que 10MB';
}

const acceptedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

function validateImageFormat(file: File) {
  if (acceptedImageFormats.includes(file.type)) return true;

  return 'Somente são aceitos arquivos PNG, JPEG e GIF';
}

const formValidations = {
  image: {
    required: 'Arquivo obrigatório',
    validate: {
      lessThan10MB: (file: File[]) => {
        return validateImageSize(file[0]);
      },
      acceptedFormats: (file: File[]) => {
        return validateImageFormat(file[0]);
      },
    },
  },
  title: {
    required: 'Título obrigatório',
    minLength: { message: 'Mínimo de 2 caracteres', value: 2 },
    maxLength: { message: 'Máximo de 20 caracteres', value: 20 },
  },
  description: {
    required: 'Descrição obrigatória',
    maxLength: { message: 'Máximo de 65 caracteres', value: 65 },
  },
} as const;

interface CreateNewImageModel {
  title: string;
  description: string;
  url: string;
}

async function createNewImage(newImage: CreateNewImageModel) {
  await api.post('api/images', newImage);
}

interface FormAddImageProps {
  closeModal: () => void;
}

interface FormProps {
  title: string;
  description: string;
  image: string;
}

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [localImageUrl, setLocalImageUrl] = useState<string>('');

  const toast = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation(createNewImage, {
    onSuccess: () => queryClient.invalidateQueries('images'),
  });

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm<FormProps>();

  const { errors } = formState;

  async function onSubmit(data: FormProps) {
    try {
      if (!imageUrl) {
        toast({
          title: 'Imagem não adicionada',
          description:
            'É preciso adicionar e aguardar o upload de uma imagem antes de realizar o cadastro.',
          status: 'info',
        });
      } else {
        await mutation.mutateAsync({
          title: data.title,
          description: data.description,
          url: imageUrl,
        });

        toast({
          title: 'Imagem cadastrada',
          description: 'Sua imagem foi cadastrada com sucesso.',
          status: 'success',
        });
      }
    } catch {
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar cadastrar a sua imagem.',
        status: 'error',
      });
    } finally {
      reset();
      setImageUrl('');
      setLocalImageUrl('');
      closeModal();
    }
  }

  return (
    <Box as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={(_, error) => setError('image', error)}
          trigger={() => trigger('image')}
          {...register('image', formValidations.image)}
          error={errors.image}
        />

        <TextInput
          placeholder='Título da imagem...'
          {...register('title', formValidations.title)}
          error={errors?.title}
        />

        <TextInput
          placeholder='Descrição da imagem...'
          {...register('description', formValidations.description)}
          error={errors?.description}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type='submit'
        w='100%'
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}

import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { api } from '../../services/api';
import { FileInput } from '../Input/FileInput';
import { TextInput } from '../Input/TextInput';

interface FormAddImageProps {
  closeModal: () => void;
}

const IMAGE_LIMIT_SIZE_IN_MB = 10;
function validateImageSize(file: File): string | boolean {
  const fileSizeInMb = file.size / (1024 * 1024);

  if (fileSizeInMb <= IMAGE_LIMIT_SIZE_IN_MB) return true;

  return 'O arquivo deve ser menor que 10MB';
}

const acceptedImageFormats = ['image/jpeg', 'image/png', 'image/gif'];

function validateImageFormat(file: File): string | boolean {
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

export function FormAddImage({ closeModal }: FormAddImageProps): JSX.Element {
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUrl, setLocalImageUrl] = useState('');
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    // TODO MUTATION API POST REQUEST,
    {
      // TODO ONSUCCESS MUTATION
    }
  );

  const { register, handleSubmit, reset, formState, setError, trigger } =
    useForm();
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO SHOW ERROR TOAST IF IMAGE URL DOES NOT EXISTS
      // TODO EXECUTE ASYNC MUTATION
      // TODO SHOW SUCCESS TOAST
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
    }
  };

  return (
    <Box as='form' width='100%' onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FileInput
          setImageUrl={setImageUrl}
          localImageUrl={localImageUrl}
          setLocalImageUrl={setLocalImageUrl}
          setError={setError}
          trigger={trigger}
          {...register('image', formValidations.image)}
          error={errors?.image}
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

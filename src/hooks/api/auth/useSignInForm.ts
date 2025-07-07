import { SigninRequest } from '@/api/auth/type';
import { SubmitHandler, useForm } from 'react-hook-form';

import { signin } from '@/lib/supabase/repositories/users';
import { useMutation } from '@tanstack/react-query';

export const useSignInForm = () => {
  const { mutate: signIn } = useMutation({
    mutationFn: (data: SigninRequest) => signin(data),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SigninRequest>();

  const onSubmit: SubmitHandler<SigninRequest> = (data) => {
    signIn(data, {
      onError: (error: Error) => {
        const errorData = JSON.parse(error.message);
        if (
          errorData.code === 'VALIDATION_ERROR' ||
          errorData.code === 'USER_NOT_FOUND'
        ) {
          setError('email', { type: 'manual', message: errorData.message });
        }
        if (errorData.code === 'INVALID_CREDENTIALS') {
          setError('password', { type: 'manual', message: errorData.message });
        }
      },
    });
  };

  return { onSubmit, register, handleSubmit, isSubmitting, errors };
};

export default useSignInForm;

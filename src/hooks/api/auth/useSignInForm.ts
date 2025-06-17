import { SignInFormData } from '@/api/auth/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostSignin } from './usePostSignin';
import { useRouter } from 'next/navigation';

export const useSignInForm = () => {
  const { mutate: signIn } = usePostSignin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>();

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    signIn(data, {
      onSuccess: () => {
        router.push('/social'); //TODO: useReferer  추가
      },
      onError: (error: Error) => {
        const errorData = JSON.parse(error.message);
        if (
          errorData.code === 'VALIDATION_ERROR' ||
          errorData.code === 'USER_NOT_FOUND'
        ) {
          setError('email', {
            type: 'manual',
            message: errorData.message,
          });
        }
        if (errorData.code === 'INVALID_CREDENTIALS') {
          setError('password', {
            type: 'manual',
            message: errorData.message,
          });
        }
      },
    });
  };

  return { onSubmit, register, handleSubmit, isSubmitting, errors };
};

export default useSignInForm;

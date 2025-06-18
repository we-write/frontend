import { SigninRequest } from '@/api/auth/type';
import { SubmitHandler, useForm } from 'react-hook-form';
import { usePostSignin } from './usePostSignin';
import { useRouter } from 'next/navigation';
import toast from '@/utils/toast';

export const useSignInForm = () => {
  const { mutate: signIn } = usePostSignin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SigninRequest>();

  const onSubmit: SubmitHandler<SigninRequest> = (data) => {
    signIn(data, {
      onSuccess: () => {
        toast.success('로그인에 성공했습니다.');
        router.push('/social'); //TODO: useReferer  추가
      },
      onError: (error: Error) => {
        const errorData = JSON.parse(error.message);
        toast({
          type: 'error',
          title: '로그인에 실패했습니다.',
          message: errorData.message,
          duration: 5,
        });

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

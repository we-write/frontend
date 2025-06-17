'use client';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '@/api/auth/type';
import useCreateUser from '@/hooks/api/auth/useCreateUser';
import { APP_ROUTES } from '@/constants/appRoutes';

const useSignUpForm = () => {
  const router = useRouter();
  const { mutate: createUser } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm<SignUpFormData>();

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const signUpData = {
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName,
    };

    createUser(signUpData, {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다.');
        router.push(APP_ROUTES.signin);
      },
      onError: (error: Error) => {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
      },
    });
  };

  return { onSubmit, register, handleSubmit, isSubmitting, errors, getValues };
};

export default useSignUpForm;

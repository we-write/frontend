'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '@/api/auth/type';
import useCreateUser from '@/hooks/api/auth/useCreateUser';

const useSignUpForm = () => {
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

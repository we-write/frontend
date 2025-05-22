'use client';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';

import VisibilityIcon from '@/components/icons/VisibilityIcon';
import { usePostSignin } from '@/hooks/api/users/usePostSignin';
import { SignInFormData } from '@/types/user';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
const Page = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>();
  const { mutate: signIn } = usePostSignin();
  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    signIn(data, {
      onSuccess: () => {
        router.push('/social');
      },
      onError: (error: Error) => {
        if (error.message === '존재하지 않는 아이디입니다') {
          setError('email', {
            type: 'manual',
            message: error.message,
          });
        }
        if (error.message === '비밀번호가 아이디와 일치하지 않습니다') {
          setError('password', {
            type: 'manual',
            message: error.message,
          });
        }
      },
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100">
      <div className="flex h-[422px] w-lg flex-col gap-10 rounded-3xl bg-white px-14 py-6">
        <h1 className={`text-write-main text-center text-xl font-bold`}>
          로그인
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <InputForm
              label="아이디"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              register={{
                ...register('email', { required: '이메일을 입력해주세요.' }),
              }}
              helperText={errors.email?.message}
              hasError={!!errors.email}
            />
          </div>
          <div>
            <InputForm
              label="비밀번호"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              register={{
                ...register('password', {
                  required: '비밀번호를 입력해주세요.',
                }),
              }}
              hasError={!!errors.password}
              helperText={errors.password?.message}
              suffixIcon={
                <button
                  type="button"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  <VisibilityIcon isShowed={isShowPassword} />
                </button>
              }
              type={isShowPassword ? 'text' : 'password'}
            />
          </div>
          <Button
            role="button"
            type="submit"
            color="custom"
            disabled={isSubmitting}
            className="bg-write-gray-400 font-bold text-white"
          >
            로그인
          </Button>
          <div className="flex items-center justify-center gap-2">
            <span>WE WRITE가 처음이신가요?</span>
            <Link
              href="/auths/signup"
              className="text-write-main font-semibold underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

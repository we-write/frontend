'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/user';
import usePostSignup from '@/hooks/usePostSignup';
import { useRouter } from 'next/navigation';

//TODO: 프라머리 컬러 변경 필요
const PRIMARY_COLOR = '#008060';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm<FormData>();
  const { mutate: postSignup } = usePostSignup();
  const router = useRouter();
  const onSubmit = (data: FormData) => {
    const signUpData = {
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName,
    };

    postSignup(signUpData, {
      onSuccess: () => router.push('/'),
      onError: (error: Error) => {
        setError('email', {
          type: 'manual',
          message: error.message,
        });
      },
    });
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-md border-2 border-gray-300 bg-white p-4">
        <h1
          className={`text-center text-xl font-semibold text-[${PRIMARY_COLOR}]`}
        >
          회원가입
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              이름
            </label>
            <input
              type="text"
              placeholder="이름을 입력해주세요"
              className={`rounded-md bg-gray-100 p-2 ${
                errors.name ? 'border-2 border-red-500' : ''
              }`}
              {...register('name', {
                required: '이름을 입력해주세요',
              })}
            />
            {errors.name && (
              <small className="text-red-500">{errors.name.message}</small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              className={`rounded-md bg-gray-100 p-2 ${
                errors.email ? 'border-2 border-red-500' : ''
              }`}
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '이메일 형식이 올바르지 않습니다',
                },
              })}
            />
            {errors.email && (
              <small className="text-red-500">{errors.email.message}</small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>
            <div
              className={`relative rounded-md bg-gray-100 ${
                errors.password ? 'border-2 border-red-500' : ''
              }`}
            >
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                className="rounded-md border-none p-2 focus:outline-none"
                {...register('password', {
                  required: '비밀번호가 8자 이상이 되도록 해 주세요',
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    message: '비밀번호가 8자 이상이 되도록 해 주세요',
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '숨기기' : '보기'}
              </button>
            </div>

            {errors.password && (
              <small className="text-red-500">{errors.password.message}</small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordCheck" className="font-bold">
              비밀번호 확인
            </label>
            <div
              className={`relative rounded-md bg-gray-100 ${
                errors.passwordCheck ? 'border-2 border-red-500' : ''
              }`}
            >
              <input
                type={showPasswordCheck ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                className="rounded-md border-none p-2 focus:outline-none"
                {...register('passwordCheck', {
                  required: '비밀번호를 다시 한 번 입력해주세요',
                  validate: (value) => {
                    if (value !== getValues('password')) {
                      return '비밀번호가 일치하지 않습니다';
                    }
                  },
                })}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
              >
                {showPasswordCheck ? '숨기기' : '보기'}
              </button>
            </div>

            {errors.passwordCheck && (
              <small className="text-red-500">
                {errors.passwordCheck.message}
              </small>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="favorite" className="font-bold">
              좋아하는 작품
            </label>
            <input
              type="text"
              placeholder="(ex. 위대한 개츠비,원피스)"
              className={`rounded-md bg-gray-100 p-2 ${
                errors.companyName ? 'border-2 border-red-500' : ''
              }`}
              {...register('companyName', {
                required: '좋아하는 작품을 1개 이상 입력해 주세요.',
              })}
            />
            {errors.companyName && (
              <small className="text-red-500">
                {errors.companyName.message}
              </small>
            )}
          </div>

          <button
            role="button"
            type="submit"
            className="mt-4 rounded-md bg-[#9CA3AF] p-2 text-white"
            disabled={isSubmitting}
          >
            확인
          </button>
        </form>
        <div className="flex items-center justify-center gap-2">
          <span>이미 회원이신가요?</span>
          <Link
            role="navigation"
            href="/auths/signin"
            className={`font-semibold text-[${PRIMARY_COLOR}] underline`}
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;

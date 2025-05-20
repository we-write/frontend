'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/user';
import usePostSignup from '@/hooks/api/users/usePostSignup';
import { useRouter } from 'next/navigation';

import InputForm from '@/components/common/Form/InputForm';
import { Visibility, VisibilityOff } from '@/components/icons/Visibility';
import Input, { HelperText } from '@/components/common/Input/Input';

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

  const { mutate: postSignup } = usePostSignup(); //회원 가입 요청 hooks 호출

  const router = useRouter();

  // 회원가입 제출 함수
  const onSubmit = (data: FormData) => {
    const signUpData = {
      //form 데이터 중 비밀번호 확인 제외 데이터
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName,
    };

    postSignup(signUpData, {
      onSuccess: () => router.push('/'),
      onError: (error: Error) => {
        // 이메일 중복확인 오류 처리
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
        <h1 className={`text-write-main text-center text-xl font-bold`}>
          회원가입
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <InputForm
              name="name"
              hasError={!!errors.name}
              size={46}
              label="이름"
              placeholder="이름을 입력해주세요"
              register={{
                ...register('name', {
                  required: '이름을 입력해주세요',
                }),
              }}
            />
            <HelperText
              helperText={errors.name?.message}
              hasError={!!errors.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputForm
              name="email"
              size={46} // 입력 필드 너비 지정
              label="이메일"
              placeholder="이메일을 입력해주세요"
              hasError={!!errors.email}
              register={{
                ...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '이메일 형식이 올바르지 않습니다',
                  },
                }),
              }}
            />

            <HelperText
              helperText={errors.email?.message}
              hasError={!!errors.email}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>
            <div className="flex flex-col gap-2">
              <Input
                name="password"
                suffixIcon={
                  showPassword ? (
                    <button onClick={() => setShowPassword(!showPassword)}>
                      <Visibility />
                    </button>
                  ) : (
                    <button onClick={() => setShowPassword(!showPassword)}>
                      <VisibilityOff />
                    </button>
                  )
                }
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                register={{
                  ...register('password', {
                    required: '비밀번호가 8자 이상이 되도록 해 주세요',
                    pattern: {
                      value: /^.{8,}$/,
                      message: '비밀번호가 8자 이상이 되도록 해 주세요',
                    },
                  }),
                }}
                hasError={!!errors.password}
              />
            </div>

            <HelperText
              helperText={errors.password?.message}
              hasError={!!errors.password}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="passwordCheck" className="font-bold">
              비밀번호 확인
            </label>
            <div className="flex flex-col gap-2">
              <Input
                name="passwordCheck"
                hasError={!!errors.passwordCheck}
                suffixIcon={
                  showPasswordCheck ? (
                    <button
                      onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    >
                      <Visibility />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                    >
                      <VisibilityOff />
                    </button>
                  )
                }
                type={showPasswordCheck ? 'text' : 'password'}
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                register={{
                  ...register('passwordCheck', {
                    required: '비밀번호를 다시 한 번 입력해주세요',
                    validate: (value) => {
                      if (value !== getValues('password')) {
                        return '비밀번호가 일치하지 않습니다';
                      }
                    },
                  }),
                }}
              />
            </div>
          </div>
          <HelperText
            helperText={errors.passwordCheck?.message}
            hasError={!!errors.passwordCheck}
          />

          <div className="flex flex-col gap-2">
            <InputForm
              name="companyName"
              label="좋아하는 작품"
              placeholder="(ex. 위대한 개츠비,원피스)"
              hasError={!!errors.companyName}
              register={{
                ...register('companyName', {
                  required: '좋아하는 작품을 1개 이상 입력해 주세요.',
                }),
              }}
            />
            <HelperText
              helperText={errors.companyName?.message}
              hasError={!!errors.companyName}
            />
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
            className="text-write-main font-semibold underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Page;

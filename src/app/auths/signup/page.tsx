'use client';

import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SignUpFormData } from '@/api/auth/type';
import useCreateUser from '@/hooks/api/auth/useCreateUser';
import { useRouter } from 'next/navigation';

import InputForm from '@/components/common/Form/InputForm';
import { VisibilityOff, VisibilityOn } from '@public/assets/icons';
import Button from '@/components/common/Button/Button';
import useBoolean from '@/hooks/useBoolean';

const Page = () => {
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean();
  const { value: showPasswordCheck, toggle: toggleShowPasswordCheck } =
    useBoolean();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    getValues,
    setError,
  } = useForm<SignUpFormData>();

  const { mutate: createUser } = useCreateUser(); //회원 가입 요청 hooks 호출

  const router = useRouter();

  // 회원가입 제출 함수
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const signUpData = {
      //form 데이터 중 비밀번호 확인 제외 데이터
      name: data.name,
      email: data.email,
      password: data.password,
      companyName: data.companyName,
    };

    createUser(signUpData, {
      onSuccess: () => router.push('/social'),
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
    <div className="mt-6 flex h-screen w-full items-center justify-center">
      <div className="flex min-h-[680px] w-[343px] flex-col gap-10 rounded-3xl bg-white px-4 py-6 md:w-[608px] md:px-16 lg:min-h-[710px] lg:w-[508px]">
        <h1 className={`text-write-main text-center text-xl font-bold`}>
          회원가입
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <InputForm
            name="name"
            size={46}
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            register={{
              ...register('name', {
                required: '닉네임을 입력해주세요',
              }),
            }}
            hasError={!!errors.name}
            helperText={errors.name?.message}
          />

          <InputForm
            name="email"
            size={46} // 입력 필드 너비 지정
            label="아이디"
            placeholder="이메일을 입력해주세요"
            hasError={!!errors.email}
            helperText={errors.email?.message}
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

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <InputForm
                label="비밀번호"
                name="password"
                suffixIcon={
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <VisibilityOn
                        aria-label="show password"
                        fill="currentColor"
                      />
                    ) : (
                      <VisibilityOff
                        aria-label="hide password"
                        fill="currentColor"
                      />
                    )}
                  </button>
                }
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력해주세요"
                register={{
                  ...register('password', {
                    required: '비밀번호가 8자 이상이 되도록 해 주세요',
                    pattern: {
                      value: /^[^\s]{8,}$/,
                      message: '비밀번호가 8자 이상이 되도록 해 주세요',
                    },
                  }),
                }}
                hasError={!!errors.password}
                helperText={errors.password?.message}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <InputForm
                label="비밀번호 확인"
                name="passwordCheck"
                suffixIcon={
                  <button
                    type="button"
                    className="flex items-center justify-center"
                    onClick={toggleShowPasswordCheck}
                  >
                    {showPasswordCheck ? (
                      <VisibilityOn
                        aria-label="show password"
                        fill="currentColor"
                      />
                    ) : (
                      <VisibilityOff
                        aria-label="hide password"
                        fill="currentColor"
                      />
                    )}
                  </button>
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
                hasError={!!errors.passwordCheck}
                helperText={errors.passwordCheck?.message}
              />
            </div>
          </div>

          <InputForm
            name="companyName"
            label="좋아하는 작품"
            placeholder="(ex. 위대한 개츠비,원피스)"
            register={{
              ...register('companyName', {
                required: '좋아하는 작품을 1개 이상 입력해 주세요.',
              }),
            }}
            hasError={!!errors.companyName}
            helperText={errors.companyName?.message}
          />

          <Button
            role="button"
            type="submit"
            color="custom"
            disabled={
              isSubmitting ||
              !!errors.email ||
              !!errors.password ||
              !!errors.passwordCheck ||
              !!errors.companyName
            }
            className={`${
              errors.email ||
              errors.password ||
              errors.passwordCheck ||
              errors.companyName
                ? 'bg-gray-400'
                : 'bg-write-main'
            } font-bold text-white`}
          >
            회원가입
          </Button>
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
        </form>
      </div>
    </div>
  );
};
export default Page;

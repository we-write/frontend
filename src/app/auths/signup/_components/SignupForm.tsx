'use client';

import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';

import useBoolean from '@/hooks/useBoolean';
import useSignUpForm from '@/hooks/api/auth/useSignUpForm';

import { Eye, EyeOff } from 'lucide-react';
import { signUpValidate } from '@/utils/validators/auth';

const SignupForm = () => {
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean();
  const { value: showPasswordCheck, toggle: toggleShowPasswordCheck } =
    useBoolean();

  const { onSubmit, register, handleSubmit, isSubmitting, errors, getValues } =
    useSignUpForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputForm
        name="name"
        size={46}
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        register={{
          ...register('name', {
            validate: (value) => signUpValidate({ value, name: 'name' }),
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
            validate: (value) => signUpValidate({ value, name: 'email' }),
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
                name="toggleShowPassword"
                role="button"
                aria-label="비밀번호 토글 버튼"
                type="button"
                className="flex items-center justify-center"
                onClick={toggleShowPassword}
              >
                {showPassword ? <Eye aria-hidden /> : <EyeOff aria-hidden />}
              </button>
            }
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호를 입력해주세요"
            register={{
              ...register('password', {
                validate: (value) =>
                  signUpValidate({ value, name: 'password' }),
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
                role="button"
                name="toggle-show-password-check"
                aria-label="비밀번호 확인 토글 버튼"
                type="button"
                className="flex items-center justify-center"
                onClick={toggleShowPasswordCheck}
              >
                {showPasswordCheck ? (
                  <Eye aria-hidden />
                ) : (
                  <EyeOff aria-hidden />
                )}
              </button>
            }
            type={showPasswordCheck ? 'text' : 'password'}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            register={{
              ...register('passwordCheck', {
                validate: (value) =>
                  signUpValidate({
                    value,
                    name: 'passwordCheck',
                    password: getValues('password'),
                  }),
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
            validate: (value) => signUpValidate({ value, name: 'companyName' }),
          }),
        }}
        hasError={!!errors.companyName}
        helperText={errors.companyName?.message}
      />

      <Button
        role="button"
        type="submit"
        color="custom"
        disabled={isSubmitting || Object.keys(errors).length > 0}
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
    </form>
  );
};

export default SignupForm;

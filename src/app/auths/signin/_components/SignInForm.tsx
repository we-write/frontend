'use client';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';
import useBoolean from '@/hooks/useBoolean';
import { useSignInForm } from '@/hooks/api/auth/useSignInForm';

import { signInValidate } from '@/utils/validators/auth';
import { Eye, EyeOff } from 'lucide-react';

const SignInForm = () => {
  const { value: isShowPassword, toggle: toggleIsShowPassword } = useBoolean();

  const { onSubmit, register, handleSubmit, isSubmitting, errors } =
    useSignInForm();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        label="아이디"
        name="email"
        placeholder="이메일을 입력해주세요."
        register={register('email', {
          validate: (value) => signInValidate({ value, name: 'email' }),
        })}
        type="email"
        hasError={!!errors.email}
        helperText={errors.email?.message}
      />

      <InputForm
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        register={register('password', {
          validate: (value) => signInValidate({ value, name: 'password' }),
        })}
        type={isShowPassword ? 'text' : 'password'}
        hasError={!!errors.password}
        helperText={errors.password?.message}
        suffixIcon={
          <button
            type="button"
            aria-label="비밀번호 토글 버튼"
            className="flex items-center justify-center"
            onClick={toggleIsShowPassword}
          >
            {isShowPassword ? (
              <Eye aria-hidden="true" />
            ) : (
              <EyeOff aria-hidden="true" />
            )}
          </button>
        }
      />

      <Button
        role="button"
        type="submit"
        color="custom"
        disabled={isSubmitting || !!errors.email || !!errors.password}
        className={`${errors.email || errors.password ? 'bg-gray-400' : 'bg-write-main'} font-bold text-white`}
      >
        로그인
      </Button>
    </form>
  );
};

export default SignInForm;

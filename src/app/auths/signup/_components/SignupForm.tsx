'use client';
import { SignUpFormData } from '@/api/auth/type';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';
import { useForm } from 'react-hook-form';
import {
  emailValidation,
  passwordValidation,
  passwordCheckValidation,
  favoriteValidation,
} from '@/utils/validators/auth';
import { VisibilityOff, VisibilityOn } from '@public/assets/icons';
import useBoolean from '@/hooks/useBoolean';
import useSignUpForm from '@/hooks/api/auth/useSignUpForm';

const SignupForm = () => {
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

  const { onSubmit } = useSignUpForm({ setError });

  return (
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
        label="이메일"
        placeholder="이메일을 입력해주세요"
        hasError={!!errors.email}
        helperText={errors.email?.message}
        register={{
          ...register('email', {
            validate: (value) => emailValidation(value),
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
                validate: (value) => passwordValidation(value),
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
                validate: (value) =>
                  passwordCheckValidation(value, getValues('password')),
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
            validate: (value) => favoriteValidation(value),
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

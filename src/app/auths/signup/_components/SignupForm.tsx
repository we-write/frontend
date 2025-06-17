'use client';

import Button from '@/components/common/Button/Button';

import { signUpValidate } from '@/utils/validators/auth';

import useBoolean from '@/hooks/useBoolean';
import useSignUpForm from '@/hooks/api/auth/useSignUpForm';
import FormField from '@/app/auths/_components/FormField';
import PasswordFormField from '@/app/auths/_components/PasswordFormField';

const SignupForm = () => {
  const { value: showPassword, toggle: toggleShowPassword } = useBoolean();
  const { value: showPasswordCheck, toggle: toggleShowPasswordCheck } =
    useBoolean();

  const { onSubmit, register, handleSubmit, isSubmitting, errors, getValues } =
    useSignUpForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FormField<SignUpFormData>
        name="name"
        label="닉네임"
        placeholder="닉네임을 입력해주세요"
        register={register}
        validate={signUpValidate}
        errors={errors}
      />

      <FormField
        name="email"
        label="이메일"
        placeholder="이메일을 입력해주세요"
        register={register}
        validate={signUpValidate}
        errors={errors}
      />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PasswordFormField
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            register={register}
            validate={singUpValidate}
            errors={errors}
            isShowPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <PasswordFormField
            name="passwordCheck"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            register={register}
            validate={singUpValidate}
            password={getValues('password')}
            errors={errors}
            isShowPassword={showPasswordCheck}
            toggleShowPassword={toggleShowPasswordCheck}
          />
        </div>
      </div>

      <FormField
        name="companyName"
        label="좋아하는 작품"
        placeholder="(ex. 위대한 개츠비,원피스)"
        register={register}
        validate={signUpValidate}
        errors={errors}
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

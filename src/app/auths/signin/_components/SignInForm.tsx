'use client';
import Button from '@/components/common/Button/Button';
import PasswordFormField from '../../_components/PasswordFormField';
import useBoolean from '@/hooks/useBoolean';
import { signInValidate } from '@/utils/validators/auth';
import FormField from '../../_components/FormField';
import { useSignInForm } from '@/hooks/api/auth/useSignInForm';

const SignInForm = () => {
  const { value: isShowPassword, toggle: toggleIsShowPassword } = useBoolean();

  const { onSubmit, register, handleSubmit, isSubmitting, errors } =
    useSignInForm();

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="아이디"
        name="email"
        placeholder="이메일을 입력해주세요."
        register={register}
        validate={signInValidate}
        errors={errors}
      />

      <PasswordFormField
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        validate={signInValidate}
        register={register}
        errors={errors}
        isShowPassword={isShowPassword}
        toggleShowPassword={toggleIsShowPassword}
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

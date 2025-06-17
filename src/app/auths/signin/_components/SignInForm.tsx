'use client';
import { SignInFormData } from '@/api/auth/type';
import Button from '@/components/common/Button/Button';
import { useForm } from 'react-hook-form';
import PasswordFormField from '../../_components/PasswordFormField';
import useBoolean from '@/hooks/useBoolean';
import { signInValidate } from '@/utils/validators/auth';
import FormField from '../../_components/FormField';
import { useSignInForm } from '@/hooks/api/auth/useSignInForm';

const SignInForm = () => {
  const { value: isShowPassword, toggle: toggleIsShowPassword } = useBoolean();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<SignInFormData>();
  const { onSubmit } = useSignInForm({ setError });
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <FormField
          label="아이디"
          name="email"
          placeholder="이메일을 입력해주세요."
          register={register}
          validate={signInValidate}
          errors={errors}
        />
      </div>
      <div>
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
      </div>
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

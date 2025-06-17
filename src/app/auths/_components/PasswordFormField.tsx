import InputForm from '@/components/common/Form/InputForm';
import { PasswordFormFieldProps } from './type';
import { Eye, EyeOff } from 'lucide-react';
import { SignInFormData, SignUpFormData } from '@/api/auth/type';
import { Path } from 'react-hook-form';

const PasswordFormField = <T extends SignUpFormData | SignInFormData>({
  name,
  label,
  placeholder,
  register,
  errors,
  validate,
  isShowPassword,
  toggleShowPassword,
  password = '',
}: PasswordFormFieldProps<T>) => {
  return (
    <InputForm
      type={isShowPassword ? 'text' : 'password'}
      name={name as string}
      size={46} // 입력 필드 너비 지정
      label={label}
      placeholder={placeholder}
      hasError={!!errors[name as keyof typeof errors]}
      helperText={errors[name as keyof typeof errors]?.message as string}
      register={{
        ...register(name as Path<T>, {
          validate: (value) => validate({ value, name, password }),
        }),
      }}
      suffixIcon={
        <button
          aria-label={isShowPassword ? '비밀번호 보기' : '비밀번호 숨기기'}
          aria-pressed={isShowPassword}
          type="button"
          className="flex-center"
          onClick={toggleShowPassword}
        >
          {isShowPassword ? <Eye /> : <EyeOff />}
        </button>
      }
    />
  );
};
export default PasswordFormField;

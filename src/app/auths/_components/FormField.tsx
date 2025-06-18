import InputForm from '@/components/common/Form/InputForm';

import { FormFieldProps } from './type';
import { SigninRequest, SignUpRequest } from '@/api/auth/type';
import { FieldErrors, Path } from 'react-hook-form';

const FormField = <T extends SignUpRequest | SigninRequest>({
  name,
  label,
  placeholder,
  register,
  errors,
  validate,
}: FormFieldProps<T>) => {
  return (
    <InputForm
      name={name as Path<T>}
      size={46} // 입력 필드 너비 지정
      label={label}
      placeholder={placeholder}
      hasError={!!errors[name as keyof FieldErrors<T>]}
      helperText={errors[name as keyof FieldErrors<T>]?.message as string}
      register={{
        ...register(name as Path<T>, {
          validate: (value) => validate({ value, name }),
        }),
      }}
    />
  );
};
export default FormField;

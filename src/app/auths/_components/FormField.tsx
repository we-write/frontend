import InputForm from '@/components/common/Form/InputForm';

import { FormFieldProps } from './type';

const FormField = ({
  name,
  label,
  placeholder,
  register,
  errors,
  validate,
}: FormFieldProps) => {
  return (
    <InputForm
      name={name}
      size={46} // 입력 필드 너비 지정
      label={label}
      placeholder={placeholder}
      hasError={!!errors[name]}
      helperText={errors[name]?.message as string}
      register={{
        ...register(name, {
          validate: (value) => validate({ value, name }),
        }),
      }}
    />
  );
};
export default FormField;

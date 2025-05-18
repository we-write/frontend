import { ReactNode } from 'react';
import Input, { HelperText, InputProps } from '../Input/Input';

interface InputFormProps extends InputProps {
  label?: ReactNode;
  helperText?: string;
  hasError?: boolean;
}

const InputForm = ({
  name,
  label,
  helperText,
  hasError = false,
  ...rest
}: InputFormProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-semibold">
          {label}
        </label>
      )}
      <Input name={name} hasError={hasError} {...rest} />

      {helperText && hasError && (
        <HelperText helperText={helperText} hasError={hasError} />
      )}
    </div>
  );
};

export default InputForm;

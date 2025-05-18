import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const ERROR_TEXT_COLOR = 'text-red-600';
const SUCCESS_TEXT_COLOR = 'text-green-600';
const ERROR_BORDER_COLOR = 'border-red-600';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError?: boolean;
  isSuccess?: boolean;
  register?: UseFormRegisterReturn;
  SuffixIcon?: ReactNode;
}

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  hasError = false,
  register,
  SuffixIcon = null,
  ...rest
}: InputProps) => {
  const inputStyle = {
    default: 'relative h-11 w-full rounded-xl bg-gray-50 px-4 py-2.5',
    suffixIcon: 'absolute top-1/2 right-4 -translate-y-1/2',
    hasError: `border ${ERROR_BORDER_COLOR}`,
  };

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`${inputStyle.default} ${SuffixIcon ? 'pr-10' : ''} ${hasError ? inputStyle.hasError : ''}`}
        {...(register ?? { name })}
        {...rest}
      />
      {SuffixIcon && <div className={inputStyle.suffixIcon}>{SuffixIcon}</div>}
    </div>
  );
};

export default Input;

export interface HelperTextProps {
  helperText: ReactNode;
  hasError?: boolean;
  isSuccess?: boolean;
}

export const HelperText = ({
  helperText,
  hasError,
  isSuccess,
}: HelperTextProps) => {
  const helperTextStyle = {
    default: 'mt-2 text-sm text-gray-500',
    errorText: ERROR_TEXT_COLOR,
    successText: SUCCESS_TEXT_COLOR,
  };

  const className = [
    helperTextStyle.default,
    hasError && helperTextStyle.errorText,
    isSuccess && helperTextStyle.successText,
  ]
    .filter(Boolean)
    .join(' ');

  return <p className={className}>{helperText}</p>;
};

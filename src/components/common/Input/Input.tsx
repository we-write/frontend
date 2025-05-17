import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: HTMLInputTypeAttribute;
  label?: ReactNode;
  placeholder?: string;
  hasError?: boolean;
  helperText?: ReactNode;
  register?: UseFormRegisterReturn;
  SuffixIcon?: ReactNode;
}

const Input = ({
  name,
  type = 'text',
  label,
  placeholder = '',
  hasError = false,
  helperText,
  register,
  SuffixIcon = null,
  ...rest
}: InputProps) => {
  const inputStyle = {
    input: 'relative h-11 w-full rounded-xl bg-gray-50 px-4 py-2.5',
    suffixIcon: 'absolute top-1/2 right-4 -translate-y-1/2',
    hasError: 'border border-red-600',
  };

  const helperTextStyle = {
    default: 'mt-2 text-sm',
    errorText: 'text-red-600',
    successText: 'text-green-600',
  };

  return (
    <label htmlFor={name}>
      {label && <p className="mb-2 text-sm font-semibold">{label}</p>}

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`${inputStyle.input} ${
            SuffixIcon ? 'pr-10' : ''
          } ${hasError ? inputStyle.hasError : ''}`}
          {...register}
          {...rest}
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          {SuffixIcon}
        </div>
      </div>

      {helperText && (
        <p
          className={`${helperTextStyle.default} ${hasError ? helperTextStyle.errorText : helperTextStyle.successText}`}
        >
          {helperText}
        </p>
      )}
    </label>
  );
};

export default Input;

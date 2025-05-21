import { HelperTextProps, InputProps } from './type';

const Input = ({
  name,
  type = 'text',
  placeholder = '',
  hasError = false,
  register,
  suffixIcon = null,
  ...rest
}: InputProps) => {
  const inputStyle = {
    default: 'relative h-11 w-full rounded-xl bg-gray-50 px-4 py-2.5',
    suffixIcon: 'absolute top-1/2 right-4 -translate-y-1/2',
    hasError: 'border border-write-error border-2',
  };

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={` ${inputStyle.default} ${suffixIcon ? 'pr-10' : ''} ${hasError ? inputStyle.hasError : ''}`}
        {...(register || {})}
        {...rest}
      />
      {suffixIcon && <div className={inputStyle.suffixIcon}>{suffixIcon}</div>}
    </div>
  );
};

export default Input;

export const HelperText = ({
  helperText,
  hasError,
  isSuccess,
}: HelperTextProps) => {
  const helperTextStyle = {
    default: 'mt-2 text-sm text-gray-500',
    errorText: 'text-write-error',
    successText: 'text-write-success',
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

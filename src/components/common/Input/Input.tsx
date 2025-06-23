import { forwardRef } from 'react';
import { HelperTextProps, InputProps } from './type';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      type = 'text',
      placeholder = '',
      hasError = false,
      register,
      suffixIcon = null,
      className = '',
      ...rest
    },
    ref
  ) => {
    const inputStyle = {
      default: 'relative h-11 w-full rounded-xl bg-gray-50 px-4 py-2.5',
      suffixIcon: 'absolute top-1/2 right-4 -translate-y-1/2',
      hasError: 'border border-write-error',
    };

    /**
     * react-hook-form의 register 함수와 컴포넌트 외부에서 전달받은 ref를 하나로 병합하기 위한 콜백 ref 함수입니다.
     *
     * - element: 현재 참조하고 있는 DOM 요소 (input 등)
     *
     * 사용 목적:
     * - react-hook-form의 내부 register에서 사용하는 ref를 연결하고,
     * - 동시에 외부에서 전달된 ref (ex. useRef or forwardRef)를 함께 연결하여
     *   DOM에 직접 접근하거나 다른 동작을 병행할 수 있도록 합니다.
     */
    const combinedRef = (element: HTMLInputElement | null) => {
      // react-hook-form 내부에서 관리하는 ref 연결
      if (register?.ref) {
        register.ref(element);
      }

      // 외부에서 전달된 ref가 콜백 형태일 경우 실행
      if (typeof ref === 'function') {
        ref(element);
      }
      // 외부에서 전달된 ref가 useRef 형태일 경우 current에 직접 할당
      else if (ref && typeof ref === 'object' && 'current' in ref) {
        ref.current = element;
      }
    };

    return (
      <div className="relative">
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`${inputStyle.default} ${suffixIcon ? 'pr-10' : ''} ${hasError ? inputStyle.hasError : ''} ${className}`}
          ref={combinedRef}
          {...(register
            ? {
                name: register.name,
                onChange: register.onChange,
                onBlur: register.onBlur,
              }
            : {})}
          {...rest}
        />
        {suffixIcon && (
          <div className={inputStyle.suffixIcon}>{suffixIcon}</div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
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

  return (
    <p role="alert" className={className}>
      {helperText}
    </p>
  );
};

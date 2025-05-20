import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError?: boolean;
  isSuccess?: boolean;
  register?: UseFormRegisterReturn;
  suffixIcon?: ReactNode;
}

export interface HelperTextProps {
  helperText: ReactNode;
  hasError?: boolean;
  isSuccess?: boolean;
}

export type LabelPosition = 'left' | 'right';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: ReactNode;
  labelPosition?: LabelPosition;
  className?: string;
}

import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  hasError?: boolean;
  isSuccess?: boolean;
  register?: UseFormRegisterReturn;
  SuffixIcon?: ReactNode;
}

export interface HelperTextProps {
  helperText: ReactNode;
  hasError?: boolean;
  isSuccess?: boolean;
}

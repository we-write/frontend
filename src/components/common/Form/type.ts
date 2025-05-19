import { ReactNode } from 'react';
import { InputProps } from '../Input/type';

export interface InputFormProps extends InputProps {
  label?: ReactNode;
  helperText?: string;
  hasError?: boolean;
}

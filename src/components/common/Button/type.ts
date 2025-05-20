import { ColorType, ColorVariant } from '@/utils/getColorSystem';
import { ButtonHTMLAttributes } from 'react';

export const BUTTON_SIZE = {
  custom: '',
  full: 'w-full h-11',
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ColorType;
  variant?: ColorVariant;
  isDisabled?: boolean;
  isLoading?: boolean;
}

import { SignInFormData, SignUpFormData } from '@/api/auth/type';
import { ValidateProps } from '@/utils/validators/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface FormFieldProps<T extends SignUpFormData | SignInFormData> {
  name: keyof T;
  label: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validate: (props: ValidateProps<T>) => string | true;
}

export interface PasswordFormFieldProps<
  T extends SignUpFormData | SignInFormData,
> extends FormFieldProps<T> {
  isShowPassword: boolean;
  toggleShowPassword: () => void;
  password?: string;
}

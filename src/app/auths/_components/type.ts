import { SignUpFormData } from '@/api/auth/type';
import { SignUpValidateProps } from '@/utils/validators/type';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface FormFieldProps {
  name: keyof SignUpFormData;
  label: string;
  placeholder: string;
  register: UseFormRegister<SignUpFormData>;
  errors: FieldErrors<SignUpFormData>;
  validate: (props: SignUpValidateProps) => string | true;
}

export interface PasswordFormFieldProps extends FormFieldProps {
  isShowPassword: boolean;
  toggleShowPassword: () => void;
  password?: string;
}

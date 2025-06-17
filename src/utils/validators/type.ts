import { SignUpFormData, SignInFormData } from '@/api/auth/type';

export interface ValidateProps<T extends SignUpFormData | SignInFormData> {
  value: string;
  name: keyof T;
  password?: string;
}

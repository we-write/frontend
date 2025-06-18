import { SignUpFormData, SigninRequest } from '@/api/auth/type';

export interface ValidateProps<T extends SignUpFormData | SigninRequest> {
  value: string;
  name: keyof T;
  password?: string;
}

import { SignUpFormData, SigninRequest } from '@/api/auth/type';

export interface AuthValidateProps<T extends SignUpFormData | SigninRequest> {
  value: string;
  name: keyof T;
  password?: string;
}

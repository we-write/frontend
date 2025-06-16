import { SignUpFormData } from '@/api/auth/type';

export interface SignUpValidateProps {
  value: string;
  name: keyof SignUpFormData;
  password?: string;
}

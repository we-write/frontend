import { UserResponse } from '@/types/user';

export interface LoginSectionProps {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}

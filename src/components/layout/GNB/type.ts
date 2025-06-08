import { UserResponse } from '@/types/user';

export interface LoginSectionProps {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}
export interface UserDropdownProps {
  onSignOut: () => void;
  onClose: () => void;
}

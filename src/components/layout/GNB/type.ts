import { UserResponse } from '@/types/user';

export interface MenuGroupsProps {
  label: string;
  href: string;
}

export interface LoginSectionProps {
  isSignIn: boolean;
}

export interface UserDropdownProps {
  onSignOut: () => void;
  onClose: () => void;
}
export interface LoginSectionProps {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}

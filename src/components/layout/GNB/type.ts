import { MyInfoResponse } from '@/api/auth/type';

export interface LoginSectionProps {
  isSignIn: boolean;
  myInfo: MyInfoResponse | null;
}
export interface UserDropdownProps {
  onSignOut: () => void;
  onClose: () => void;
}

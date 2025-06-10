import { MyInfoResponse } from '@/types/user';

export interface LoginSectionProps {
  isSignIn: boolean;
  myInfo: MyInfoResponse | null;
}
export interface UserDropdownProps {
  onSignOut: () => void;
  onClose: () => void;
}

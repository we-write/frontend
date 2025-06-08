import { UserResponse } from '@/types/user';

interface MenuItemProps {
  label: string;
  href: string;
}

export interface LogoButtonProps {
  onClick?: () => void;
}

export interface LoginSectionProps {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  isSignIn: boolean;
  userInfo: UserResponse | null;
  menuItems: MenuItemProps[];
}

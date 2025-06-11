import { MyInfoResponse } from '@/api/auth/type';

interface MenuItemProps {
  label: string;
  href: string;
}

export interface LogoButtonProps {
  onClick?: () => void;
}

export interface LoginSectionProps {
  isSignIn: boolean;
  myInfo: MyInfoResponse | null;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  menuItems: MenuItemProps[];
}

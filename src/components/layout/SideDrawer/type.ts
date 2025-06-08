import { UserResponse } from '@/types/user';

interface MenuItemProps {
  label: string;
  href: string;
}

export interface LoginSectionProps {
  isSignIn: boolean;
  userInfo: UserResponse | null;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  isSignIn: boolean;
  menuItems: MenuItemProps[];
  signInImageSrc: string;
}

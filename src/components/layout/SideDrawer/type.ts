import { UserResponse } from '@/types/user';

interface MenuItemProps {
  label: string;
  href: string;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  isSignIn: boolean;
  userInfo: UserResponse | null;
  menuItems: MenuItemProps[];
}

interface MenuItemProps {
  label: string;
  href: string;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  isSignIn: boolean;
  menuItems: MenuItemProps[];
  signInImageSrc: string;
}

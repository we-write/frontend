interface MenuItemProps {
  label: string;
  href: string;
}

export interface LogoButtonProps {
  onClick?: () => void;
}

export interface SideDrawerProps {
  isOpen: boolean;
  closeDrawer: () => void;
  menuItems: MenuItemProps[];
}

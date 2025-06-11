import { MouseEventHandler, ReactNode } from 'react';

export interface DropdownProps {
  trigger?: ReactNode;
  isOpen: boolean;
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface DropdownContentProps {
  contentItem: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export interface DropdownContainerProps {
  className?: string;
  children: ReactNode;
}

import { MouseEventHandler, ReactNode } from 'react';

export interface DropdownProps {
  trigger?: ReactNode;
  isOpen: boolean;
  children: ReactNode;
  className?: string;
}

export interface DropdownContentProps {
  contentItem: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  className?: string;
}

export interface DropdownContainerProps {
  className?: string;
  children: ReactNode;
}

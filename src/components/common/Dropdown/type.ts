import { MouseEventHandler, ReactNode } from 'react';

export interface DropdownProps {
  trigger?: React.ReactNode;
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface DropdownContentProps {
  contentItem: ReactNode;
  onClick?: MouseEventHandler<HTMLLIElement>;
  className?: string;
}

export interface DropdownContainerProps {
  className?: string;
  children: React.ReactNode;
}

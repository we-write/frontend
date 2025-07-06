import { MouseEventHandler, ReactNode, HTMLAttributes } from 'react';

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
}

export type DropdownContainerProps = HTMLAttributes<HTMLUListElement> & {
  children: ReactNode;
};

import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  noBackdrop?: boolean;
  closeButtonDark?: boolean;
  noCloseButton?: boolean;
  fullScreen?: boolean;
  backdropNoScroll?: boolean;
  children: ReactNode;
  className?: string;
}
export interface CloseButtonProps {
  color?: 'light' | 'dark';
  onClick: () => void;
}

export interface ModalHeaderProps {
  start?: boolean;
  center?: boolean;
  children: string;
  className?: string;
}
export interface ModalContentProps {
  children: ReactNode;
  className?: string;
  fullScreen?: boolean;
  group?: boolean;
}
export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

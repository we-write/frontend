export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  noBackdrop?: boolean;
  noCloseButton?: boolean;
  fullScreen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface ModalHeaderProps {
  start?: boolean;
  center?: boolean;
  children: React.ReactNode;
  className?: string;
}
export interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
  fullScreen?: boolean;
}
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

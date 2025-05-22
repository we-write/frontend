import {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
} from './type';
import React from 'react';

export const Modal = ({
  isOpen,
  onClose,
  noBackdrop,
  noCloseButton,
  fullScreen,
  children,
  className,
}: ModalProps) => {
  if (!isOpen) return null;
  const backdropStyle =
    'fixed inset-0 z-50 flex items-center justify-center visible opacity-100"';
  const backdropColor = noBackdrop ? 'bg-transparent' : 'bg-black/50';
  const modalStyle = 'min-w-75 w-[450px] p-6 bg-white shadow-xl relative';
  const fullScreenStyle = fullScreen
    ? 'flex h-screen w-screen flex-col rounded-none'
    : 'rounded-xl';
  return (
    <div className={`${backdropStyle} ${backdropColor}`}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${modalStyle} ${fullScreenStyle} ${className}`}
      >
        {noCloseButton ? null : <CloseButton onClick={onClose} />}
        {children}
      </div>
    </div>
  );
};

export const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const closeButtonStyle = 'w-6 h-6 flex-center text-xl text-gray-500';
  return (
    <div className="absolute top-6 right-6">
      <button type="button" onClick={onClick} className={`${closeButtonStyle}`}>
        ⨉
      </button>
    </div>
  );
};

export const ModalHeader = ({
  start,
  center,
  children,
  className,
}: ModalHeaderProps) => {
  const modalHeaderStyle =
    'text-gray-900 text-lg font-semibold flex w-18/19 truncate overflow-x-auto pl-6';
  const align = start ? 'justify-start' : center ? 'justify-center' : null;
  return (
    <div className={`${modalHeaderStyle} ${align} ${className}`}>
      {children}
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
  fullScreen,
}: ModalContentProps) => {
  const baseStyle =
    'text-gray-800 text-base font-medium max-h-120 overflow-y-auto';
  const fullScreenStyle = fullScreen
    ? 'flex-1 flex items-center justify-center flex-col max-h-175 my-auto'
    : 'flex-center flex-col mt-6 mb-6';
  return (
    <div className={`${baseStyle} ${fullScreenStyle} ${className}`}>
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  const modalFooterStyle = 'text-base text-gray-800 font-semibold flex gap-2';
  const childrenCount = React.Children.count(children);
  const alignment =
    childrenCount > 1 ? 'justify-center' : 'justify-end md:justify-center';
  return (
    <div className={`${modalFooterStyle} ${alignment} ${className} mt-auto`}>
      {children}
    </div>
  );
};

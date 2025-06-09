import {
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalFooterProps,
  CloseButtonProps,
} from './type';
import React from 'react';

export const Modal = ({
  isOpen,
  onClose,
  noBackdrop,
  closeButtonDark,
  noCloseButton,
  fullScreen,
  children,
  className,
}: ModalProps) => {
  if (isOpen) document.body.style.overflow = 'hidden';
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
        {!noCloseButton && (
          <CloseButton
            color={closeButtonDark ? 'dark' : 'light'}
            onClick={onClose}
          />
        )}
        {children}
      </div>
    </div>
  );
};

export const CloseButton = ({ color = 'light', onClick }: CloseButtonProps) => {
  const closeButtonStyle = 'w-6 h-6 flex-center text-xl text-gray-500';
  const buttonColor = color === 'light' ? 'text-gray-500' : 'text-gray-900';
  return (
    <div className="absolute top-6 right-6">
      <button
        type="button"
        onClick={onClick}
        className={`${closeButtonStyle} ${buttonColor}`}
      >
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
    'text-gray-900 text-lg font-semibold flex w-18/19 overflow-hidden pl-6';
  const align = start ? 'justify-start' : center ? 'justify-center' : null;
  return (
    <div className={`${modalHeaderStyle} ${align} ${className}`}>
      <div className="truncate">{children}</div>
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
  fullScreen,
  group,
}: ModalContentProps) => {
  const baseStyle =
    'text-gray-800 text-base font-medium max-h-120 overflow-y-auto flex-center flex-col mt-6 mb-6';
  const groupStyle = group && 'gap-6 mb-10';
  const fullScreenStyle = fullScreen && 'flex-1 max-h-175 my-auto';

  return (
    <div
      className={`${baseStyle} ${groupStyle} ${fullScreenStyle} ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  const modalFooterStyle =
    'text-base text-gray-800 font-semibold flex gap-2 mt-auto';
  const childrenCount = React.Children.count(children);
  const alignment =
    childrenCount > 1 ? 'justify-center' : 'justify-end md:justify-center';
  return (
    <div className={`${modalFooterStyle} ${alignment} ${className}`}>
      {children}
    </div>
  );
};

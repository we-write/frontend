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
  const backdropStyle = 'fixed inset-0 z-50 flex items-center justify-center';
  const modalStyle = 'min-w-75 w-[450px] p-6 bg-white shadow-xl relative';
  if (!isOpen) return null;
  return (
    <div
      onClick={onClose} // 바깥 영역 클릭 시 닫기 (선택사항)
      className={`${backdropStyle} ${
        isOpen
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0'
      } ${noBackdrop ? 'bg-transparent' : 'bg-black/50'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫기 방지
        className={`${modalStyle} ${fullScreen ? 'flex h-screen w-screen flex-col rounded-none' : 'rounded-xl'} ${className}`}
      >
        {noCloseButton ? null : <CloseButton onClick={onClose} />}
        {children}
      </div>
    </div>
  );
};

export const CloseButton = ({ onClick }: { onClick: () => void }) => {
  const CloseButtonStyle = 'w-6 h-6 flex-center text-xl text-gray-500';
  return (
    <div className="absolute top-6 right-6">
      <button type="button" onClick={onClick} className={`${CloseButtonStyle}`}>
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
  const ModalHeaderStyle =
    'text-gray-900 text-lg font-semibold flex w-18/19 truncate overflow-x-auto';
  return (
    <div
      className={`${ModalHeaderStyle} ${start ? 'justify-start' : null} ${center ? 'justify-center' : null} ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
  fullScreen,
}: ModalContentProps) => {
  const base = 'text-gray-800 text-base font-medium max-h-120 overflow-y-auto';
  const fullScreenStyle =
    'flex-1 flex items-center justify-center flex-col max-h-175 my-auto';
  const normalStyle = 'flex-center flex-col mt-6 mb-6';

  return (
    <div
      className={`${base} ${fullScreen ? fullScreenStyle : normalStyle} ${className}`}
    >
      {children}
    </div>
  );
};

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  const ModalFooterStyle = 'text-base text-gray-800 font-semibold flex gap-2';
  const childrenCount = React.Children.count(children);
  const alignment =
    childrenCount > 1 ? 'justify-center' : 'justify-end md:justify-center';
  return (
    <div className={`${ModalFooterStyle} ${alignment} ${className} mt-auto`}>
      {children}
    </div>
  );
};

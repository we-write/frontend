import React from 'react';
import {
  DropdownContainerProps,
  DropdownContentProps,
  DropdownProps,
} from './type';

export const DropdownContent = ({
  contentItem,
  onClick,
  className = '',
}: DropdownContentProps) => {
  const defaultOptionStyle = `w-full p-1 hover:cursor-pointer outline-none ${className}`;

  return (
    <li role="button" className={defaultOptionStyle} onClick={onClick}>
      {contentItem}
    </li>
  );
};

export const DropdownContainer = ({
  children,
  className = '',
}: DropdownContainerProps) => {
  const defaultOptionContainerStyle = `overflow-hidden rounded-md bg-white mt-2 ${className}`;
  return <ul className={defaultOptionContainerStyle}>{children}</ul>;
};

const Dropdown = ({
  children,
  trigger,
  isOpen,
  className = '',
}: DropdownProps) => {
  return (
    <div className={className}>
      {trigger}
      {isOpen && children}
    </div>
  );
};

Dropdown.Container = DropdownContainer;
Dropdown.Content = DropdownContent;

export default Dropdown;

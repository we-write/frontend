import {
  DropdownContainerProps,
  DropdownContentProps,
  DropdownProps,
} from './type';
import useClickOutside from '@/hooks/useClickOutside';

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
  ...rest
}: DropdownContainerProps) => {
  const defaultOptionContainerStyle = `overflow-hidden rounded-md bg-white mt-2 ${className}`;
  return (
    <ul className={defaultOptionContainerStyle} {...rest}>
      {children}
    </ul>
  );
};

const Dropdown = ({
  children,
  trigger,
  isOpen,
  className = '',
  onClose,
}: DropdownProps) => {
  const outSideRef = useClickOutside<HTMLDivElement>(() => {
    if (isOpen && onClose) {
      onClose();
    }
  });
  return (
    <div ref={outSideRef} className={className}>
      {trigger}
      {isOpen && children}
    </div>
  );
};

Dropdown.Container = DropdownContainer;
Dropdown.Content = DropdownContent;

export default Dropdown;

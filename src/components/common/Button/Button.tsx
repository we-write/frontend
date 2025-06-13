import { MouseEvent, PropsWithChildren } from 'react';
import { ButtonProps, BUTTON_SIZE } from './type';
import { getColorSystem } from '@/utils/getColorSystem';

const Button = ({
  children,
  color = 'primary',
  size = 'full',
  type = 'button',
  variant = 'default',
  isDisabled = false,
  isLoading = false,
  className = '',
  ...rest
}: PropsWithChildren<ButtonProps>) => {
  const baseStyle = 'flex-center rounded-xl h-11';
  const sizeStyle = BUTTON_SIZE[size];
  const colorStyle = isDisabled
    ? 'bg-gray-200 text-gray-500 border-gray-200'
    : getColorSystem(color, variant);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    rest.onClick?.(e);
  };

  return (
    <button
      type={type}
      className={`${baseStyle} ${sizeStyle} ${colorStyle} ${className}`}
      disabled={isDisabled}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? <div className="animate-spin">⌛</div> : children}
    </button>
  );
};

export default Button;

import { ChipProps } from './type';

const Chip = ({
  text,
  textColor,
  backgroundColor,
  size = 'medium',
  className = '',
}: ChipProps) => {
  const defaultChipStyle = `text-center w-auto truncate`;
  const chipSizeStyle = {
    small: 'text-xs px-2 py-1 w-fit h-fit rounded-full',
    medium: 'text-sm px-3 py-1.5 w-fit h-fit rounded-md',
    large: 'text-base px-4 py-2 w-fit h-fit rounded-md',
  };
  return (
    <div
      className={`${chipSizeStyle} ${textColor} ${backgroundColor} ${defaultChipStyle} ${chipSizeStyle[size]} ${className}`}
    >
      {text}
    </div>
  );
};

export default Chip;

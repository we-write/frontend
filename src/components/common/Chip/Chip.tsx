import { getColorSystem } from '@/utils/getColorSystem';
import { ChipProps } from './type';

const Chip = ({
  text,
  className = '',
  color = 'primary',
  variant = 'default',
  chipType = 'default',
}: ChipProps) => {
  const defaultChipStyle = 'flex items-center justify-center text-lg';
  const chipSizeStyle = {
    default: 'px-3 py-1 min-w-[46px] max-w-fit h-fit rounded-md',
    rounded: 'px-3 py-2 min-w-[46px] max-w-fit h-[32px] rounded-full',
    custom: `${className} `,
  };

  return (
    <div
      className={`${defaultChipStyle} ${chipSizeStyle[chipType]} ${getColorSystem(
        color,
        variant
      )}`}
    >
      <span className="text-center">{text}</span>
    </div>
  );
};

export default Chip;

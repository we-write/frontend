import { getColorSystem } from '@/utils/getColorSystem';
import { ChipProps } from './type';

const Chip = ({
  text,
  className = '',
  color = 'primary',
  variant = 'default',
  chipType = 'default',
}: ChipProps) => {
  const defaultChipStyle = 'flex-center text-sm';
  const chipSizeStyle = {
    default: 'px-3 py-1  rounded-md w-fit h-fit',
    rounded: 'px-2 py-1 rounded-full w-fit h-fit',
    badge: 'px-3  w-fit h-fit rounded-full',
    info: 'px-2 py-1 h-[24px] max-w-fit  rounded-md',
    state: 'px-3 py-1 w-fit h-[32px] rounded-full',
  };

  return (
    <div
      className={`${defaultChipStyle} ${chipType === 'custom' ? className : chipSizeStyle[chipType]} ${getColorSystem(
        color,
        variant
      )}`}
    >
      <span className="text-center">{text}</span>
    </div>
  );
};

export default Chip;

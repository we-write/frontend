import { CheckBoxProps, LabelPosition } from './type';
import Image from 'next/image';

const CheckBox = ({
  checked = false,
  onChange,
  label,
  labelPosition = 'left',
  className = '',
  ...rest
}: CheckBoxProps) => {
  const labelClasses: Record<LabelPosition, string> = {
    left: 'flex-row-reverse',
    right: 'flex-row',
  };

  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-2 ${labelClasses[labelPosition]} ${className}`}
    >
      {label && <span className="text-sm">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...rest}
      />
      <Image
        src={
          checked
            ? '/assets/icons/CheckedIcon.svg'
            : '/assets/icons/UnCheckedIcon.svg'
        }
        alt={checked ? 'Checked' : 'Unchecked'}
        width={20}
        height={20}
      />
    </label>
  );
};

export default CheckBox;

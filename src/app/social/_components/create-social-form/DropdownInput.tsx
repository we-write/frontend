'use client';

import { Path, PathValue, useWatch } from 'react-hook-form';
import { FieldValues } from 'react-hook-form';
import InputForm from '@/components/common/Form/InputForm';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';
import { DropdownInputProps } from './type';

const DropdownInput = <T extends FieldValues>({
  name,
  label,
  placeholder,
  setValue,
  control,
  errors,
  options,
  unit,
}: DropdownInputProps<T>) => {
  const { value: isOpen, toggle, setFalse: closeDropdown } = useBoolean();
  const currentValue = useWatch({ control, name });

  const handleClose = (value: PathValue<T, Path<T>>) => {
    setValue(name, value, { shouldValidate: true });
    closeDropdown();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => handleClose(currentValue)}
      trigger={
        <InputForm
          name={name}
          label={label}
          placeholder={placeholder}
          value={currentValue ? `${currentValue}${unit}` : ''}
          onClick={toggle}
          readOnly
          className="w-full cursor-pointer outline-none"
          hasError={!!errors[name]}
          helperText={errors[name]?.message as string}
        />
      }
    >
      <Dropdown.Container className="absolute z-10 w-full shadow-md">
        {options.map(({ value, label }) => (
          <Dropdown.Content
            key={String(value)}
            contentItem={
              <p className="hover:bg-write-green-50 w-full rounded-md p-2">
                {label}
              </p>
            }
            onClick={() => {
              handleClose(value);
            }}
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
  );
};

export default DropdownInput;

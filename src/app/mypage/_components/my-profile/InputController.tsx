'use client';

import InputForm from '@/components/common/Form/InputForm';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: Record<string, unknown>;
  label: string;
  placeholder: string;
}

const InputController = <T extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
}: InputControllerProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <InputForm
          {...field}
          label={label}
          placeholder={placeholder}
          hasError={!!fieldState.error}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
};

export default InputController;

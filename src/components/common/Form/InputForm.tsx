import Input, { HelperText } from '../Input/Input';
import { InputFormProps } from './type';

const InputForm = ({
  name,
  label,
  helperText,
  hasError = false,
  ...rest
}: InputFormProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="mb-2 text-sm font-semibold">
          {label}
        </label>
      )}
      <Input name={name} hasError={hasError} {...rest} />

      {helperText && hasError && (
        <HelperText helperText={helperText} hasError={hasError} />
      )}
    </div>
  );
};

export default InputForm;

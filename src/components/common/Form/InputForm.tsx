import Input, { HelperText, InputProps } from '../Input/Input';

interface InputFormProps extends Omit<InputProps, 'name' | 'label'> {
  name: string;
  label?: string;
  helperText?: string;
  hasError?: boolean;
}

const InputForm = ({
  name,
  label,
  helperText,
  hasError = false,
  ...rest
}: InputFormProps) => {
  return (
    <div className="flex flex-col">
      {label && <p className="mb-2 text-sm font-semibold">{label}</p>}

      <Input name={name} hasError={hasError} {...rest} />

      {helperText && <HelperText helperText={helperText} hasError={hasError} />}
    </div>
  );
};

export default InputForm;

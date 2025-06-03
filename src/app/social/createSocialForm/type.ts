import { CreateWriteRequest } from '@/api/social/type';
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

export interface SelectGenreInputProps {
  register: UseFormRegister<CreateWriteRequest>;
  setValue: UseFormSetValue<CreateWriteRequest>;
}

export interface ThumbnailUploadInputProps {
  control: Control<CreateWriteRequest>;
  errors: FieldErrors<CreateWriteRequest>;
}

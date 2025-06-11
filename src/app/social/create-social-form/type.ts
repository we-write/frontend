import { SocialFieldsRequest } from '@/api/social/type';
import { StoryEntity } from '@/api/stories/type';
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
  UseFormSetValue,
} from 'react-hook-form';

export interface DropdownInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
  errors: FieldErrors<T>;
  options: { value: PathValue<T, Path<T>>; label: string }[];
  unit: string;
}

// ------폼컨테이너 타입------

export interface CreateSocialFormProps {
  onClose: () => void;
}

// ------모임생성폼 타입------

export type SocialFieldsMethods = SocialFieldsRequest;

export interface SocialFormProps {
  methods: UseFormReturn<SocialFieldsMethods>;
}

export interface SelectGenreInputProps {
  setValue: UseFormSetValue<SocialFieldsMethods>;
  control: Control<SocialFieldsMethods>;
  errors: FieldErrors<SocialFieldsMethods>;
}

export interface ThumbnailUploadInputProps {
  control: Control<SocialFieldsMethods>;
  errors: FieldErrors<SocialFieldsMethods>;
}

export interface RegistrationDeadlineInputProps {
  setValue: UseFormSetValue<SocialFieldsMethods>;
  control: Control<SocialFieldsMethods>;
}

export interface CapacityInputProps {
  setValue: UseFormSetValue<SocialFieldsMethods>;
  errors: FieldErrors<SocialFieldsMethods>;
  control: Control<SocialFieldsMethods>;
}

// export type RegistrationDeadlineInputProps = PeriodInputProps;

// ------스토리설정폼 타입------

export type StorySettingsFieldsMethods = Pick<
  StoryEntity,
  'approved_count' | 'max_length' | 'is_public' | 'approval_period'
>;

export interface StorySettingFormProps {
  methods: UseFormReturn<StorySettingsFieldsMethods>;
}

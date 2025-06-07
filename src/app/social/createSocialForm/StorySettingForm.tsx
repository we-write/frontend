'use client';

import {
  APPROVAL_PERIOD_OPTIONS,
  APPROVER_COUNT_OPTIONS,
  WORD_LIMIT_OPTIONS,
} from '@/constants/social/createSocialForm';
import DropdownInput from './DropdownInput';
import { PublicCheckboxProps, StorySettingFormProps } from './type';

const PublicCheckbox = ({ setValue }: PublicCheckboxProps) => {
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id="isPublic"
        onChange={(e) => setValue('is_public', e.target.checked)}
        className="h-4 w-4 rounded border-gray-300"
      />
      <label htmlFor="isPublic" className="text-sm font-semibold">
        스토리 외부 공개
      </label>
    </div>
  );
};

const StorySettingForm = ({ methods }: StorySettingFormProps) => {
  const {
    setValue,
    control,
    formState: { errors },
  } = methods;

  return (
    <div className="flex flex-col gap-4">
      <DropdownInput
        name="approval_period"
        label="승인 제한 기간"
        placeholder="승인 제한 기간을 선택해주세요."
        setValue={setValue}
        control={control}
        errors={errors}
        options={APPROVAL_PERIOD_OPTIONS}
        unit="일"
      />

      <DropdownInput
        name="max_length"
        label="글자 수 제한"
        placeholder="글자 수 제한을 선택해주세요."
        setValue={setValue}
        control={control}
        errors={errors}
        options={WORD_LIMIT_OPTIONS}
        unit="자"
      />

      <DropdownInput
        name="approved_count"
        label="필요 승인자 수"
        placeholder="필요한 승인자 수를 선택해주세요."
        setValue={setValue}
        control={control}
        errors={errors}
        options={APPROVER_COUNT_OPTIONS}
        unit="명"
      />

      <PublicCheckbox setValue={setValue} />
    </div>
  );
};

export default StorySettingForm;

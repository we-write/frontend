'use client';

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

  const APPROVAL_PERIOD_OPTIONS = [
    { value: 1, label: '1일' },
    { value: 2, label: '2일' },
    { value: 3, label: '3일' },
    { value: 4, label: '4일' },
    { value: 5, label: '5일' },
    { value: 6, label: '6일' },
    { value: 7, label: '7일' },
  ];

  const WORD_LIMIT_OPTIONS = [
    { value: 150, label: '150자' },
    { value: 200, label: '200자' },
    { value: 250, label: '250자' },
    { value: 300, label: '300자' },
  ];

  const APPROVER_COUNT_OPTIONS = [
    { value: 1, label: '1명' },
    { value: 2, label: '2명' },
    { value: 3, label: '3명' },
  ];

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

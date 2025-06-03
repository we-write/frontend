'use client';

import { useRef } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { format } from 'date-fns';
import { GENRE_LOCATION_MAP, GenreType } from '@/api/social/type';
import Button from '@/components/common/Button/Button';
import Calendar from '@/components/common/Calendar/Calendar';
import { useCalendar } from '@/components/common/Calendar/useCalendar';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import InputForm from '@/components/common/Form/InputForm';
import Input, { HelperText } from '@/components/common/Input/Input';
import useBoolean from '@/hooks/useBoolean';
import { truncateText } from '@/utils/convertString';
import { CalendarIcon } from '@public/assets/icons';
import {
  CapacityInputProps,
  SelectGenreInputProps,
  ThumbnailUploadInputProps,
  RegistrationDeadlineInputProps,
  SocialFormProps,
} from './type';
import DropdownInput from './DropdownInput';

const SelectGenreInput = ({
  setValue,
  control,
  errors,
}: SelectGenreInputProps) => {
  const GENRE_OPTIONS = Object.entries(GENRE_LOCATION_MAP).map(([key]) => ({
    value: key as GenreType,
    label: key,
  }));

  return (
    <DropdownInput
      name="genre"
      label="장르"
      placeholder="장르를 선택해주세요."
      setValue={setValue}
      control={control}
      errors={errors}
      options={GENRE_OPTIONS}
      unit=""
    />
  );
};

const ThumbnailUploadInput = ({
  control,
  errors,
}: ThumbnailUploadInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageFileName = useWatch({
    control,
    name: 'image',
  });

  return (
    <div className="flex flex-col">
      <label htmlFor="image" className="mb-2 text-sm font-semibold">
        썸네일 이미지
      </label>

      <div className="flex justify-between gap-3">
        <div className="w-full">
          <Input
            name="image"
            type="text"
            placeholder="썸네일 이미지를 선택해주세요."
            onClick={() => fileInputRef.current?.click()}
            value={truncateText(imageFileName?.name || '', 35)}
            className="cursor-pointer outline-none"
            readOnly
          />
          {errors.image && (
            <HelperText helperText={errors.image?.message} hasError />
          )}
        </div>

        <Controller
          name="image"
          control={control}
          rules={{
            required: '썸네일 이미지를 업로드해 주세요',
          }}
          render={({ field: { onChange, ref } }) => (
            <Input
              name="hiddenImage"
              type="file"
              className="hidden"
              onChange={(e) => {
                onChange(e.target.files?.[0] || null);
              }}
              ref={(e) => {
                ref(e);
                fileInputRef.current = e;
              }}
              accept="image/*"
            />
          )}
        />

        <div className="w-25">
          <Button
            onClick={() => fileInputRef.current?.click()}
            size="custom"
            variant="inverted"
            className="w-20 border-1 sm:w-25"
          >
            파일 찾기
          </Button>
        </div>
      </div>
    </div>
  );
};

const RegistrationDeadlineInput = ({
  setValue,
  control,
}: RegistrationDeadlineInputProps) => {
  const registrationEnd = useWatch({ control, name: 'registrationEnd' });

  const {
    currentDate,
    handleDateSelect,
    selectedDate,
    navigateMonth,
    isSameDay,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
  } = useCalendar({
    initialDate: new Date(),
    minDate: new Date(),
  });

  const {
    value: endDateOpen,
    toggle: toggleEndDate,
    setFalse: setEndDateClose,
  } = useBoolean();

  const handleRegistrationEndSelect = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    newDate.setHours(23, 59, 0, 0);

    handleDateSelect(day);
    setEndDateClose();

    // 마감날짜 설정
    const formatted = newDate.toISOString();
    setValue('registrationEnd', formatted, { shouldValidate: true });
  };

  return (
    <div className="w-[217px]">
      <Dropdown
        isOpen={endDateOpen}
        trigger={
          <InputForm
            name="registrationEnd"
            label="모임 마감날짜"
            placeholder="마감날짜를 선택해 주세요."
            value={registrationEnd ? format(registrationEnd, 'yyyy-MM-dd') : ''}
            onClick={toggleEndDate}
            readOnly
            className="cursor-pointer"
            suffixIcon={<CalendarIcon fill="currentColor" />}
          />
        }
      >
        <div className="absolute z-10 mt-2">
          <Calendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            navigateMonth={navigateMonth}
            handleDateSelect={handleRegistrationEndSelect}
            isSameDay={isSameDay}
            getDaysInMonth={getDaysInMonth}
            getFirstDayOfMonth={getFirstDayOfMonth}
            isDateDisabled={isDateDisabled}
          />
        </div>
      </Dropdown>
    </div>
  );
};

const CapacityInput = ({ setValue, errors, control }: CapacityInputProps) => {
  const CAPACITY_OPTIONS = [
    { value: 5, label: '5명' },
    { value: 7, label: '7명' },
    { value: 10, label: '10명' },
  ];

  return (
    <DropdownInput
      name="capacity"
      label="모집 정원"
      placeholder="5-10인 사이로 입력해 주세요."
      setValue={setValue}
      control={control}
      errors={errors}
      options={CAPACITY_OPTIONS}
      unit="명"
    />
  );
};

const SocialForm = ({ methods }: SocialFormProps) => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = methods;

  return (
    <>
      <InputForm
        name="title"
        label="스토리명"
        placeholder="스토리명을 입력해주세요."
        register={register('title', {
          required: '스토리명을 입력해 주세요',
        })}
        autoFocus
        hasError={!!errors.title}
        helperText={errors.title?.message}
      />

      <SelectGenreInput setValue={setValue} control={control} errors={errors} />
      <ThumbnailUploadInput control={control} errors={errors} />
      <RegistrationDeadlineInput setValue={setValue} control={control} />
      <CapacityInput setValue={setValue} errors={errors} control={control} />
    </>
  );
};

export default SocialForm;

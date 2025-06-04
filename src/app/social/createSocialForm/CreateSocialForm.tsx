'use client';

import { createSocial } from '@/api/social/api';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  CreateWriteRequest,
  GENRE_LOCATION_MAP,
  GenreType,
} from '@/api/social/type';
import {
  validateCapacity,
  validateRegistrationEnd,
} from '@/utils/validators/social';
import useBoolean from '@/hooks/useBoolean';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import Input, { HelperText } from '@/components/common/Input/Input';
import { useRef } from 'react';
import { truncateText } from '@/utils/convertString';
import { SelectGenreInputProps, ThumbnailUploadInputProps } from './type';

const SelectGenreInput = ({ setValue, register }: SelectGenreInputProps) => {
  const { value: isOpen, toggle, setFalse: onClose } = useBoolean();

  return (
    <div className="flex flex-col">
      <label htmlFor="genre" className="mb-2 text-sm font-semibold">
        장르
      </label>
      <Dropdown
        trigger={
          <Input
            name="genre"
            type="text"
            placeholder="장르를 선택해주세요."
            register={register('location')}
            readOnly
            className="cursor-pointer outline-none"
            onClick={toggle}
          />
        }
        isOpen={isOpen}
      >
        <Dropdown.Container className="fixed z-10 shadow-md">
          {Object.entries(GENRE_LOCATION_MAP).map(([key]) => (
            <Dropdown.Content
              key={key}
              contentItem={
                <p className="hover:bg-write-green-50 rounded-md p-2">{key}</p>
              }
              onClick={() => {
                setValue('location', key as GenreType);
                onClose();
              }}
            />
          ))}
        </Dropdown.Container>
      </Dropdown>
    </div>
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

const CreateSocialForm = () => {
  const methods = useForm<CreateWriteRequest>({
    mode: 'onChange',
    defaultValues: {
      type: 'OFFICE_STRETCHING',
      dateTime: '2025-05-23T06:44:48.341Z',
      registrationEnd: '2025-05-23T06:44:48.341Z',
    },
    delayError: 300,
  });

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = methods;

  const handleCreateWrite = async (data: CreateWriteRequest) => {
    await createSocial(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateWrite)}
      className="flex w-full flex-col gap-6"
    >
      <h2 className="text-lg font-bold">모임 만들기</h2>

      <InputForm
        name="name"
        label="스토리명"
        placeholder="스토리명을 입력해주세요."
        register={register('name', {
          required: '스토리명을 입력해 주세요',
        })}
        autoFocus
        hasError={!!errors.name}
        helperText={errors.name?.message}
      />

      <SelectGenreInput setValue={setValue} register={register} />
      <ThumbnailUploadInput control={control} errors={errors} />

      {/* 시작날짜와 마감날짜 InputForm */}
      {/* 추후 캘린더 도입 시 분리 예정 */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:gap-[38px]">
        <div className="w-[217px]">
          <InputForm
            name="dateTime"
            label="시작날짜"
            register={register('dateTime')}
            readOnly
          />
        </div>

        <div className="w-[217px]">
          <InputForm
            name="registrationEnd"
            label="마감날짜"
            register={register('registrationEnd', {
              validate: (value) =>
                validateRegistrationEnd(value, getValues('dateTime')),
            })}
            readOnly
            hasError={!!errors.registrationEnd}
            helperText={errors.registrationEnd?.message}
          />
        </div>
      </div>

      {/* 모집 정원 InputForm */}
      <InputForm
        name="capacity"
        type="number"
        label="모집 정원"
        placeholder="2-10인 사이로 입력해 주세요."
        register={register('capacity', {
          validate: validateCapacity,
        })}
        hasError={!!errors.capacity}
        helperText={errors.capacity?.message}
      />

      <Button type="submit">모임 생성</Button>
    </form>
  );
};

export default CreateSocialForm;

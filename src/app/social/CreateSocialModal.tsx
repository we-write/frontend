'use client';

import { createSocial } from '@/api/social/api';
import { CreateWriteRequest } from '@/api/social/type';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';
import Input, { HelperText } from '@/components/common/Input/Input';
import { truncateText } from '@/utils/convertString';
import {
  validateCapacity,
  validateLocation,
  validateRegistrationEnd,
} from '@/utils/validators/social';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

const CreateSocialModal = () => {
  const methods = useForm<CreateWriteRequest>({
    mode: 'onChange',
    defaultValues: {},
    delayError: 300,
  });

  const { register, control, getValues, formState } = methods;
  const { errors, isValid } = formState;

  // 직접 접근할 useRef 생성
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 버튼 클릭하면 파일탐색기 열기
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleCreateWrite = async () => {
    await createSocial(getValues());
  };

  return (
    <div className="flex w-130 flex-col gap-6 rounded-lg bg-white p-6">
      <h2 className="text-lg font-bold">모임 만들기</h2>

      {/* 스토리명 InputForm */}
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

      {/* 장르 InputForm */}
      <InputForm
        name="location"
        label="장르"
        placeholder="장르를 선택해주세요."
        register={register('location', {
          validate: validateLocation,
        })}
        hasError={!!errors.location}
        helperText={errors.location?.message}
      />

      {/* 썸네일 이미지 InputForm */}
      <div className="flex flex-col">
        <label htmlFor={'image'} className="mb-2 text-sm font-semibold">
          썸네일 이미지
        </label>

        <div className="flex justify-between gap-3">
          {/* 썸네일 이미지 텍스트 표시 Input */}
          <div className="w-full">
            <Input
              name="image"
              type="text"
              placeholder="썸네일 이미지를 선택해주세요."
              onClick={handleFileInputClick}
              value={truncateText(getValues('image')?.name || '', 35)}
              className="cursor-pointer outline-none"
              readOnly
            />
            {errors.image && (
              <HelperText helperText={errors.image?.message} hasError />
            )}
          </div>

          {/* 썸네일 이미지  파일 Input */}
          <Controller
            name="image"
            control={control}
            rules={{
              required: '썸네일 이미지를 업로드해 주세요',
            }}
            render={({ field: { onChange, ref } }) => (
              <Input
                name="image"
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
              onClick={handleFileInputClick}
              size="custom"
              variant="inverted"
              className="w-25 border-1"
            >
              파일 찾기
            </Button>
          </div>
        </div>
      </div>

      {/* 시작날짜와 마감날짜 InputForm */}
      <div className="flex justify-between gap-[38px]">
        <InputForm
          name="dateTime"
          label="시작날짜"
          register={register('dateTime')}
          readOnly
        />

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

      <Button onClick={handleCreateWrite} disabled={!isValid}>
        모임 생성
      </Button>
    </div>
  );
};

export default CreateSocialModal;

'use client';

import { createSocial } from '@/api/social/api';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Form/InputForm';
import ThumbnailUploadInput from './ThumbnailUploadInput';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateWriteRequest } from '@/api/social/type';
import SelectGenreInput from './SelectGenreInput';
import {
  validateCapacity,
  validateRegistrationEnd,
} from '@/utils/validators/social';

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
    getValues,
    formState: { errors },
  } = methods;

  const handleCreateWrite = async (data: CreateWriteRequest) => {
    await createSocial(data);
  };

  return (
    <FormProvider {...methods}>
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

        <SelectGenreInput />
        <ThumbnailUploadInput />

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
    </FormProvider>
  );
};

export default CreateSocialForm;

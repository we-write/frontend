import Input, { HelperText } from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { truncateText } from '@/utils/convertString';
import { useRef } from 'react';
import { CreateWriteRequest } from '@/api/social/type';

const ThumbnailUploader = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<CreateWriteRequest>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageFileName = useWatch({
    control,
    name: 'image',
  });

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={'image'} className="mb-2 text-sm font-semibold">
        썸네일 이미지
      </label>

      <div className="flex justify-between gap-3">
        <div className="w-full">
          <Input
            name="image"
            type="text"
            placeholder="썸네일 이미지를 선택해주세요."
            onClick={handleFileInputClick}
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
  );
};

export default ThumbnailUploader;

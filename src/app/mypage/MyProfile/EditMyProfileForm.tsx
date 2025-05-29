'use client';

import Image from 'next/image';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import { UserRequest } from '@/types/user';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/common/Modal/Modal';
import InputForm from '@/components/common/Form/InputForm';
import { Controller, useForm } from 'react-hook-form';
import { useUpdateMyInfo } from '@/hooks/api/users/useUpdateMyInfo';
import { EditMyProfileFormProps } from '@/app/mypage/MyProfile/type';

const EditMyProfileForm = ({
  isOpen,
  closeModal,
  profileData,
  profileImage,
  refetch,
}: EditMyProfileFormProps) => {
  const [previewImage, setPreviewImage] = useState<string>(profileImage);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRequest>({
    defaultValues: {
      companyName: profileData.companyName,
      image: profileData.image,
    },
  });

  const { mutate: updateMyInfo } = useUpdateMyInfo();

  const onSubmit = async (data: UserRequest) => {
    await updateMyInfo(data);
    refetch();
    closeModal();
    setPreviewImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>프로필 수정하기</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent group>
          <div className="flex w-full flex-col items-start">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onClick={(e) => (e.currentTarget.value = '')}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                        const previewUrl = URL.createObjectURL(file);
                        setPreviewImage(previewUrl);
                      }
                    }}
                  />
                  <label
                    htmlFor="profileImage"
                    className="relative mb-6 h-[56px] w-[56px] cursor-pointer rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${previewImage || profileImage})`,
                    }}
                  >
                    <Image
                      className="absolute right-0 bottom-0 rounded-full border-2 border-white"
                      src="/assets/images/BtnEdit.png"
                      alt="edit"
                      width={20}
                      height={20}
                    />
                  </label>
                </>
              )}
            />
            <Controller
              name="companyName"
              control={control}
              render={({ field }) => (
                <div className="w-full">
                  <InputForm
                    label="좋아하는 작품"
                    placeholder="좋아하는 작품을 입력해주세요"
                    register={{
                      ...register('companyName', {
                        required: '좋아하는 작품 내용란이 비어있습니다.',
                      }),
                    }}
                    hasError={!!errors.companyName}
                    helperText={errors.companyName?.message}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
        </ModalContent>
        <ModalFooter>
          <Button type="button" variant="inverted" onClick={closeModal}>
            취소
          </Button>
          <Button type="submit">수정하기</Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditMyProfileForm;

'use client';

import Button from '@/components/common/Button/Button';
import { MyInfoRequest } from '@/api/auth/type';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/common/Modal/Modal';
import { Control, Controller, useForm } from 'react-hook-form';
import { useUpdateMyInfo } from '@/hooks/api/auth/useUpdateMyInfo';
import { BtnEditSmall } from '@public/assets/icons';
import { EditMyProfileFormProps } from './type';
import usePreviewImage from '@/hooks/api/mypage/usePreviewImage';
import InputController from '@/app/mypage/_components/my-profile/InputController';

const EditMyProfileForm = ({
  isOpen,
  closeModal,
  companyName,
  currentProfileImageUrl,
}: EditMyProfileFormProps) => {
  const { control, handleSubmit } = useForm<MyInfoRequest>({
    defaultValues: {
      companyName,
    },
  });

  const { mutate: updateMyInfo } = useUpdateMyInfo();
  const {
    previewUrl: profilePreviewImageUrl,
    handleChange: handleProfileImageChange,
  } = usePreviewImage(currentProfileImageUrl);

  const onSubmit = async (data: MyInfoRequest) => {
    await updateMyInfo(data);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>프로필 수정하기</ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <div className="flex w-full flex-col items-start">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    id="currentProfileImageUrl"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      handleProfileImageChange(e, field.onChange);
                    }}
                  />
                  <label
                    htmlFor="currentProfileImageUrl"
                    className="relative mb-6 h-[56px] w-[56px] cursor-pointer rounded-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${profilePreviewImageUrl || currentProfileImageUrl})`,
                    }}
                  >
                    <BtnEditSmall
                      className="absolute right-0 bottom-0 rounded-full"
                      width={20}
                      height={20}
                    />
                  </label>
                </>
              )}
            />
            <div className="w-full">
              <InputController
                name="companyName"
                control={control as Control<MyInfoRequest>}
                rules={{
                  required: '좋아하는 작품 내용란이 비어있습니다.',
                }}
                label="좋아하는 작품"
                placeholder="좋아하는 작품을 입력해주세요"
              />
            </div>
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

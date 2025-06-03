'use client';

import Button from '@/components/common/Button/Button';
import SocialForm from './SocialForm';
import StorySettingForm from './StorySettingForm';
import { CreateSocialFormProps } from './type';
import useCreateSocialForm from './useCreateSocialForm';

const CreateSocialForm = ({ onClose }: CreateSocialFormProps) => {
  const {
    socialMethods,
    storySettingMethods,
    handleSubmit,
    handleCreateSocial,
  } = useCreateSocialForm(onClose);

  return (
    <form
      onSubmit={handleSubmit(handleCreateSocial)}
      className="flex w-full flex-col gap-6"
    >
      <h2 className="text-lg font-bold">모임 만들기</h2>

      <SocialForm methods={socialMethods} />
      <StorySettingForm methods={storySettingMethods} />

      <Button type="submit" className="h-11">
        <p className="font-semibold">모임 생성</p>
      </Button>
    </form>
  );
};

export default CreateSocialForm;

'use client';

import Button from '@/components/common/Button/Button';
import SocialForm from '../create-social-form/SocialForm';
import StorySettingForm from '../create-social-form/StorySettingForm';
import { CreateSocialFormProps } from '../create-social-form/type';
import useCreateSocialForm from '../create-social-form/useCreateSocialForm';

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

      <Button type="submit" className="h-11 font-semibold">
        모임생성
      </Button>
    </form>
  );
};

export default CreateSocialForm;

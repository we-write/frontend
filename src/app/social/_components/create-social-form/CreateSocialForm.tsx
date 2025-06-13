'use client';

import Button from '@/components/common/Button/Button';
import SocialForm from './SocialForm';
import StorySettingForm from './StorySettingForm';
import { CreateSocialFormProps } from './type';
import useCreateSocialForm from './useCreateSocialForm';
import { SocialFieldsRequest } from '@/api/social/type';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';
import { getQueryClient } from '@/lib/queryClinet';
import { QUERY_KEY } from '@/constants/queryKey';

const CreateSocialForm = ({ onClose }: CreateSocialFormProps) => {
  const {
    socialMethods,
    storySettingMethods,
    handleSubmit,
    createSocialSequentially,
  } = useCreateSocialForm();

  const router = useRouter();
  const queryClient = getQueryClient();

  const handleCreateSocial = async (data: SocialFieldsRequest) => {
    const createSocialResult = await createSocialSequentially(data);

    if (!createSocialResult.status) return;

    // TODO: toast popup출력 추가하기
    router.push(`${APP_ROUTES.socialDetail}/${createSocialResult.socialId}`);
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY.SOCIAL] });
    onClose();
  };

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

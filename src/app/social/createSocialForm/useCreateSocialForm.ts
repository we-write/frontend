import {
  CodeitSocialFields,
  SocialFieldsRequest,
  getLocationByGenre,
  GenreType,
} from '@/api/social/type';
import { useForm } from 'react-hook-form';
import { createSocial } from '@/api/social/api';
import { createStory } from '@/api/stories/api';
import { CreateStoryRequest } from '@/api/stories/type';
import { SocialFieldsMethods, StorySettingsFieldsMethods } from './type';
import { createCollaborator } from '@/api/story-collaborators/api';
import { TEAM_USER_ROLE } from '@/types/teamUserRole';
import { CreateCollaboratorRequest } from '@/api/story-collaborators/type';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import {
  APPROVAL_PERIOD_OPTIONS,
  APPROVER_COUNT_OPTIONS,
  FORM_DELAY_ERROR,
  WORD_LIMIT_OPTIONS,
} from '@/constants/social/createSocialForm';

interface SocialResponse {
  id: number;
  name: string;
  image: string;
}

// 소셜 데이터 변환 함수
const convertToSocialData = (data: SocialFieldsRequest): CodeitSocialFields => {
  const registrationEndDate = new Date(data.registrationEnd);
  const dateTime = new Date(registrationEndDate);
  dateTime.setDate(dateTime.getDate() + 1);

  return {
    name: data.title,
    type: 'OFFICE_STRETCHING',
    location: getLocationByGenre(data.genre),
    capacity: data.capacity,
    image: data.image,
    dateTime: dateTime.toISOString(),
    registrationEnd: data.registrationEnd,
  };
};

// 스토리 데이터 변환 함수
const convertToStoryData = (
  socialResponse: SocialResponse,
  storySettings: StorySettingsFieldsMethods,
  genre: GenreType
): CreateStoryRequest => {
  return {
    ...storySettings,
    social_id: socialResponse.id.toString(),
    title: socialResponse.name,
    cover_image_url: socialResponse.image,
    genre,
  };
};

const useCreateSocialForm = (onClose: () => void) => {
  const socialMethods = useForm<SocialFieldsMethods>({
    mode: 'onChange',
    defaultValues: {
      registrationEnd: '',
    },
    delayError: FORM_DELAY_ERROR,
  });

  const storySettingMethods = useForm<StorySettingsFieldsMethods>({
    mode: 'onChange',
    defaultValues: {
      approved_count: APPROVER_COUNT_OPTIONS[0].value,
      max_length: WORD_LIMIT_OPTIONS[0].value,
      is_public: false,
      approval_period: APPROVAL_PERIOD_OPTIONS[0].value,
    },
    delayError: FORM_DELAY_ERROR,
  });

  const { data: userInfo } = useGetMyInfo(true);

  const {
    handleSubmit,
    formState: { isValid },
  } = socialMethods;

  // 소셜 생성 API 호출
  const createSocialApi = async (data: SocialFieldsRequest) => {
    if (!isValid) return;

    const convertedData = convertToSocialData(data);
    const response = await createSocial(convertedData);
    // TODO: 응답값 개선 하기(#150 PR)
    return response;
  };

  // 스토리 생성 API 호출
  const createStoryApi = async (data: CreateStoryRequest) => {
    const response = await createStory(data);
    return response;
  };

  const createCollaboratorAsLeader = async (
    data: CreateCollaboratorRequest
  ) => {
    const response = await createCollaborator({
      data: data,
      role: TEAM_USER_ROLE.LEADER,
    });
    // TODO: 응답값 개선 하기(#150 PR)
    return response;
  };

  // 소셜 및 스토리 생성 핸들러
  const handleCreateSocial = async (data: SocialFieldsRequest) => {
    if (!isValid) return;

    const socialResponseData = await createSocialApi(data);

    if (socialResponseData) {
      const storySettingsData = storySettingMethods.getValues();
      const storyData = convertToStoryData(
        socialResponseData,
        storySettingsData,
        data.genre
      );

      const storyResponse = await createStoryApi(storyData);
      await createCollaboratorAsLeader({
        story_id: storyResponse[0]?.story_id.toString(),
        user_id: socialResponseData.id,
        user_name: userInfo?.name,
        joined_at: new Date().toISOString(),
      });
      onClose();
    }
  };

  return {
    socialMethods,
    storySettingMethods,
    handleSubmit,
    handleCreateSocial,
  };
};

export default useCreateSocialForm;

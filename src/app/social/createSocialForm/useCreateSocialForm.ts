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
    delayError: 300,
  });

  const storySettingMethods = useForm<StorySettingsFieldsMethods>({
    mode: 'onChange',
    defaultValues: {
      approved_count: 1,
      max_length: 150,
      is_public: false,
      approval_period: 1,
    },
    delayError: 300,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = socialMethods;

  // 소셜 생성 API 호출
  const createSocialApi = async (data: SocialFieldsRequest) => {
    if (!isValid) return;

    const convertedData = convertToSocialData(data);
    const response = await createSocial(convertedData);
    return response;
  };

  // 스토리 생성 API 호출
  const createStoryApi = async (data: CreateStoryRequest) => {
    const response = await createStory(data);
    return response;
  };

  // 소셜 및 스토리 생성 핸들러
  const handleCreateSocial = async (data: SocialFieldsRequest) => {
    if (!isValid) return;

    const socialResponseData = await createSocialApi(data);
    console.log(socialResponseData);

    if (socialResponseData) {
      const storySettingsData = storySettingMethods.getValues();
      const storyData = convertToStoryData(
        socialResponseData,
        storySettingsData,
        data.genre
      );

      await createStoryApi(storyData);
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

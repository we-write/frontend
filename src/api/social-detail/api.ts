import {
  DeleteSocialByDbParams,
  GetSocialDetailParams,
  GetSocialDetailResponse,
  GetStoryIdParams,
  GetStoryIdResponse,
  GetSummaryParams,
  GetTeamsParticipantsParams,
  GetTeamsParticipantsResponse,
  GetUserRoleParams,
  SaveSummaryRequest,
} from '@/api/social-detail/type';
import instanceBaaS from '../instanceBaaS';
import { AxiosError } from 'axios';
import instance from '@/api/instance';
import { API_PATH } from '@/constants/apiPath';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getSocialDetail = async ({
  socialId,
}: GetSocialDetailParams): Promise<GetSocialDetailResponse> => {
  if (!BASE_URL) {
    throw new Error('BASE_URL을 찾을 수 없습니다');
  }

  try {
    const response = await instance.get<GetSocialDetailResponse>(
      `${API_PATH.SOCIAL}/${socialId}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const status = axiosError.response.status;

      switch (status) {
        case 400:
          throw new Error('잘못된 요청입니다.');
        case 401:
          throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
        case 403:
          throw new Error('접근 권한이 없습니다.');
        case 404:
          throw new Error('요청한 리소스를 찾을 수 없습니다.');
        case 500:
          throw new Error(
            '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        default:
          throw new Error(`알 수 없는 오류가 발생했습니다. (error: ${status})`);
      }
    }

    if (axiosError.request) {
      throw new Error(
        '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.'
      );
    }

    throw new Error('요청 중 오류가 발생했습니다.');
  }
};

export const getSocialParticipants = async (
  params: GetTeamsParticipantsParams
): Promise<GetTeamsParticipantsResponse[]> => {
  const { socialId } = params;
  if (!BASE_URL) {
    throw new Error('BASE_URL을 찾을 수 없습니다');
  }

  try {
    const response = await instance.get<GetTeamsParticipantsResponse[]>(
      `${API_PATH.SOCIAL}/${socialId}/participants`
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      const status = axiosError.response.status;

      switch (status) {
        case 400:
          throw new Error('잘못된 요청입니다.');
        case 401:
          throw new Error('인증이 필요합니다. 로그인 후 다시 시도해주세요.');
        case 403:
          throw new Error('접근 권한이 없습니다.');
        case 404:
          throw new Error('요청한 리소스를 찾을 수 없습니다.');
        case 500:
          throw new Error(
            '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        default:
          throw new Error(`알 수 없는 오류가 발생했습니다. (error: ${status})`);
      }
    }

    if (axiosError.request) {
      throw new Error(
        '서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.'
      );
    }

    throw new Error('요청 중 오류가 발생했습니다.');
  }
};

export const saveSummary = async ({
  storyId,
  summaryHtml,
}: SaveSummaryRequest) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .update([
      {
        summary: summaryHtml,
      },
    ])
    .eq('story_id', storyId)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getSummary = async ({ socialId }: GetSummaryParams) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('summary')
    .eq('social_id', socialId)
    .single();

  if (error && error.code === 'PGRST116') return null;
  if (error) throw new Error(error.message);
  return data;
};

export const getUserRole = async ({ userId, storyId }: GetUserRoleParams) => {
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .select('role')
    .eq('story_id', storyId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error && error.code === 'PGRST116') return null;
  if (error) throw new Error(error.message);
  return data;
};

export const getStoryId = async ({
  socialId,
}: GetStoryIdParams): Promise<GetStoryIdResponse | 'not-found'> => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('story_id')
    .eq('social_id', socialId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) {
    return 'not-found';
  }
  return data;
};

export const deleteSocialByDb = async ({ storyId }: DeleteSocialByDbParams) => {
  try {
    const { error: storiesError } = await instanceBaaS
      .from('Stories')
      .delete()
      .eq('story_id', storyId);

    if (storiesError) {
      throw new Error(storiesError.message);
    }
  } catch (error) {
    throw new Error(error as string);
  }
};

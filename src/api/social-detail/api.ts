import {
  GetSocialDetailParams,
  GetSocialDetailResponse,
  GetTeamsParticipantsParams,
  GetTeamsParticipantsResponse,
} from '@/api/social-detail/type';
import axios, { AxiosError } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getSocialDetail = async ({
  storyId,
}: GetSocialDetailParams): Promise<GetSocialDetailResponse> => {
  if (!BASE_URL) {
    throw new Error('BASE_URL을 찾을 수 없습니다');
  }

  try {
    const response = await axios.get<GetSocialDetailResponse>(
      `${BASE_URL}/gatherings/${storyId}`
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

export const getSocialParticipants = async ({
  storyId,
  limit,
  offset,
  sortBy,
  sortOrder,
}: GetTeamsParticipantsParams): Promise<GetTeamsParticipantsResponse[]> => {
  if (!BASE_URL) {
    throw new Error('BASE_URL을 찾을 수 없습니다');
  }

  try {
    const response = await axios.get<GetTeamsParticipantsResponse[]>(
      `${BASE_URL}/gatherings/${storyId}/participants`,
      {
        params: {
          ...(limit !== undefined && { limit }),
          ...(offset !== undefined && { offset }),
          ...(sortBy !== undefined && { sortBy }),
          ...(sortOrder !== undefined && { sortOrder }),
        },
      }
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

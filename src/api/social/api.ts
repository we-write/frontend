import { getFilterParams } from '@/utils/getFilterParams';
import { API_PATH } from '@/constants/apiPath';
import {
  CodeitSocialFieldsRequest,
  CreateSocialResponse,
  GetSocialListParams,
  GetSocialResponse,
} from './type';
import instance from '../instance';
import { getCookie } from '../cookies';

export const FETCH_GET_ITEM_LIMIT = 12;
export const GET_SOCIAL_LIST_INIT_FILTER = {
  limit: FETCH_GET_ITEM_LIMIT,
  offset: 0,
};

export const getSocialList = async ({
  limit = FETCH_GET_ITEM_LIMIT,
  offset = 0,
  ...restParams
}: GetSocialListParams = {}) => {
  try {
    const response = await instance.get<GetSocialResponse[]>(
      `${API_PATH.SOCIAL}?${getFilterParams({
        limit, // 한 페이지 크기
        offset, // 시작 위치
        ...restParams,
      })}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSocial = async (data: CodeitSocialFieldsRequest) => {
  const accessToken = await getCookie('accessToken');

  if (!accessToken) {
    throw new Error('accessToken이 없습니다.');
  }

  try {
    const response = await instance.post<CreateSocialResponse>(
      API_PATH.SOCIAL,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 이미지 업로드용
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteSocial = async (socialId: number) => {
  const response = await instance.put(API_PATH.SOCIAL_CANCEL(socialId));
  return response.data;
};

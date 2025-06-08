import { getFilterParams } from '@/utils/getFilterParams';
import { API_PATH } from '@/constants/apiPath';
import {
  CodeitSocialFields,
  CreateSocialResponse,
  GetSocialListParams,
  SocialResponse,
} from './type';
import instance from '../instance';

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
    const response = await instance.get<SocialResponse[]>(
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

/**
 * 새 소셜 게시물을 만듭니다
 * 이미지 파일을 포함한 모든 데이터를 서버에 전송합니다
 *
 * @param data - 게시물 데이터 (제목, 내용, 위치, 이미지 등)
 * @returns 생성된 게시물 정보
 */
export const createSocial = async (data: CodeitSocialFields) => {
  try {
    const response = await instance.post<CreateSocialResponse>(
      API_PATH.SOCIAL,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // 이미지 업로드용
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

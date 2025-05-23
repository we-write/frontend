import { getFilterParams } from '@/utils/getFilterParams';
import { API_PATH } from '@/constants/apiPath';
import {
  CreateWriteRequest,
  GetSocialListParams,
  SocialResponse,
} from './type';
import instance from '../instance';

export const getSocialList = async ({
  limit = 12,
  offset = 0,
  ...restParams
}: GetSocialListParams = {}) => {
  try {
    const response = await instance.get<SocialResponse[]>(
      `${API_PATH.SOCIAL}?${getFilterParams({
        limit,
        offset,
        ...restParams,
      })}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSocial = async (data: CreateWriteRequest) => {
  const tempToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFtSWQiOiI3NyIsInVzZXJJZCI6MTc2OSwiaWF0IjoxNzQ3OTAxMDk3LCJleHAiOjE3NDc5MDQ2OTd9.KWuFWRr6fUqjtaaOI875TiJpHTiDL9TLVJraD5P9Hmk';

  try {
    const response = await instance.post(
      API_PATH.SOCIAL,
      { ...data },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${tempToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

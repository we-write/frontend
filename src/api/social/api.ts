import { getFilterParams } from '@/utils/getFilterParams';
import { API_PATH } from '@/constants/apiPath';
import {
  CreateWriteRequest,
  getLocationByGenre,
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
  try {
    const response = await instance.post(
      API_PATH.SOCIAL,
      {
        ...data,
        location: getLocationByGenre(data.location),
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

import { API_PATH } from '@/constants/apiPath';
import {
  leaveJoinSocialRequest,
  GetJoinedSocialListParams,
  JoinedSocialResponse,
} from './type';
import instance from '@/api/instance';
import { getFilterParams } from '@/utils/getFilterParams';

export const getJoinedSocialList = async ({
  limit = 12,
  offset = 0,
  ...restParams
}: GetJoinedSocialListParams) => {
  try {
    const response = await instance.get<JoinedSocialResponse[]>(
      `${API_PATH.SOCIAL}/joined?${getFilterParams({
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

export const leaveJoinSocial = async ({ id }: leaveJoinSocialRequest) => {
  try {
    const response = await instance.delete(API_PATH.SOCIAL + `/${id}/leave`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelJoinSocial = async ({ id }: leaveJoinSocialRequest) => {
  try {
    const response = await instance.put(API_PATH.SOCIAL + `/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

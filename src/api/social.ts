import { getFilterParams } from '@/utils/getFilterParams';
import instance from './instance';
import { API_PATH } from '@/constants/apiPath';

export interface GetSocialListParams {
  id?: string;
  type?: 'DALLAMEFIT' | 'OFFICE_STRETCHING' | 'MINDFULLNESS' | 'WORKATION';
  location?: '건대입구' | '을지로3가' | '신림' | '홍대입구';
  date?: string;
  createdBy?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export const getSocialList = async ({
  limit = 12,
  offset = 0,
  ...restParams
}: GetSocialListParams = {}) => {
  try {
    const response = await instance.get(
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

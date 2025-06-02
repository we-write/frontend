import { API_PATH } from '@/constants/apiPath';
import { cancelJoinSocialRequest, MySocialResponse } from './type';
import instance from '@/api/instance';

export const getMySocialList = async () => {
  try {
    const response = await instance.get<MySocialResponse[]>(
      API_PATH.JOINED_SOCIAL
    );
    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      throw new Error('인증이 필요합니다');
    }
    if (response.status === 404) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    throw new Error('나의 모임 조회 실패');
  } catch (error) {
    throw error;
  }
};

export const cancelJoinSocial = async ({
  teamId,
  id,
}: cancelJoinSocialRequest) => {
  try {
    const response = await instance.delete(API_PATH.SOCIAL + `/${id}/leave`, {
      data: { teamId: teamId, id: id },
    });

    if (response.status === 200) {
      return response.data;
    }
    if (response.status === 401) {
      throw new Error('인증이 필요합니다');
    }
    if (response.status === 404) {
      throw new Error('사용자를 찾을 수 없습니다');
    }
    throw new Error('모임 취소 실패');
  } catch (error) {
    throw error;
  }
};

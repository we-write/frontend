import { API_PATH } from '@/constants/apiPath';
import {
  LeaveJoinSocialRequest,
  GetJoinedSocialListParams,
  JoinedSocialResponse,
} from './type';
import instance from '@/api/instance';
import { getFilterParams } from '@/utils/getFilterParams';
import instanceBaaS from '@/api/instanceBaaS';

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

export const getStoryBySocialId = async (socialId: number) => {
  const { data, error } = await instanceBaaS
    .from('Stories')
    .select('*')
    .eq('social_id', socialId)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) return;
  return data.story_id;
};

export const getCollaboratorsByStoryId = async (storyId: string) => {
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .select('*')
    .eq('story_id', storyId);

  if (error) throw new Error(error.message);
  return data;
};

export const deleteCollaboratorFromSocial = async (
  userId: number,
  storyId: string
) => {
  const { data, error } = await instanceBaaS
    .from('story_collaborators')
    .delete()
    .match({ user_id: userId, story_id: storyId });

  if (error) throw new Error(error.message);
  return data;
};

export const leaveJoinSocial = async ({ id }: LeaveJoinSocialRequest) => {
  try {
    const response = await instance.delete(API_PATH.SOCIAL + `/${id}/leave`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// TODO: 달램 api 모임장의 모임 삭제 기능 (필요 없을시 지워도됨)
export const cancelJoinSocial = async ({ id }: LeaveJoinSocialRequest) => {
  try {
    const response = await instance.put(API_PATH.SOCIAL + `/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

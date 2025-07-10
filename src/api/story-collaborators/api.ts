import instanceBaaS from '../instanceBaaS';
import { DB_PATH } from '@/constants/apiPath';
import { CreateCollaboratorRequest } from './type';

export const createCollaborator = async (params: CreateCollaboratorRequest) => {
  const { data, role } = params;

  try {
    const insertData = {
      ...data,
      role,
    };

    const { data: response, error } = await instanceBaaS
      .from(DB_PATH.STORY_COLLABORATORS)
      .insert(insertData)
      .select();

    if (error) {
      throw new Error(`참여자 등록 실패: ${error.message}`);
    }

    return response;
  } catch (error) {
    console.error('전체 에러 상세:', error);
    if (error instanceof Error) {
      throw new Error(`참여자 정보 등록 실패: ${error.message}`);
    }
    throw new Error('참여자 정보가 등록되지 못했습니다.');
  }
};

export const getStoryCollaborators = async <T extends string | string[]>(
  storyId: T
) => {
  const query = instanceBaaS.from(DB_PATH.STORY_COLLABORATORS).select('*');

  if (Array.isArray(storyId)) {
    query.in('story_id', storyId);
  } else {
    query.eq('story_id', storyId);
  }

  const { data } = await query;

  return data;
};

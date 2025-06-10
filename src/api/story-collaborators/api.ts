import instanceBaaS from '../instanceBaaS';
import { DB_PATH } from '@/constants/apiPath';
import { CreateCollaboratorParams } from './type';

export const createCollaborator = async (params: CreateCollaboratorParams) => {
  const { data, role } = params;
  try {
    const { data: response, error } = await instanceBaaS
      .from(DB_PATH.STORY_COLLABORATORS)
      .insert({
        ...data,
        role,
      });
    if (error) throw new Error(error.message);

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('참여자 정보가 등록되지 못했습니다.');
  }
};

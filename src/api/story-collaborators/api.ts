import instanceBaaS from '../instanceBaaS';
import { DB_PATH } from '@/constants/apiPath';
import { CreateCollaboratorParams } from './type';

export const createCollaborator = async (params: CreateCollaboratorParams) => {
  const { data, role } = params;
  const response = await instanceBaaS.from(DB_PATH.STORY_COLLABORATORS).insert({
    ...data,
    role,
  });
  return response.data;
};

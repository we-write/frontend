import { TeamUserRole } from '@/types/teamUserRole';
import instanceBaaS from '../instanceBaaS';
import { CreateCollaboratorRequest } from './type';
import { DB_PATH } from '@/constants/apiPath';

export const createCollaborator = async (
  data: CreateCollaboratorRequest,
  role: TeamUserRole
) => {
  const response = await instanceBaaS.from(DB_PATH.STORY_COLLABORATORS).insert({
    ...data,
    role,
  });
  return response.data;
};

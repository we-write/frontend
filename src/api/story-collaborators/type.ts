import { TeamUserRole } from '@/types/teamUserRole';

export interface CreateCollaboratorRequest {
  story_id: string;
  user_id: number;
  user_name: string;
  joined_at: string;
}

export interface CreateCollaboratorParams {
  data: CreateCollaboratorRequest;
  role: TeamUserRole;
}

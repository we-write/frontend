import { TeamUserRole } from '@/types/teamUserRole';

export interface CollaboratorRequest {
  story_id: string;
  user_id: number;
  user_name: string;
  joined_at: string;
}

export interface CreateCollaboratorRequest {
  data: CollaboratorRequest;
  role: TeamUserRole;
}

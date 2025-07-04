import { StoryCollaborators } from '@/lib/supabase/custom-types';

export interface GetMySocialListParams {
  userId: StoryCollaborators['user_id'];
  offset: number;
  limit: number;
}

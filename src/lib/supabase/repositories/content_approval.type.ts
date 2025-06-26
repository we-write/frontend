import { ContentApproval } from '@/lib/supabase/custom-types';

export interface InsertContentApproveUserRequest {
  userId: ContentApproval['user_id'];
  contentId: ContentApproval['content_id'];
}

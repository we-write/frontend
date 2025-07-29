import { StoryLikes } from '@/lib/supabase/custom-types';

export interface getMyLikedSocialListParams {
  userId: StoryLikes['user_id'];
  offset: number;
  limit: number;
}

import { Database } from '@/lib/supabase/database.types';

export interface SocialDetailPageParams {
  storyId: string;
}

export interface SocialOverViewProps {
  currentUserId?: number;
  currentUserName?: string;
  currentStoryId: string;
}

export interface SummaryProps {
  currentUserId?: number;
  currentStoryId: string;
}

export interface UseSocialActionsParams {
  storyId: string;
  userId?: number;
  userName?: string;
}

export interface UseSocialDetailDataParams {
  storyId: string;
  userId?: number;
}

export interface UseManageSummaryParams {
  storyId: string;
  storiesData?: Database['public']['Tables']['Stories']['Insert'];
}

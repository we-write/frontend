import { Database } from '@/lib/supabase/database.types';

export interface StoryEntity {
  social_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre?: string;
  created_at: string;
  updated_at: string;
  approved_count: number;
  max_length: number;
  is_public: boolean;
  approval_period: number;
}

export type CreateStoryRequest =
  Database['public']['Tables']['Stories']['Insert'];

export interface GetContentsParams {
  storyId: string;
}

export interface PostContentRequest {
  userId: number;
  storyId: string;
  content: string;
}

export interface GetApproveUserParams {
  contentId: string;
}

export interface ApproveContentRequest {
  userId: number;
  contentId: string;
}

export interface GetStoriesParams {
  keyword: string;
  searchType: '제목';
  genres: string[];
  offset: number;
  limit: number;
}

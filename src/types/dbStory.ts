import { TeamUserRole } from './teamUserRole';

export interface DBStoryResponse {
  story_id: string;
  title: string;
  cover_image_url?: string;
  summary: string;
  genre: string;
  created_at: string;
  updated_at: string;
  max_length: number;
  approval_period: number;
  approved_count: number;
  capacity: number;
}

export interface DBContentResponse {
  content_id: string;
  content: string;
  user_id: number;
  story_id: string;
  status: 'PENDING' | 'MERGED' | 'WRITING';
  merged_at: string;
  created_at: string;
}

export interface DBContentApprovalResponse {
  content_id: string;
  user_id: number;
  approved_at: string;
}

export interface DBStoryCollaboratorsResponse {
  user_id: number;
  story_id: string;
  joined_at: string;
  role: TeamUserRole;
  user_name: string;
}

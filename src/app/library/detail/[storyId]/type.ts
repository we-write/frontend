import { Database } from '@/lib/supabase/database.types';

export interface WritableUserModalProps {
  currentStoryId: string;
  currentUserNickName?: string;
  currentUserId?: number;
  approvalPeriod: number;
  approvedCount: number;
  maxContentLength: number;
}

export interface CreateContentModalProps {
  currentStoryId: string;
  currentUserId?: number;
  lastContentData?: Database['public']['Tables']['Contents']['Row'];
  maxContentLength: number;
}

export interface PaginationControlProps {
  storyId: string;
  title: string;
  page: number;
  totalPage: number;
}

export interface UsePaginateContentsParams {
  contents?: { data: string[] };
  currentViewPortWidth?: number;
}

export interface ModalToSiginProps {
  isModalOpen: boolean;
  setFalse: () => void;
}

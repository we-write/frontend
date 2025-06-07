import { DBContentResponse } from '@/types/dbStory';

export interface WritableUserModalProps {
  currentChapter: number;
  currentStoryId: string;
  currentUserNickName?: string;
  currentUserId?: number;
  approvalPeriod: number;
  approvedCount: number;
}

export interface CreateStoryModalProps {
  currentChapter: number;
  currentStoryId: string;
  currentUserId?: number;
  lastContentData: DBContentResponse;
}

export interface RelayStoryContentFormData {
  content: string;
}

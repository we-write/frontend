import { DBContentResponse } from '@/types/dbStory';

export interface WritableUserModalProps {
  currentChapter: number;
  currentStoryId: string;
  currentUserNickName?: string;
  currentUserId?: number;
  approvalPeriod: number;
  approvedCount: number;
}

export interface CreateContentModalProps {
  currentChapter: number;
  currentStoryId: string;
  currentUserId?: number;
  lastContentData: DBContentResponse;
}

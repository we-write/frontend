export interface SocialDetailPageParams {
  socialId: string;
}

export interface SocialOverViewProps {
  currentSocialId: number;
  currentUserId?: number;
  currentUserName?: string;
  currentStoryId?: string;
}

export interface SummaryProps {
  currentSocialId: number;
  currentUserId?: number;
  currentStoryId?: string;
}

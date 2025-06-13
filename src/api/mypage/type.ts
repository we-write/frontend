import { LocationType, SocialType } from '@/api/social/type';

export interface GetJoinedSocialListParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}

export interface JoinedSocialResponse {
  id: string;
  type: SocialType | 'DALLAEMFIT';
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  createdBy: number;
  canceledAt: string | null;
  joinedAt: string;
  isCompleted: boolean;
  isReviewed: boolean;
}

export interface LeaveJoinSocialRequest {
  id: string;
}

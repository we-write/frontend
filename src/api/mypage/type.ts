import { LocationType, SocialType } from '@/api/social/type';

export interface MySocialResponse {
  teamId?: number;
  id?: number;
  type?: SocialType | 'DALLAEMFIT';
  name?: string;
  dateTime?: string;
  registrationEnd?: string;
  location?: LocationType;
  participantCount?: number;
  capacity?: number;
  image?: string;
  createdBy?: number;
  canceledAt?: string;
  joinedAt?: string;
  isCompleted?: boolean;
  isReviewed?: boolean;
}

export interface cancelJoinSocialRequest {
  teamId: string;
  id: number;
}

import { LocationType } from '@/api/social/type';

export interface GetSocialDetailParams {
  storyId: number;
}

export interface GetSocialDetailResponse {
  teamId: 0;
  id: 0;
  type: string;
  name: string;
  dateTime: string;
  registrationEnd: string;
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string;
  cancledAt: null;
}

export interface GetTeamsParticipantsParams {
  storyId: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface GetTeamsParticipantsResponse {
  teamId: string;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: {
    id?: number;
    email: string;
    name: string;
    companyName: string;
    image: string | null;
  };
}

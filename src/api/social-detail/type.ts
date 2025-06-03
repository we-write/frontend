import { LocationType } from '@/api/social/type';

export interface GetSocialDetailParams {
  socialId: number;
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
  socialId: number;
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

export interface SaveSummaryParams {
  socialId: number;
  summaryHtml: string;
}

export interface GetSummaryParams {
  socialId: number;
}

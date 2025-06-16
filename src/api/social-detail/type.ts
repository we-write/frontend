import { LocationType } from '@/api/social/type';
import { useDeleteSocialByDbParams } from '@/hooks/api/teams/useDeleteSocialByDb';

export interface GetSocialDetailParams {
  socialId: number;
}

export interface GetSocialDetailResponse {
  teamId: number;
  id: number;
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

export interface SaveSummaryRequest {
  socialId: number;
  summaryHtml: string;
}

export interface GetSummaryParams {
  socialId: number;
}

export interface GetUserRoleParams {
  userId: number;
  storyId: string;
}

export interface GetStoryIdParams {
  socialId: number;
}

export interface GetStoryIdResponse {
  story_id: string;
}

export type DeleteSocialByDbParams = useDeleteSocialByDbParams;

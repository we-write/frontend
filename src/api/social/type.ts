export const LOCATION_GENRE_MAP = {
  건대입구: '판타지',
  을지로3가: '로맨스',
  신림: '스릴러/미스터리',
  홍대입구: '무협',
} as const;

export type LocationType = keyof typeof LOCATION_GENRE_MAP;
export type GenreType = (typeof LOCATION_GENRE_MAP)[LocationType];

export type SocialType = 'OFFICE_STRETCHING' | 'MINDFULLNESS' | 'WORKATION';

export interface GetSocialListParams {
  id?: string;
  type?: SocialType | 'DALLAMEFIT';
  location?: LocationType;
  date?: string;
  createdBy?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'participantCount';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface CreateWriteRequest {
  location: LocationType; //장르
  name: string; //스토리명
  type: SocialType; //미정
  capacity: number; //모집 정원
  image: File | null; //이미지
  dateTime: string; //시작날짜
  registrationEnd: string; //마감날짜
}

export interface CreateWriteResponse {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SocialResponse extends Omit<CreateWriteRequest, 'image'> {
  id: string;
  teamId: string;
  name: string;
  participantCount: number;
  image: string;
  createdBy: number;
  canceledAt: string;
}

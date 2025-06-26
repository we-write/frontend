export const GENRE_LOCATION_MAP = {
  판타지: '건대입구',
  로맨스: '을지로3가',
  '스릴러/미스터리': '신림',
  무협: '홍대입구',
} as const;

export type GenreType = keyof typeof GENRE_LOCATION_MAP;
export type LocationType = (typeof GENRE_LOCATION_MAP)[GenreType];

export const getLocationByGenre = (genre: GenreType): LocationType => {
  return GENRE_LOCATION_MAP[genre];
};

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

// 코드잇에서 제공하는 모임 필드 타입
export interface CodeitSocialFieldsRequest {
  name: string;
  type: SocialType;
  location: LocationType;
  capacity: number;
  image: File | null;
  dateTime: string;
  registrationEnd: string;
}

// we-write가 사용하는 모임 필드 타입
export interface SocialFieldsRequest {
  title: string;
  genre: GenreType;
  capacity: number;
  image: File | null;
  registrationEnd: string;
}

// 전체 요청 타입
export interface CreateSocialResponse {
  canceledAt: null;
  capacity: number;
  createdBy: number;
  dateTime: string;
  id: number;
  image: string;
  location: LocationType;
  name: string;
  participantCount: number;
  registrationEnd: string;
  teamId: string;
}

export interface GetSocialResponse
  extends Omit<CodeitSocialFieldsRequest, 'image' | 'location'> {
  id: number;
  teamId: string;
  name: string;
  participantCount: number;
  image: string;
  createdBy: number;
  canceledAt: string;
  location: LocationType;
}

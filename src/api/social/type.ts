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

export const getGenreByLocation = (location: LocationType): GenreType => {
  return Object.entries(GENRE_LOCATION_MAP).find(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    ([_, value]) => value === location
  )?.[0] as GenreType;
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

export interface CreateWriteRequest {
  location: GenreType; //장르
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

export interface SocialResponse
  extends Omit<CreateWriteRequest, 'image' | 'location'> {
  id: string;
  teamId: string;
  name: string;
  participantCount: number;
  image: string;
  createdBy: number;
  canceledAt: string;
  location: LocationType;
}

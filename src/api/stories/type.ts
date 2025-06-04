export interface GetContentsProps {
  id: string;
  page: number;
  limit: number;
}
export type GenreType = '판타지' | '로맨스' | '스릴러/미스터리' | '무협';

export const GENRE_LIST: GenreType[] = [
  '판타지',
  '로맨스',
  '스릴러/미스터리',
  '무협',
] as const;

export type LibraryResponse = {
  approved_count: number;
  cover_image_url: string | null;
  created_at: string;
  genre: GenreType;
  max_length: number;
  social_id: number;
  story_id: string;
  summary: string;
  title: string;
  updated_at: string;
};

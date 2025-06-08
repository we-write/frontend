export interface GetContentsProps {
  id: string;
  page: number;
  limit: number;
}

export interface GetStoriesParams {
  keyword: string;
  searchType: '제목' | '소개글';
  genres: string[];
  offset: number;
  limit: number;
}

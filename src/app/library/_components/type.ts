import { GenreType } from '@/api/social/type';
import { Database } from '@/lib/supabase/database.types';

export interface FormValues {
  search: string;
}

export interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}
export interface LibraryListContainerProps {
  keyword: string;
  searchType: '제목';
  genres: string[];
}

export interface LibraryListGridProps {
  stories: Database['public']['Tables']['Stories']['Row'][];
  imagePriorityThershold: number;
}
export interface GenreBadgeProps {
  selectedGenres: string[];
  dispatchSelectedGenres: (genres: string[]) => void;
}

export type GenreTypeWithAll = '전체' | GenreType;

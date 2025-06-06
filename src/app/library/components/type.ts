export interface SearchInputProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}
export interface LibraryListGridProps {
  keyword: string;
  searchType: '제목' | '소개글';
  genres: string[];
}

export interface BadgeGroupProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

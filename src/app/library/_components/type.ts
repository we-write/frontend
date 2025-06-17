export interface FormValues {
  search: string;
}

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

interface Story {
  story_id: string;
  title: string;
  genre: string;
  summary: string;
  cover_image_url?: string;
}

export interface StoryGridProps {
  stories: Story[];
}

export interface BadgeGroupProps {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}

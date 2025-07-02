import { GenreType } from '@/api/social/type';

export const TAB_TYPES = ['joined', 'created', 'liked'] as const;
export type TabType = (typeof TAB_TYPES)[number];

export interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export interface LikedStoryResponse {
  capacity: number;
  collaborator_count: number;
  cover_image_url: string;
  genre: string;
  liked_at: string;
  story_id: string;
  title: string;
}

export interface MySocialResponse {
  capacity: number;
  cover_image_url: string;
  genre: GenreType;
  title: string;
  collaborator_count: number;
  joined_at: string;
  role: 'LEADER' | 'MEMBER' | 'GUEST';
  story_id: string;
}

export interface MySocialListCardItemProps {
  item: MySocialResponse | LikedStoryResponse;
  activeTab: TabType;
  refetch: () => void;
}

export interface MySocialListCardProps {
  list: (LikedStoryResponse | MySocialResponse)[];
  activeTab: TabType;
  refetch: () => void;
}

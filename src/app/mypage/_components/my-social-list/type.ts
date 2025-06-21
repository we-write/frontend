export const TAB_TYPES = ['joined', 'created', 'liked'] as const;

export type TabType = (typeof TAB_TYPES)[number];
export interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export interface SocialItem {
  id: number;
  name: string;
  image: string;
  location: string;
  registrationEnd: string;
  capacity: number;
  canceledAt: string | null;
}

export interface LikedStoryItem {
  story_id: string;
  social_id: number;
  title: string;
  genre: string;
  cover_image_url: string;
  approved_count: number;
  capacity?: number;
}

export interface MySocialListCardItemLikedProps {
  item: LikedStoryItem;
}

export interface MySocialListItemProps {
  item: SocialItem;
  activeTab: TabType;
  refetch: () => void;
}

export interface MySocialListCardProps {
  list: LikedStoryItem[] | SocialItem[];
  activeTab: TabType;
  refetch: () => void;
}

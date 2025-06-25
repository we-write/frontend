import { JoinedSocialResponse } from '@/api/mypage/type';
import { GetSocialResponse } from '@/api/social/type';

export type TabType = 'joined' | 'created';

export interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

type SocialItem = JoinedSocialResponse | GetSocialResponse;

export interface MySocialListCardProps {
  list: SocialItem[];
  activeTab: TabType;
  refetch: () => void;
}

export interface MySocialListItemProps {
  item: MySocialListCardProps['list'][0];
  activeTab: string;
  refetch: () => void;
}

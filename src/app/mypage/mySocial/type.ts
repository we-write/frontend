import { JoinedSocialResponse } from '@/api/mypage/type';
import { SocialResponse } from '@/api/social/type';

export type TabType = 'joined' | 'created';

export interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

type SocialItem = JoinedSocialResponse | SocialResponse;

export interface SocialListCardsProps {
  list: SocialItem[];
  activeTab: TabType;
  refetch: () => void;
}

export interface SocialCardItemProps {
  item: SocialListCardsProps['list'][0];
  activeTab: string;
  refetch: () => void;
}

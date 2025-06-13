import { JoinedSocialResponse } from '@/api/mypage/type';
import { GetSocialResponse } from '@/api/social/type';

export type TabType = 'joined' | 'created';

export interface TabMenuProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

type SocialItem = JoinedSocialResponse | GetSocialResponse;

export interface SocialListCardsProps {
  list: SocialItem[];
  activeTab: TabType;
  refetch: () => void;
}

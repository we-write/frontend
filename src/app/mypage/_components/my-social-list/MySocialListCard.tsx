import MySocialListCardItemLiked from '@/app/mypage/_components/my-social-list/MySocialListItemLiked';
import MySocialListCardItemGeneral from './MySocialListCardItemGeneral';
import { LikedStoryItem, MySocialListCardProps, SocialItem } from './type';

const MySocialListCard = ({
  list,
  activeTab,
  refetch,
}: MySocialListCardProps) => {
  return (
    <>
      {list.map((item, index) =>
        activeTab === 'liked' ? (
          <MySocialListCardItemLiked
            key={`liked-${(item as LikedStoryItem).story_id}`}
            item={item as LikedStoryItem}
          />
        ) : (
          <MySocialListCardItemGeneral
            key={`social-${(item as SocialItem).id ?? index}`}
            item={item as SocialItem}
            activeTab={activeTab}
            refetch={refetch}
          />
        )
      )}
    </>
  );
};

export default MySocialListCard;

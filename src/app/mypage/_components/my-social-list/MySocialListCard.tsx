import { MySocialListCardProps } from './type';
import MySocialListCardItem from '@/app/mypage/_components/my-social-list/MySocialListCardItem';

const MySocialListCard = ({
  list,
  activeTab,
  refetch,
}: MySocialListCardProps) => {
  return (
    <>
      {list.map((item, index) => (
        <MySocialListCardItem
          key={`${item.story_id}-${index}`}
          item={item}
          activeTab={activeTab}
          refetch={refetch}
        />
      ))}
    </>
  );
};

export default MySocialListCard;

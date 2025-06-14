import MySocialListCardItem from '@/app/mypage/_components/my-social-list/MySocialListCardItem';
import { MySocialListCardProps } from './type';

const MySocialListCard = ({
  list,
  activeTab,
  refetch,
}: MySocialListCardProps) => {
  return (
    <>
      {list.map((item) => (
        <MySocialListCardItem
          key={`${activeTab}-${item.id}`}
          item={item}
          activeTab={activeTab}
          refetch={refetch}
        />
      ))}
    </>
  );
};

export default MySocialListCard;

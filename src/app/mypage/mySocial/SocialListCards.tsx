import SocialCardItem from "@/app/mypage/mySocial/SocialCardItem";
import { SocialListCardsProps } from "@/app/mypage/mySocial/type";

const SocialListCards = ({ list, activeTab, refetch }: SocialListCardsProps) => {
  return (
    <>
      {list.map((item) => (
        <SocialCardItem
          key={`${activeTab}-${item.id}`}
          item={item}
          activeTab={activeTab}
          refetch={refetch}
        />
      ))}
    </>
  );
};

export default SocialListCards;
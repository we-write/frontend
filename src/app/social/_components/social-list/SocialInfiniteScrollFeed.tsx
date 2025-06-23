import { SocialListProps } from '../type';
import useGetSocialList from '@/hooks/api/social/useGetSocialList';
import Observer from '@/components/common/Observer/Observer';
import SocialListGrid from './SocialListGrid';

const SocialInfiniteScrollFeed = ({ filter }: SocialListProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetSocialList(filter);

  console.log(data);

  const socialList = data?.pages.flat() ?? [];

  return (
    <>
      <SocialListGrid socialList={socialList} isLoading={isLoading} />
      <Observer
        enabled={hasNextPage && !!socialList.length}
        onIntersect={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
      />
    </>
  );
};

export default SocialInfiniteScrollFeed;

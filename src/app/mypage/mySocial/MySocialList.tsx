'use client';
import { getJoinedSocialList } from '@/api/mypage/api';
import { getSocialList } from '@/api/social/api';
import LoadingListCards from '@/app/mypage/mySocial/LoadingListCard';
import SocialListCards from '@/app/mypage/mySocial/SocialListCards';
import TabMenu from '@/app/mypage/mySocial/TabMenu';
import { TabType } from '@/app/mypage/mySocial/type';
import Observer from '@/components/common/Observer/Observer';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const FETCH_LIMIT = 12;

const MySocialList = () => {
  const [activeTab, setActiveTab] = useState<TabType>('joined');
  const { data: myInfo, isLoading: isMyInfoLoading } = useGetMyInfo();
  const userId = myInfo?.id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: isSocialListLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['mySocialList', activeTab, userId],
    enabled: !!userId,
    queryFn: async ({ pageParam = 0 }) => {
      const filter = {
        limit: FETCH_LIMIT,
        offset: pageParam,
        ...(activeTab === 'created' && { createdBy: userId }),
      };

      return activeTab === 'joined'
        ? await getJoinedSocialList(filter)
        : await getSocialList(filter);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === FETCH_LIMIT
        ? allPages.length * FETCH_LIMIT
        : undefined,
    initialPageParam: 0,
  });

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const flattenedList = data?.pages.flat() || [];

  const isLoading = isMyInfoLoading || isSocialListLoading;

  return (
    <div className="mt-[30px] w-full border-t-2 border-gray-900 p-6">
      <TabMenu activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="min-h-[50vh] w-full">
        {isLoading && <LoadingListCards />}

        {!isLoading && flattenedList.length === 0 && (
          <p className="py-6 pt-[20vh] text-center text-gray-500">
            {activeTab === 'joined'
              ? '내가 참여한 모임이 아직 없어요'
              : '내가 만든 모임이 아직 없어요'}
          </p>
        )}

        {!isLoading && flattenedList.length > 0 && (
          <SocialListCards
            list={flattenedList}
            activeTab={activeTab}
            refetch={refetch}
          />
        )}

        <Observer
          enabled={hasNextPage && !isFetching}
          onIntersect={() => fetchNextPage()}
          threshold={0.1}
        />
      </div>
    </div>
  );
};

export default MySocialList;

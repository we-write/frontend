'use client';

import LoadingListCards from '@/app/mypage/mySocial/LoadingListCard';
import SocialListCards from '@/app/mypage/mySocial/SocialListCards';
import TabMenu from '@/app/mypage/mySocial/TabMenu';
import { TabType } from '@/app/mypage/mySocial/type';
import Observer from '@/components/common/Observer/Observer';
import { useState } from 'react';
import { useMySocialList } from '@/hooks/mypage/useMySocialList';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';

const MySocialList = () => {
  const [activeTab, setActiveTab] = useState<TabType>('joined');
  const { myInfo, queryMethods } = useAuth();
  const userId = myInfo?.id;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading: isSocialListLoading,
    refetch,
  } = useMySocialList(activeTab, String(userId));

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const flattenedList = data?.pages.flat() || [];

  const isLoading = queryMethods.isLoading || isSocialListLoading;

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

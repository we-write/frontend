'use client';
import ListCard from '@/components/common/Card/ListCard';
import { useGetMySocialList } from '@/hooks/api/social/useGetMySocialList';
import { useGetMyInfo } from '@/hooks/api/users/useGetMyInfo';
import { useCancelJoinSocial } from '@/hooks/api/social/useCancelJoinSocial';
import { useEffect, useRef, useState, useMemo } from 'react';
import Observer from '@/components/common/Observer/Observer';

const TABS = ['나의 모임', '내가 만든 모임'] as const;
const PAGE_SIZE = 10;

const MySocialList = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('나의 모임');
  const [page, setPage] = useState(1);
  const pageRef = useRef<number>(1);

  const { data: userInfo } = useGetMyInfo();
  const { data: mySocials } = useGetMySocialList();

  const filteredList = useMemo(() => {
    if (!mySocials?.data) return [];
    return mySocials.data.filter((item) =>
      activeTab === '내가 만든 모임' ? item.createdBy === userInfo?.id : true
    );
  }, [mySocials?.data, activeTab, userInfo?.id]);

  const visibleList = useMemo(() => {
    return filteredList.slice(0, page * PAGE_SIZE);
  }, [filteredList, page]);

  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // 모임 취소 기능
  const handleCancelJoinSocial = useCancelJoinSocial();
  // 무힌 스크롤 기능
  const handleIntersect = () => {
    const hasMore = page * PAGE_SIZE < filteredList.length;
    if (hasMore) {
      setPage((prev) => {
        const next = prev + 1;
        pageRef.current = next;
        return next;
      });
    }
  };

  const renderEmptyMessage = () => (
    <span className="text-sm font-medium text-gray-500">
      {activeTab === '내가 만든 모임'
        ? '내가 만든 모임이 아직 없어요'
        : '신청한 모임이 아직 없어요'}
    </span>
  );

  const renderList = () =>
    visibleList.map((item, index) => {
      const isLeader = item?.createdBy === userInfo?.id;

      return (
        <div
          key={item.id}
          className={`border-dashed py-6 ${
            index === visibleList.length - 1
              ? 'border-b-0'
              : 'border-b-2 border-gray-200'
          }`}
        >
          <ListCard
            teamUserRole={isLeader ? 'LEADER' : 'MEMBER'}
            pageId={item.id.toString()}
            image={{ src: item.image, alt: item.name }}
            chip
            textContent={{
              title: item.name,
              genre: item.type,
              participantCount: item.participantCount,
              capacity: item.capacity,
            }}
            endDate={item.registrationEnd}
            isCardDataLoading={false}
            isCompletedStory={item.isCompleted}
            isCanceled={item.canceledAt !== null}
            handleButtonClick={() => {
              handleCancelJoinSocial.mutate({
                teamId: item.teamId,
                id: item.id,
              });
            }}
          />
        </div>
      );
    });

  return (
    <div className="mt-[30px] flex w-full flex-1 flex-col border-t-2 border-gray-900 bg-white p-6 text-lg font-semibold">
      <ul className="flex gap-3 text-gray-400">
        {TABS.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex cursor-pointer flex-col items-center"
          >
            <span className={activeTab === tab ? 'text-gray-900' : ''}>
              {tab}
            </span>
            <div
              className={`mt-1 h-[2px] w-full transition-all ${activeTab === tab ? 'bg-gray-900' : 'bg-transparent'}`}
            />
          </li>
        ))}
      </ul>

      <div className="flex-center min-h-[50vh] flex-1 flex-col">
        {filteredList.length === 0 ? renderEmptyMessage() : renderList()}
        {filteredList.length > visibleList.length && (
          <Observer onIntersect={handleIntersect} className="h-6" />
        )}
      </div>
    </div>
  );
};

export default MySocialList;

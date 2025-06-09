import React from 'react';
import { SocialListGridProps, SocialListProps } from './type';
import { useGetSocialList } from '@/hooks/api/social';
import Observer from '@/components/common/Observer/Observer';
import { convertLocationToGenre } from '@/utils/convertLocationToGenre';
import GridCard from '@/components/common/Card/GridCard';
import htmlToString from '@/utils/htmlToString';
import useGetSocialSummary from '@/hooks/api/stories/useGetSocialSummary';

const SocialListGrid = ({ socialList, isLoading }: SocialListGridProps) => {
  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetSocialSummary(socialList);

  if (!isLoading && socialList.length === 0) {
    return (
      <div className="space-y-1 text-center text-base text-gray-500">
        <p>아직 모임이 없어요,</p>
        <p>지금 바로 모임을 만들어보세요</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {socialList.map((item, index) => (
        <GridCard
          key={item.id}
          pageId={item.id}
          image={{
            src:
              item.image ||
              'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
            alt: `${item.name || '비어있는'} 섬네일 이미지`,
          }}
          textContent={{
            title: item.name || '제목 없음',
            genre:
              convertLocationToGenre({ location: item.location }) ||
              '장르 없음',
            description:
              summaryData && summaryData[index]
                ? htmlToString(summaryData[index])
                : '모임장이 소개글을 작성하고 있어요!',
          }}
          isCardDataLoading={isLoading || isSummaryLoading}
        />
      ))}
    </div>
  );
};

const SocialList = ({ filter }: SocialListProps) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetSocialList(filter);

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

export default SocialList;

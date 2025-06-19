import useGetSocialSummary from '@/hooks/api/supabase/stories/useGetSocialSummary';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import htmlToString from '@/utils/htmlToString';
import { SocialListGridProps } from '@/app/social/_components/type';
import GridCard from '@/components/common/Card/GridCard';
import { APP_ROUTES } from '@/constants/appRoutes';
import useCurrentViewPort from '@/hooks/useCurrentViewPort';
import { VIEWPORT_BREAK_POINT } from '@/constants/viewportBreakPoint';

const IMAGE_PRIORITY_THRESHOLD_BELOW_MD = 2;
const IMAGE_PRIORITY_THRESHOLD_AND_UP = 9;

const SocialListGrid = ({ socialList, isLoading }: SocialListGridProps) => {
  const { data: summaryData, isLoading: isSummaryLoading } =
    useGetSocialSummary(socialList);

  const { viewportWidth: currentViewPortWidth } = useCurrentViewPort();
  const currentImagePriorityThershold =
    currentViewPortWidth && currentViewPortWidth >= VIEWPORT_BREAK_POINT.MD
      ? IMAGE_PRIORITY_THRESHOLD_AND_UP
      : IMAGE_PRIORITY_THRESHOLD_BELOW_MD;

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
          href={`${APP_ROUTES.social}/detail/${item.id}`}
          key={item.id}
          image={{
            src:
              item.image ||
              'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
            alt: `${item.name || '비어있는'} 섬네일 이미지`,
            index: index,
            priorityThreshold: currentImagePriorityThershold,
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

export default SocialListGrid;

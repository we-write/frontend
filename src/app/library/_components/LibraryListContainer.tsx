import LibraryListGrid from '@/app/library/_components/LibraryListGrid';
import LibraryListSkeleton from '@/app/library/_components/LibraryListSkeleton';
import { LibraryListContainerProps } from '@/app/library/_components/type';
import Observer from '@/components/common/Observer/Observer';
import { VIEWPORT_BREAK_POINT } from '@/constants/viewportBreakPoint';
import { useInfiniteStories } from '@/hooks/api/library/useInfiniteStories';
import useCurrentViewPort from '@/hooks/useCurrentViewPort';

const IMAGE_PRIORITY_THRESHOLD_BELOW_MD = 2;
const IMAGE_PRIORITY_THRESHOLD_MD_AND_UP = 9;

const LibraryListContainer = ({
  keyword,
  searchType,
  genres,
}: LibraryListContainerProps) => {
  const { viewportWidth: currentViewPortWidth } = useCurrentViewPort();
  const currentImagePriorityThershold =
    currentViewPortWidth && currentViewPortWidth >= VIEWPORT_BREAK_POINT.MD
      ? IMAGE_PRIORITY_THRESHOLD_MD_AND_UP
      : IMAGE_PRIORITY_THRESHOLD_BELOW_MD;

  const {
    data: stories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStories(keyword ?? '', searchType, genres);

  const flatStories = stories?.pages.flat() || [];

  if (isLoading) {
    return <LibraryListSkeleton />;
  }

  if (!stories || flatStories.length === 0) {
    return (
      <div className="flex-center text-base text-gray-500">
        {keyword.trim() === '' ? (
          <p>아직 스토리가 없어요</p>
        ) : (
          <p>검색된 스토리가 없어요</p>
        )}
      </div>
    );
  }

  return (
    <>
      <LibraryListGrid
        stories={flatStories}
        imagePriorityThershold={currentImagePriorityThershold}
      />

      <Observer
        enabled={hasNextPage && !isFetchingNextPage}
        onIntersect={fetchNextPage}
        threshold={0.1}
      />
    </>
  );
};

export default LibraryListContainer;

import LibraryListGrid from '@/app/library/_components/LibraryListGrid';
import LibraryListSkeleton from '@/app/library/_components/LibraryListSkeleton';
import { LibraryListGridProps } from '@/app/library/_components/type';
import Observer from '@/components/common/Observer/Observer';
import { useInfiniteStories } from '@/hooks/api/library/useInfiniteStories';

const FETCH_GET_ITEM_LIMIT = 12;

const LibraryListContainer = ({
  keyword,
  searchType,
  genres,
}: LibraryListGridProps) => {
  const {
    data: stories,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteStories(
    keyword ?? '',
    searchType,
    genres,
    FETCH_GET_ITEM_LIMIT
  );

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
      <LibraryListGrid stories={flatStories} />

      <Observer
        enabled={hasNextPage && !isFetchingNextPage}
        onIntersect={fetchNextPage}
        threshold={0.1}
      />
    </>
  );
};

export default LibraryListContainer;

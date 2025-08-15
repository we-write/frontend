import { render, screen } from '@testing-library/react';
import LibraryListContainer from '@/app/library/_components/LibraryListContainer';
import { LibraryListContainerProps } from '@/app/library/_components/type';

interface Story {
  id: number;
  title: string;
}

jest.mock('@/hooks/api/library/useInfiniteStories', () => ({
  useInfiniteStories: jest.fn(),
}));
jest.mock('@/hooks/useCurrentViewPort', () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock('@/app/library/_components/LibraryListGrid', () => ({
  __esModule: true,
  default: ({ stories }: { stories: Story[] }) => (
    <div data-testid="library-list-grid">
      {stories.map((s) => (
        <div key={s.id}>{s.title}</div>
      ))}
    </div>
  ),
}));
jest.mock('@/app/library/_components/LibraryListSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton">로딩중...</div>,
}));
jest.mock('@/components/common/Observer/Observer', () => ({
  __esModule: true,
  default: ({ enabled }: { enabled: boolean }) => (
    <div data-testid="observer">{enabled ? 'enabled' : 'disabled'}</div>
  ),
}));

import { useInfiniteStories } from '@/hooks/api/library/useInfiniteStories';
import useCurrentViewPort from '@/hooks/useCurrentViewPort';
import { VIEWPORT_BREAK_POINT } from '@/constants/viewportBreakPoint';

describe('LibraryListContainer', () => {
  const mockUseInfiniteStories = useInfiniteStories as jest.Mock;
  const mockUseCurrentViewPort = useCurrentViewPort as jest.Mock;

  const defaultProps: LibraryListContainerProps = {
    keyword: '',
    searchType: '제목',
    genres: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseCurrentViewPort.mockReturnValue({
      viewportWidth: (VIEWPORT_BREAK_POINT.LG + VIEWPORT_BREAK_POINT.XL) / 2,
    });
  });

  const setup = (
    storyData?: Story[],
    options?: Partial<ReturnType<typeof useInfiniteStories>>
  ) => {
    mockUseInfiniteStories.mockReturnValue({
      data: storyData ? { pages: [storyData] } : { pages: [[]] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: !storyData,
      ...options,
    });

    return render(<LibraryListContainer {...defaultProps} />);
  };

  it('로딩 상태일 때 Skeleton을 렌더링한다', () => {
    setup(undefined, { isLoading: true });
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('스토리가 없고 keyword가 빈 문자열이면 "아직 스토리가 없어요" 메시지를 표시한다', () => {
    setup([]);
    expect(screen.getByText('아직 스토리가 없어요')).toBeInTheDocument();
  });

  it('스토리가 없고 keyword가 있으면 "검색된 스토리가 없어요" 메시지를 표시한다', () => {
    render(
      <LibraryListContainer keyword="테스트" searchType="제목" genres={[]} />
    );
    mockUseInfiniteStories.mockReturnValue({
      data: { pages: [[]] },
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
      isLoading: false,
    });

    expect(screen.getByText('검색된 스토리가 없어요')).toBeInTheDocument();
  });

  it('스토리가 있으면 LibraryListGrid와 Observer를 렌더링한다', () => {
    setup([{ id: 1, title: 'Story 1' }], { hasNextPage: true });
    expect(screen.getByTestId('library-list-grid')).toBeInTheDocument();
    expect(screen.getByTestId('observer')).toHaveTextContent('enabled');
    expect(screen.getByText('Story 1')).toBeInTheDocument();
  });

  it('hasNextPage가 false이면 Observer가 disabled 상태로 렌더링된다', () => {
    setup([{ id: 1, title: 'Story 1' }], { hasNextPage: false });
    expect(screen.getByTestId('observer')).toHaveTextContent('disabled');
  });
});

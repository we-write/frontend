import { render, screen } from '@testing-library/react';
import GenreBadge from '@/app/library/_components/GenreBadge';

describe('GenreBadge 테스트', () => {
  const mockDispatch = jest.fn();

  const setup = (selectedGenres: string[] = []) => {
    mockDispatch.mockClear();
    render(
      <GenreBadge
        dispatchSelectedGenres={mockDispatch}
        selectedGenres={selectedGenres}
      />
    );
  };
  it('모든 장르 버튼이 렌더링됨', () => {
    setup();
    ['전체', '판타지', '로맨스', '스릴러/미스터리', '무협'].forEach((genre) => {
      expect(screen.getByRole('button', { name: genre })).toBeInTheDocument();
    });
  });

  it('"판타지" 배지를 클릭하면 ["판타지"]로 dispatch', () => {
    setup();
    const fantasyBadge = screen.getByRole('button', { name: '판타지' });
    fantasyBadge.click();
    expect(mockDispatch).toHaveBeenCalledWith(['판타지']);
  });

  it('선택된 장르는 active 스타일이 적용됨', () => {
    setup(['판타지']);
    const fantasyBadge = screen.getByRole('button', { name: '판타지' });
    expect(fantasyBadge).toHaveClass('bg-black', 'text-white');
  });
});

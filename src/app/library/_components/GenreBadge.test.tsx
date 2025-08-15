import { render, screen, fireEvent } from '@testing-library/react';
import GenreBadge, { GENRES } from '@/app/library/_components/GenreBadge';

describe('GenreBadge 테스트', () => {
  const mockDispatch = jest.fn();
  let buttons: HTMLElement[];

  const setup = (selectedGenres: string[] = []) => {
    render(
      <GenreBadge
        dispatchSelectedGenres={mockDispatch}
        selectedGenres={selectedGenres}
      />
    );
    buttons = screen.getAllByRole('button');
  };

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('모든 장르 버튼이 렌더링됨', () => {
    setup();
    const buttonLabels = buttons.map((btn) => btn.textContent);
    expect(buttonLabels).toEqual(GENRES);
  });

  it('"판타지" 배지를 클릭하면 ["판타지"]로 dispatch', () => {
    setup();
    const fantasyBadge = buttons.find((btn) => btn.textContent === '판타지')!;
    fireEvent.click(fantasyBadge);
    expect(mockDispatch).toHaveBeenCalledWith(['판타지']);
  });

  it('선택된 장르는 aria-pressed=true', () => {
    setup(['판타지']);
    const fantasyBadge = screen.getByRole('button', { name: '판타지' });
    expect(fantasyBadge).toHaveAttribute('aria-pressed', 'true');
  });
});

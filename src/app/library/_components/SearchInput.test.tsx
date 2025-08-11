import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '@/app/library/_components/SearchInput';

describe('SearchInput 테스트', () => {
  const mockSetKeyword = jest.fn();
  const mockOnSearch = jest.fn();

  const setup = (keyword = '') => {
    mockSetKeyword.mockClear();
    mockOnSearch.mockClear();
    render(
      <SearchInput
        keyword={keyword}
        setKeyword={mockSetKeyword}
        onSearch={mockOnSearch}
      />
    );
  };

  it('초기 렌더링 시 입력창에 keyword 값이 반영된다', () => {
    setup('초기값');
    const input = screen.getByLabelText(
      '스토리 제목으로 검색'
    ) as HTMLInputElement;
    expect(input.value).toBe('초기값');
  });

  it('검색어를 입력하면 setKeyword가 호출된다', () => {
    setup();
    const input = screen.getByLabelText('스토리 제목으로 검색');
    fireEvent.change(input, { target: { value: '천마재림' } });

    expect(mockSetKeyword).toHaveBeenCalledWith('천마재림');
  });

  it('검색어 입력 시 초기화 버튼이 나타난다', () => {
    setup();
    const input = screen.getByLabelText('스토리 제목으로 검색');
    fireEvent.change(input, { target: { value: '천마재림' } });

    expect(screen.getByLabelText('검색어 초기화')).toBeInTheDocument();
  });

  it('검색어를 입력하고 엔터키를 눌렀을 때 onSearch가 호출된다', () => {
    setup();
    const input = screen.getByLabelText('스토리 제목으로 검색');

    fireEvent.change(input, { target: { value: '천마재림' } });
    // typescript Non-null 처리
    fireEvent.submit(input.closest('form')!);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('검색어를 입력하고 검색 버튼을 클릭했을 때 onSearch가 호출된다', () => {
    setup();
    const input = screen.getByLabelText('스토리 제목으로 검색');
    const searchButton = screen.getByLabelText('검색');

    fireEvent.change(input, { target: { value: '천마재림' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('초기화 버튼 클릭 시 setKeyword가 빈 문자열로 호출되고 입력값이 비워진다', () => {
    setup('천마재림');
    const clearButton = screen.getByLabelText('검색어 초기화');
    fireEvent.click(clearButton);

    expect(mockSetKeyword).toHaveBeenCalledWith('');
    const input = screen.getByLabelText(
      '스토리 제목으로 검색'
    ) as HTMLInputElement;
    expect(input.value).toBe('');
  });

  it('검색어가 비워질 때 onSearch가 자동 호출된다', () => {
    setup('천마재림');
    const input = screen.getByLabelText('스토리 제목으로 검색');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockOnSearch).toHaveBeenCalled();
  });
});

'use client';

import BadgeGroup from '@/app/library/components/BadgeGroup';
import LibraryListGrid from '@/app/library/components/LibraryListGrid';
import SearchInput from '@/app/library/components/SearchInput';
import useSearchReducer from '@/hooks/library/useSearchReducer';

export default function Library() {
  const [state, dispatch] = useSearchReducer();

  const handleSearch = () => {
    if (!state.inputKeyword.trim() && !state.searchKeyword) return;
    dispatch({
      type: 'SET_SEARCH_KEYWORD',
      payload: state.inputKeyword.trim(),
    });
  };

  return (
    <>
      <div className="mx-auto mb-25 max-w-[1000px] border-b-2 border-gray-200 pb-4">
        <SearchInput
          keyword={state.inputKeyword}
          setKeyword={(keyword) =>
            dispatch({ type: 'SET_INPUT_KEYWORD', payload: keyword })
          }
          onSearch={handleSearch}
        />
        <BadgeGroup
          selectedGenres={state.selectedGenres}
          setSelectedGenres={(genres) =>
            dispatch({ type: 'SET_SELECTED_GENRES', payload: genres })
          }
        />
      </div>
      <LibraryListGrid
        keyword={state.searchKeyword}
        searchType={state.searchType}
        genres={state.selectedGenres}
      />
    </>
  );
}

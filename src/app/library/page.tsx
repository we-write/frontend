'use client';

import GenreBadge from '@/app/library/_components/GenreBadge';
import LibraryListContainer from '@/app/library/_components/LibraryListContainer';
import SearchInput from '@/app/library/_components/SearchInput';
import useSearchReducer from '@/hooks/api/library/useSearchReducer';

const Library = () => {
  const [state, dispatch] = useSearchReducer();

  const handleSearch = () => {
    if (!state.inputKeyword.trim() && !state.searchKeyword) return;
    dispatch({
      type: 'DISPATCH_SEARCH_KEYWORD',
      payload: state.inputKeyword.trim(),
    });
  };

  return (
    <>
      <div className="mx-auto mb-25 max-w-[1000px] border-b-2 border-gray-200 pb-4">
        <SearchInput
          keyword={state.inputKeyword}
          setKeyword={(keyword) =>
            dispatch({ type: 'DISPATCH_INPUT_KEYWORD', payload: keyword })
          }
          onSearch={handleSearch}
        />
        <GenreBadge
          selectedGenres={state.selectedGenres}
          dispatchSelectedGenres={(genres) =>
            dispatch({ type: 'DISPATCH_SELECTED_GENRES', payload: genres })
          }
        />
      </div>
      <LibraryListContainer
        keyword={state.searchKeyword}
        searchType={state.searchType}
        genres={state.selectedGenres}
      />
    </>
  );
};
export default Library;

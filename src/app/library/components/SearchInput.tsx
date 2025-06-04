'use client';

import { useState } from 'react';
import { Search, SquareChevronDown } from 'lucide-react';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';

const SearchInput = () => {
  const SEARCH_TYPES = ['제목', '소개글'] as const;
  type SearchType = (typeof SEARCH_TYPES)[number];

  const [searchType, setSearchType] = useState<SearchType>('제목');
  const [keyword, setKeyword] = useState<string>('');
  const { value: isOpen, toggle: toggleDropdown } = useBoolean();

  const handleSearch = () => {
    console.log(`검색 키워드는 ${keyword}`);
  };

  return (
    <div className="border-write-main mx-auto mb-4 flex w-full items-center justify-between gap-2 rounded-full border-2 bg-white py-2 sm:w-2/3">
      <div className="border-write-main relative z-10 ml-2 w-1/4 border-r-2">
        <button
          className="flex-center w-full min-w-20 gap-1"
          onClick={toggleDropdown}
        >
          <span>{searchType}</span>
          <SquareChevronDown size={16} className="text-write-main" />
        </button>
        <Dropdown isOpen={isOpen} className="absolute top-8 left-0">
          <Dropdown.Container className="border-write-main border-2 text-center">
            {SEARCH_TYPES.map((type) => (
              <Dropdown.Content
                key={type}
                contentItem={type}
                onClick={() => {
                  setSearchType(type);
                  toggleDropdown();
                }}
                className="hover:bg-write-success/20 truncate px-4 py-2 sm:px-8"
              />
            ))}
          </Dropdown.Container>
        </Dropdown>
      </div>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full pl-4 outline-none placeholder:text-base placeholder:font-bold"
      />
      <button
        onClick={handleSearch}
        className="text-write-main hover:text-shadow-write-success px-4"
      >
        <Search size={22} />
      </button>
    </div>
  );
};

export default SearchInput;

'use client';

import { CircleX, Search } from 'lucide-react';
import { SearchInputProps } from '@/app/library/components/type';

const SearchInput = ({ keyword, setKeyword, onSearch }: SearchInputProps) => {
  return (
    <div className="border-write-main mx-auto mb-4 flex w-full items-center justify-between gap-2 rounded-full border-2 bg-white py-2 sm:w-2/3">
      <div className="flex w-full items-center">
        <input
          name="search"
          aria-label="검색어 입력"
          type="text"
          placeholder="검색어를 입력해주세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          className="w-full pl-4 outline-none placeholder:text-base placeholder:font-semibold"
        />
        {keyword && (
          <button onClick={() => setKeyword('')} aria-label="검색어 초기화">
            <CircleX size={18} className="text-gray-400" />
          </button>
        )}
      </div>
      <button
        onClick={onSearch}
        className="text-write-main hover:text-shadow-write-success pr-4"
      >
        <Search size={22} />
      </button>
    </div>
  );
};

export default SearchInput;

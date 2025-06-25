'use client';

import { useForm } from 'react-hook-form';
import { CircleX, Search } from 'lucide-react';
import { FormValues, SearchInputProps } from '@/app/library/_components/type';
import { useEffect } from 'react';
const SearchInput = ({ keyword, setKeyword, onSearch }: SearchInputProps) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { search: keyword },
  });

  const searchValue = watch('search');

  useEffect(() => {
    if (searchValue === '') {
      onSearch();
    }
  }, [searchValue]);

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="border-write-main mx-auto mb-4 flex w-full items-center justify-between gap-2 rounded-full border-2 bg-white py-2 sm:w-2/3"
    >
      <div className="flex w-full items-center">
        <input
          {...register('search')}
          aria-label="스토리 제목으로 검색"
          type="text"
          placeholder="스토리 제목을 입력해주세요"
          onChange={(e) => {
            setKeyword(e.target.value);
            setValue('search', e.target.value);
          }}
          className="w-full pl-4 outline-none placeholder:text-base placeholder:font-semibold"
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => {
              setKeyword('');
              setValue('search', '');
            }}
            aria-label="검색어 초기화"
          >
            <CircleX size={18} className="text-gray-400" />
          </button>
        )}
      </div>
      <button
        type="submit"
        className="text-write-main hover:text-shadow-write-success pr-4"
        aria-label="검색"
      >
        <Search size={22} />
      </button>
    </form>
  );
};

export default SearchInput;

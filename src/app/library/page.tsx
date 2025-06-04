import BadgeGroup from '@/app/library/components/BadgeGroup';
import LibraryListGrid from '@/app/library/components/LibraryListGrid';
import SearchInput from '@/app/library/components/SearchInput';
import React from 'react';

export default function Library() {
  return (
    <>
      <h1></h1>
      <div className="mx-auto mb-25 max-w-[1000px] border-b-2 border-gray-200 pb-4">
        <SearchInput />
        <BadgeGroup />
      </div>
      <LibraryListGrid />
    </>
  );
}

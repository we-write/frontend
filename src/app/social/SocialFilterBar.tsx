'use client';

import { GENRE_LOCATION_MAP, LocationType } from '@/api/social/type';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';
import React from 'react';
import { FilterProps } from './type';
import { ArrowSort, DownIcon } from '@public/assets/icons';

const GenreFilter = ({ filter, filterDispatch }: FilterProps) => {
  const {
    value: genreFilterOpen,
    setFalse: closeGenreFilter,
    toggle: toggleGenreFilter,
  } = useBoolean();

  const handleResetFilteredSocialList = () => {
    filterDispatch({
      type: 'REMOVE_FILTER',
      payload: 'location',
    });
    closeGenreFilter();
  };

  const handleSelectGenreFilter = (location: LocationType) => {
    filterDispatch({
      type: 'SET_FILTER',
      payload: { location: location },
    });
    closeGenreFilter();
  };

  return (
    <Dropdown
      isOpen={genreFilterOpen}
      trigger={
        <Button
          onClick={toggleGenreFilter}
          size="custom"
          className="flex min-w-[110px] items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800"
        >
          <p>
            {filter.location
              ? convertLocationToGenre({ location: filter.location })
              : '장르 전체'}
          </p>
          <DownIcon fill="currentColor" />
        </Button>
      }
    >
      <Dropdown.Container className="absolute z-10 mt-1 shadow-md">
        <Dropdown.Content
          onClick={handleResetFilteredSocialList}
          contentItem={
            <p className="hover:bg-write-green-50 w-full rounded-md p-2">
              장르 전체
            </p>
          }
        />
        {Object.entries(GENRE_LOCATION_MAP).map(([genre, location]) => (
          <Dropdown.Content
            key={genre}
            onClick={() => handleSelectGenreFilter(location)}
            contentItem={
              <p className="hover:bg-write-green-50 w-full rounded-md p-2">
                {genre}
              </p>
            }
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
  );
};

const DateFilter = () => {
  const { value: dateFilterOpen, toggle: toggleDateFilter } = useBoolean();

  return (
    <Dropdown
      isOpen={dateFilterOpen}
      trigger={
        <Button
          onClick={toggleDateFilter}
          size="custom"
          className="flex min-w-[110px] items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800"
        >
          날짜 전체
          <DownIcon fill="currentColor" />
        </Button>
      }
    >
      <Dropdown.Container className="absolute z-10 mt-1 shadow-md">
        {/* 캘린더 추가 시 캘린더 컴포넌트 추가 */}
        <></>
      </Dropdown.Container>
    </Dropdown>
  );
};

const SortByCapacityAndEndDate = ({ filter, filterDispatch }: FilterProps) => {
  const { value: sortOpen, toggle: toggleSort } = useBoolean();

  const sortList: Record<string, 'registrationEnd' | 'participantCount'> = {
    '마감 임박': 'registrationEnd',
    '참여 인원 순': 'participantCount',
  };

  const handleChangeSortBy = (
    sortBy: 'registrationEnd' | 'participantCount'
  ) => {
    filterDispatch({
      type: 'SET_FILTER',
      payload: { sortBy: sortBy },
    });
    toggleSort();
  };

  return (
    <Dropdown
      isOpen={sortOpen}
      trigger={
        <Button
          onClick={toggleSort}
          size="custom"
          className="flex min-w-[110px] items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800"
        >
          <ArrowSort fill="currentColor" />
          <p>
            {filter.sortBy
              ? filter.sortBy === 'registrationEnd'
                ? '마감 임박'
                : '참여 인원 순'
              : '마감 임박'}
          </p>
        </Button>
      }
    >
      <Dropdown.Container className="absolute z-10 mt-1 shadow-md">
        {Object.entries(sortList).map(([key, value]) => (
          <Dropdown.Content
            key={key}
            onClick={() => handleChangeSortBy(value)}
            contentItem={
              <p className="hover:bg-write-green-50 w-full rounded-md p-2">
                {key}
              </p>
            }
          />
        ))}
      </Dropdown.Container>
    </Dropdown>
  );
};

const SocialFilterBar = ({ filter, filterDispatch }: FilterProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {/* 장르 필터 */}
        <GenreFilter filter={filter} filterDispatch={filterDispatch} />
        {/* 날짜 필터 추가예정 */}
        <DateFilter />
      </div>

      {/* 참여자수, 모집마감순 정렬 필터 */}
      <SortByCapacityAndEndDate
        filter={filter}
        filterDispatch={filterDispatch}
      />
    </div>
  );
};

export default SocialFilterBar;

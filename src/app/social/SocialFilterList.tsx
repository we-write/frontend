'use client';

import {
  GENRE_LOCATION_MAP,
  getGenreByLocation,
  LocationType,
} from '@/api/social/type';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';
import React from 'react';
import { FilterProps, GenreFilterProps } from './type';
import { ArrowSort, DownIcon } from '@public/assets/icons';

export const GenreFilter = ({
  filter,
  filterDispatch,
  resetFilteredSocialList,
}: GenreFilterProps) => {
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
    resetFilteredSocialList();
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
              ? getGenreByLocation(filter.location)
              : '장르 전체'}
          </p>
          <DownIcon fill="currentColor" />
        </Button>
      }
    >
      <Dropdown.Container className="fixed z-10 shadow-md">
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

export const DateFilter = () => {
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
      <Dropdown.Container className="fixed z-10 shadow-md">
        {/* 캘린더 추가 시 캘린더 컴포넌트 추가 */}
        <></>
      </Dropdown.Container>
    </Dropdown>
  );
};

export const SortByCapacityAndRegistrationEnd = ({
  filter,
  filterDispatch,
}: FilterProps) => {
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
      <Dropdown.Container className="fixed z-10 shadow-md">
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

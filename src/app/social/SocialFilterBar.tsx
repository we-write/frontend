'use client';

import { GENRE_LOCATION_MAP, LocationType } from '@/api/social/type';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import useBoolean from '@/hooks/useBoolean';
import React from 'react';
import { FilterProps } from './type';
import { ArrowSort, DownIcon } from '@public/assets/icons';
import { useCalendar } from '@/components/common/Calendar/useCalendar';
import Calendar from '@/components/common/Calendar/Calendar';
import { format } from 'date-fns';
import { RefreshCcw } from 'lucide-react';

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

const DateFilter = ({ filter, filterDispatch }: FilterProps) => {
  const {
    value: dateFilterOpen,
    toggle: toggleDateFilter,
    setFalse: closeDateFilter,
  } = useBoolean();
  const {
    currentDate,
    handleDateSelect,
    selectedDate,
    navigateMonth,
    isSameDay,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
  } = useCalendar({
    initialDate: new Date(),
    minDate: new Date(),
  });

  const handleDateFilter = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    const formattedDate = format(newDate, 'yyyy-MM-dd');

    filterDispatch({
      type: 'SET_FILTER',
      payload: { date: formattedDate },
    });
    handleDateSelect(day);
    closeDateFilter();
  };

  const handleResetDateFilter = () => {
    filterDispatch({
      type: 'REMOVE_FILTER',
      payload: 'date',
    });
  };

  return (
    <Dropdown
      isOpen={dateFilterOpen}
      trigger={
        <div className="flex items-center gap-2">
          <Button
            onClick={toggleDateFilter}
            size="custom"
            className="relative flex min-w-[110px] items-center justify-between rounded-xl border-2 border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800"
          >
            {filter.date || '날짜 전체'}
            <DownIcon fill="currentColor" />
          </Button>

          {filter.date && (
            <button
              onClick={handleResetDateFilter}
              className="rounded-full bg-gray-100 p-1 hover:bg-gray-200"
            >
              <RefreshCcw size={16} className="text-gray-600" />
            </button>
          )}
        </div>
      }
    >
      <Dropdown.Container className="absolute z-10 mt-1 shadow-md">
        <div className="relative">
          <Calendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            navigateMonth={navigateMonth}
            handleDateSelect={handleDateFilter}
            isSameDay={isSameDay}
            getDaysInMonth={getDaysInMonth}
            getFirstDayOfMonth={getFirstDayOfMonth}
            isDateDisabled={isDateDisabled}
          />
        </div>
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
        <GenreFilter filter={filter} filterDispatch={filterDispatch} />
        <DateFilter filter={filter} filterDispatch={filterDispatch} />
      </div>

      <SortByCapacityAndEndDate
        filter={filter}
        filterDispatch={filterDispatch}
      />
    </div>
  );
};

export default SocialFilterBar;

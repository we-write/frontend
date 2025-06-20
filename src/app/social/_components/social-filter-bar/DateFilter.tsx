'use client';

import { FilterProps } from '../type';
import { format } from 'date-fns';
import { useCalendar } from '@/components/common/Calendar/useCalendar';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { DownIcon } from '@public/assets/icons';
import { RefreshCcw } from 'lucide-react';
import useBoolean from '@/hooks/useBoolean';
import Calendar from '@/components/common/Calendar/Calendar';

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
      onClose={closeDateFilter}
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

export default DateFilter;

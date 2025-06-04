import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarProps } from './type';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Calendar = ({
  currentDate,
  selectedDate,
  navigateMonth,
  handleDateSelect,
  isSameDay,
  getDaysInMonth,
  getFirstDayOfMonth,
  isDateDisabled,
}: CalendarProps) => {
  /** 달력의 날짜들을 렌더링 */
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // 이전 달의 마지막 날짜들
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const daysInPrevMonth = getDaysInMonth(prevMonth);

    for (let i = firstDay - 1; i >= 0; i--) {
      const prevDate = new Date(prevMonth);
      prevDate.setDate(daysInPrevMonth - i);
      const isDisabled = isDateDisabled?.(prevDate);
      days.push(
        <button
          key={`prev-${daysInPrevMonth - i}`}
          className={`h-8 w-8 rounded text-sm ${
            isDisabled
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
          onClick={() => {
            if (!isDisabled) {
              navigateMonth('prev');
              handleDateSelect(daysInPrevMonth - i);
            }
          }}
          disabled={isDisabled}
        >
          {daysInPrevMonth - i}
        </button>
      );
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(currentDate);
      currentDay.setDate(day);
      const isSelected = isSameDay(currentDay, selectedDate);
      const isToday = isSameDay(currentDay, new Date());
      const isDisabled = isDateDisabled?.(currentDay);

      days.push(
        <button
          key={day}
          className={`h-8 w-8 rounded text-sm font-medium transition-colors ${
            isSelected
              ? 'bg-write-main text-white'
              : isToday
                ? 'text-write-main'
                : isDisabled
                  ? 'cursor-not-allowed text-gray-300'
                  : 'text-gray-900 hover:bg-gray-100'
          }`}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    // 다음 달의 시작 날짜들
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);

    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(currentDate);
      nextDate.setMonth(nextDate.getMonth() + 1);
      nextDate.setDate(day);
      const isDisabled = isDateDisabled?.(nextDate);
      days.push(
        <button
          key={`next-${day}`}
          className={`h-8 w-8 rounded text-sm ${
            isDisabled
              ? 'cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:bg-gray-100'
          }`}
          onClick={() => {
            if (!isDisabled) {
              navigateMonth('next');
              handleDateSelect(day);
            }
          }}
          disabled={isDisabled}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {/* Calendar Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => navigateMonth('prev')}
          className="rounded p-1 hover:bg-gray-100"
        >
          <ChevronLeft size={16} />
        </button>
        <h2 className="font-medium text-gray-900">
          {MONTH_NAMES[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={() => navigateMonth('next')}
          className="rounded p-1 hover:bg-gray-100"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="mb-4">
        <div className="mb-2 grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="py-1 text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
      </div>
    </div>
  );
};

export default Calendar;

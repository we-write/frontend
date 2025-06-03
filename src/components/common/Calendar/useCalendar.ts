import { useState } from 'react';

interface UseCalendarProps {
  initialDate?: Date;
  minDate?: Date;
}

interface UseCalendarReturn {
  currentDate: Date;
  selectedDate: Date;
  navigateMonth: (direction: 'prev' | 'next') => void;
  handleDateSelect: (day: number) => void;
  isSameDay: (date1: Date, date2: Date) => boolean;
  getDaysInMonth: (date: Date) => number;
  getFirstDayOfMonth: (date: Date) => number;
  isDateDisabled: (date: Date) => boolean;
  setSelectedDate: (date: Date) => void;
}

/** 달력의 상태와 핵심 기능을 관리하는 훅 */
export const useCalendar = ({
  initialDate = new Date(),
  minDate,
}: UseCalendarProps = {}): UseCalendarReturn => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState(initialDate);

  /** 특정 월의 총 일수 반환 */
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  /** 특정 월의 1일이 무슨 요일인지 반환 (0: 일요일, 6: 토요일) */
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  /** 이전/다음 달로 이동 */
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  /** 날짜 선택 처리 */
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    setSelectedDate(newDate);
  };

  /** 두 날짜가 같은 날인지 비교 */
  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  /** 날짜가 선택 불가능한지 확인 (과거 날짜, 최소 날짜 이전) */
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 과거 날짜 체크
    if (date < today) return true;

    // minDate가 있는 경우 minDate보다 이전 날짜 체크
    if (minDate) {
      const minDateStart = new Date(minDate);
      minDateStart.setHours(0, 0, 0, 0);
      return date < minDateStart;
    }

    return false;
  };

  return {
    currentDate,
    selectedDate,
    navigateMonth,
    handleDateSelect,
    isSameDay,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
    setSelectedDate,
  };
};

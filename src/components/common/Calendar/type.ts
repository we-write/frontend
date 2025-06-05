export interface CalendarProps {
  currentDate: Date;
  selectedDate: Date;
  navigateMonth: (direction: 'prev' | 'next') => void;
  handleDateSelect: (day: number) => void;
  isSameDay: (date1: Date, date2: Date) => boolean;
  getDaysInMonth: (date: Date) => number;
  getFirstDayOfMonth: (date: Date) => number;
  isDateDisabled?: (date: Date) => boolean;
}

export interface UseCalendarProps {
  initialDate?: Date;
  minDate?: Date;
}

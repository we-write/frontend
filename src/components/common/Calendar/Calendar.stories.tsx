import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import { useCalendar } from './useCalendar';

const meta = {
  title: 'Common/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentDate: {
      description: '현재 보여지는 달력의 년/월을 나타내는 날짜',
    },
    selectedDate: {
      description: '사용자가 선택한 날짜',
    },
    navigateMonth: {
      description: '이전/다음 달로 이동하는 함수',
    },
    handleDateSelect: {
      description: '날짜를 선택했을 때 호출되는 함수',
    },
    isSameDay: {
      description: '두 날짜가 같은 날인지 비교하는 함수',
    },
    getDaysInMonth: {
      description: '현재 월의 총 일수를 반환하는 함수',
    },
    getFirstDayOfMonth: {
      description:
        '현재 월의 1일이 무슨 요일인지 반환하는 함수 (0: 일요일, 6: 토요일)',
    },
    isDateDisabled: {
      description:
        '특정 날짜가 선택 불가능한지 확인하는 함수 (예: 과거 날짜, 최소 날짜 이전)',
    },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Calendar 스토리
const DefaultCalendar = () => {
  const {
    currentDate,
    selectedDate,
    navigateMonth,
    handleDateSelect,
    isSameDay,
    getDaysInMonth,
    getFirstDayOfMonth,
  } = useCalendar({
    initialDate: new Date(),
  });

  return (
    <Calendar
      currentDate={currentDate}
      selectedDate={selectedDate}
      navigateMonth={navigateMonth}
      handleDateSelect={handleDateSelect}
      isSameDay={isSameDay}
      getDaysInMonth={getDaysInMonth}
      getFirstDayOfMonth={getFirstDayOfMonth}
    />
  );
};

// 최소 날짜가 있는 Calendar 스토리
const MinDateCalendar = () => {
  const {
    currentDate,
    selectedDate,
    navigateMonth,
    handleDateSelect,
    isSameDay,
    getDaysInMonth,
    getFirstDayOfMonth,
    isDateDisabled,
  } = useCalendar({
    initialDate: new Date(),
    minDate: new Date(), // 현재 날짜를 최소 날짜로 설정
  });

  return (
    <Calendar
      currentDate={currentDate}
      selectedDate={selectedDate}
      navigateMonth={navigateMonth}
      handleDateSelect={handleDateSelect}
      isSameDay={isSameDay}
      getDaysInMonth={getDaysInMonth}
      getFirstDayOfMonth={getFirstDayOfMonth}
      isDateDisabled={isDateDisabled}
    />
  );
};

export const Default: Story = {
  name: 'Default',
  args: {
    currentDate: new Date(),
    selectedDate: new Date(),
    navigateMonth: () => {},
    handleDateSelect: () => {},
    isSameDay: () => false,
    getDaysInMonth: () => 31,
    getFirstDayOfMonth: () => 0,
  },
  render: () => <DefaultCalendar />,
};

export const WithMinDate: Story = {
  name: 'With Min Date (Today)',
  args: {
    currentDate: new Date(),
    selectedDate: new Date(),
    navigateMonth: () => {},
    handleDateSelect: () => {},
    isSameDay: () => false,
    getDaysInMonth: () => 31,
    getFirstDayOfMonth: () => 0,
  },
  render: () => <MinDateCalendar />,
};

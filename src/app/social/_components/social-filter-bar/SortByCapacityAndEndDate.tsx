'use client';

import { FilterProps } from '../type';
import useBoolean from '@/hooks/useBoolean';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { ArrowSort } from '@public/assets/icons';

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
      onClose={toggleSort}
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

export default SortByCapacityAndEndDate;

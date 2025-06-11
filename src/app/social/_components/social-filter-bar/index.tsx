'use client';

import { FilterProps } from '../type';
import GenreFilter from './GenreFilter';
import DateFilter from './DateFilter';
import SortByCapacityAndEndDate from './SortByCapacityAndEndDate';

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

'use client';

import { FilterProps } from '../type';
import { GENRE_LOCATION_MAP } from '@/api/social/type';
import { LocationType } from '@/api/social/type';

import useBoolean from '@/hooks/useBoolean';
import Button from '@/components/common/Button/Button';
import Dropdown from '@/components/common/Dropdown/Dropdown';
import { DownIcon } from '@public/assets/icons';
import convertLocationToGenre from '@/utils/convertLocationToGenre';

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

export default GenreFilter;

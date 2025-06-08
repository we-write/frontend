import { GENRE_LOCATION_MAP, GenreType } from '@/api/social/type';
import { BadgeGroupProps } from './type';

const ALL = '전체';
const GENRES = Object.keys(GENRE_LOCATION_MAP) as GenreType[];
const BadgeGroup = ({ selectedGenres, setSelectedGenres }: BadgeGroupProps) => {
  const toggleGenre = (genre: string) => {
    if (genre === ALL) {
      setSelectedGenres([ALL]);
    } else {
      setSelectedGenres([genre]);
    }
  };

  return (
    <div className="mx-auto flex w-full justify-start gap-2 sm:w-2/3">
      {[ALL, ...GENRES].map((genre) => {
        const isActive = selectedGenres.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`flex-center h-fit w-fit rounded-md px-2 py-1 text-xs transition-all sm:text-sm ${
              isActive ? 'bg-black text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};

export default BadgeGroup;

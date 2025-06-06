import { GENRE_LIST } from '@/api/stories/type';
import { BadgeGroupProps } from './type';

const ALL = '전체';

const BadgeGroup = ({ selectedGenres, setSelectedGenres }: BadgeGroupProps) => {
  const toggleGenre = (genre: string) => {
    if (genre === ALL) return setSelectedGenres([ALL]);

    let next = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres.filter((g) => g !== ALL), genre];

    if (GENRE_LIST.every((g) => next.includes(g)) || next.length === 0) {
      next = [ALL];
    }

    setSelectedGenres(next);
  };

  return (
    <div className="mx-auto flex w-full justify-start gap-2 sm:w-2/3">
      {[ALL, ...GENRE_LIST].map((genre) => {
        const isActive = selectedGenres.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`flex-center h-fit w-fit rounded-md px-2 py-1 text-xs transition-all sm:text-sm ${isActive ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};

export default BadgeGroup;

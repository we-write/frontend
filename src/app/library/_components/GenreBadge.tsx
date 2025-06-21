import { GENRE_LOCATION_MAP } from '@/api/social/type';
import { GenreBadgeProps, GenreTypeWithAll } from './type';

export const GENRE_ALL = '전체';

const GENRES = [
  GENRE_ALL,
  ...Object.keys(GENRE_LOCATION_MAP),
] as GenreTypeWithAll[];

const GenreBadge = ({
  selectedGenres,
  dispatchSelectedGenres,
}: GenreBadgeProps) => {
  const selectedSet = new Set(selectedGenres);

  const updateSelectedGenre = (genre: GenreTypeWithAll) => {
    if (genre === '전체') {
      dispatchSelectedGenres([GENRE_ALL]);
    } else {
      dispatchSelectedGenres([genre]);
    }
  };

  return (
    <div className="mx-auto flex w-full justify-start gap-2 sm:w-2/3">
      {GENRES.map((genre) => {
        const isActive = selectedSet.has(genre);
        return (
          <button
            type="button"
            key={genre}
            onClick={() => updateSelectedGenre(genre)}
            className={`flex-center rounded-md px-2 py-1 text-xs transition-all sm:text-sm ${
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

export default GenreBadge;

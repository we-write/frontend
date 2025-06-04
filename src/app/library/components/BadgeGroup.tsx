'use client';
import { useState } from 'react';
import { GENRE_LIST } from '@/api/stories/type';

const ALL = '전체';

const BadgeGroup = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([ALL]);

  const handleClick = (genre: string) => {
    if (genre === ALL) {
      setSelectedGenres([ALL]);
    } else {
      let next = selectedGenres.includes(genre)
        ? selectedGenres.filter((g) => g !== genre)
        : [...selectedGenres.filter((g) => g !== ALL), genre];

      // 모든 장르가 선택된 경우 '전체' 자동 포함
      const allGenresSelected = GENRE_LIST.every((g) => next.includes(g));
      if (allGenresSelected) {
        next = [ALL, ...GENRE_LIST];
      } else {
        next = next.filter((g) => g !== ALL);
      }

      // 아무것도 선택 안 하면 전체 선택
      if (next.length === 0) next = [ALL];

      setSelectedGenres(next);
    }
  };
  const genres = [ALL, ...GENRE_LIST];

  return (
    <div className="mx-auto flex w-full justify-start gap-2 sm:w-2/3">
      {genres.map((genre) => {
        const isActive = selectedGenres.includes(genre);
        return (
          <button
            key={genre}
            onClick={() => handleClick(genre)}
            className={`flex-center h-fit w-fit rounded-md px-2 py-1 text-xs sm:text-sm ${isActive ? 'bg-black text-white' : 'bg-gray-200 text-black'} hover:bg-black hover:text-white`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};

export default BadgeGroup;

import { GENRE_LOCATION_MAP, GenreType, LocationType } from '@/api/social/type';

interface ConvertLocationToGenreParams {
  location: LocationType;
}

export const convertLocationToGenre = ({
  location,
}: ConvertLocationToGenreParams): GenreType => {
  return Object.entries(GENRE_LOCATION_MAP).find(
    (genre) => genre[1] === location
  )?.[0] as GenreType;
};

export default convertLocationToGenre;

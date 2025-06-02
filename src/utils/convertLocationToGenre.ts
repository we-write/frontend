import { LocationType } from '@/api/social/type';

interface ConvertLocationToGenreParams {
  location: LocationType;
}

const convertLocationToGenre = ({ location }: ConvertLocationToGenreParams) => {
  switch (location) {
    case '건대입구':
      return '판타지';
    case '을지로3가':
      return '로맨스';
    case '신림':
      return '스릴러/미스터리';
    case '홍대입구':
      return '무협';
  }
};

export default convertLocationToGenre;

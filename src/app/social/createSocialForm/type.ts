import { GenreType } from '@/api/social/type';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface SelectGenreProps {
  register: UseFormRegisterReturn<'location'>;
  handleChangeGenre: (genre: GenreType) => void;
}

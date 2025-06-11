import { GetSocialListParams, SocialResponse } from '@/api/social/type';
import { Dispatch } from 'react';

export interface SocialListProps {
  filter: GetSocialListParams;
}

export interface SocialListGridProps {
  socialList: SocialResponse[];
  isLoading: boolean;
}

export type FilterAction =
  | { type: 'SET_FILTER'; payload: Partial<GetSocialListParams> }
  | { type: 'RESET_FILTER' }
  | { type: 'REMOVE_FILTER'; payload: keyof GetSocialListParams };

export interface FilterProps {
  filter: GetSocialListParams;
  filterDispatch: Dispatch<FilterAction>;
}

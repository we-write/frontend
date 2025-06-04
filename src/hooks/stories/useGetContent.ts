import { getContents } from '@/api/stories/api';
import { GetContentsProps } from '@/api/stories/type';
import { useQuery } from '@tanstack/react-query';

export const useGetContent = ({ id, page, limit }: GetContentsProps) => {
  return useQuery({
    queryKey: ['contents', id, page],
    queryFn: () => getContents({ id, page, limit }),
  });
};

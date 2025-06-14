import { getContents } from '@/api/stories/api';
import { GetContentsParams } from '@/api/stories/type';
import { useQuery } from '@tanstack/react-query';

export const useGetContent = ({ id }: GetContentsParams) => {
  return useQuery({
    queryKey: ['contents', id],
    queryFn: () => getContents({ id }),
    select: (response) => {
      const merged = response.data.filter((item) => item.status === 'MERGED');
      return {
        data: merged.map((item) => item.content),
      };
    },
  });
};

import { getContents } from '@/api/stories/api';
import { GetContentsParams } from '@/api/stories/type';
import { useQuery } from '@tanstack/react-query';

export const useGetContent = ({ id, page, limit }: GetContentsParams) => {
  return useQuery({
    queryKey: ['contents', id, page],
    queryFn: () => getContents({ id, page, limit }),
    select: (response) => ({
      count: response.count,
      data: response.data.filter((item) => item.status === 'MERGED'),
    }),
  });
};

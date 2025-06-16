import { getContents } from '@/api/stories/api';
import { GetContentsParams } from '@/api/stories/type';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetContent = ({ storyId }: GetContentsParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_CONTENTS, storyId],
    queryFn: () => getContents({ storyId }),
    select: (response) => {
      const merged = response.data.filter((item) => item.status === 'MERGED');
      return {
        data: merged.map((item) => item.content),
      };
    },
  });
};

import { getContents } from '@/api/stories/api';
// MEMO : import 빌드 에러나서 호출하는 부분 변경했습니다.
import { GetContentsProps } from '@/api/stories/type';
import { useQuery } from '@tanstack/react-query';

export const useGetContent = ({ id, page, limit }: GetContentsProps) => {
  return useQuery({
    queryKey: ['contents', id, page],
    queryFn: () => getContents({ id, page, limit }),
  });
};

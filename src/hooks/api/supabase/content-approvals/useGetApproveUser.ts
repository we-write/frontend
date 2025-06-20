import { getApproveUser } from '@/api/stories/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { DBContentApprovalResponse } from '@/types/dbStory';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetApproveUserParams {
  contentId?: string;
}

const useGetApproveUser = ({
  contentId,
}: UseGetApproveUserParams): UseQueryResult<
  DBContentApprovalResponse[] | null
> => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_APPROVE_USER, contentId],
    queryFn: () => getApproveUser({ contentId: contentId! }),
    enabled: contentId != null,
  });
};

export default useGetApproveUser;

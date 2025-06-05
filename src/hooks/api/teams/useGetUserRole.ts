import { getUserRole } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { TeamUserRole } from '@/types/teamUserRole';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

interface UseGetUserRoleParams {
  userId?: number;
  storyId?: string;
}

interface GetUserRoleResponse {
  role: Exclude<TeamUserRole, 'GUEST'>;
}

const useGetUserRole = ({
  userId,
  storyId,
}: UseGetUserRoleParams): UseQueryResult<GetUserRoleResponse> => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_USER_ROLE, storyId],
    queryFn: () => getUserRole({ userId: userId!, storyId: storyId! }),
    enabled: userId != null && storyId != null,
  });
};

export default useGetUserRole;

import { getUserRole } from '@/api/social-detail/api';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

interface UseGetUserRoleParams {
  userId?: number;
  storyId?: string;
}

const useGetUserRole = ({ userId, storyId }: UseGetUserRoleParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_USER_ROLE, storyId],
    queryFn: () => getUserRole({ userId: userId!, storyId: storyId! }),
    enabled: userId != null && storyId != null,
  });
};

export default useGetUserRole;

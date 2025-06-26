import { QUERY_KEY } from '@/constants/queryKey';
import { Contents } from '@/lib/supabase/custom-types';
import { getContentApproveUser } from '@/lib/supabase/repositories/content_approval';
import { useQuery } from '@tanstack/react-query';

interface UseGetApproveUserParams {
  contentId?: Contents['content_id'];
}

const useGetApproveUser = ({ contentId }: UseGetApproveUserParams) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_APPROVE_USER, contentId],
    queryFn: () => getContentApproveUser(contentId!),
    enabled: contentId != null,
  });
};

export default useGetApproveUser;

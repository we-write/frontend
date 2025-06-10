import instance from '@/api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from '@/constants/queryKey';
import { API_PATH } from '@/constants/apiPath';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/appRoutes';

interface UseJoinTeamParams {
  socialId: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
}

const useJoinTeam = (params: UseJoinTeamParams) => {
  const queryClient = useQueryClient();
  const { socialId } = params;
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await instance.post(
          `${API_PATH.SOCIAL}/${socialId}/join`,
          socialId
        );
        if (response.status === 201) {
          return response.data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const responseCode = error.response?.data.code;

          if (error.response?.data.message === '모집이 마감된 모임입니다') {
            alert('모집이 마감된 모임입니다.');
            router.push(APP_ROUTES.social);
            return;
          }

          switch (responseCode) {
            case 400:
              throw new Error('취소된 모임입니다');
            case 401:
              throw new Error('Authorization 헤더가 필요합니다');
            case 403:
              throw new Error('모임을 찾을 수 없습니다');
            default:
              throw new Error(
                `알 수 없는 오류가 발생했습니다. (error: ${responseCode})`
              );
          }
        }
      }
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, socialId],
      });
    },
  });
};

export default useJoinTeam;

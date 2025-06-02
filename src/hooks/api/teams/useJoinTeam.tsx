import instance from '@/api/instance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { QUERY_KEY } from '@/constants/queryKey';

interface UseJoinTeamParams {
  storyId: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: string;
}

const useJoinTeam = (params: UseJoinTeamParams) => {
  const queryClient = useQueryClient();
  const { storyId } = params;
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await instance.post(
          `/gatherings/${storyId}/join`,
          storyId
        );
        if (response.status === 201) {
          return response.data;
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const responseCode = error.response?.data.code;
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
        queryKey: [QUERY_KEY.SOCIAL_PARTICIPANTS, storyId],
      });
    },
  });
};

export default useJoinTeam;

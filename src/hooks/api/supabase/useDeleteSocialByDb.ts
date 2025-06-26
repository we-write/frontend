import { deleteSocialByDb } from '@/api/social-detail/api';
import { useMutation } from '@tanstack/react-query';

export interface useDeleteSocialByDbParams {
  storyId: string;
}

const useDeleteSocialByDb = ({ storyId }: useDeleteSocialByDbParams) => {
  return useMutation({
    mutationFn: () => deleteSocialByDb({ storyId }),
    onError: (error) => {
      console.error(error);
      alert('오류가 발생하여 모임 삭제에 실패하였습니다.');
    },
    onSuccess: () => {
      alert('모임이 삭제되었습니다.');
    },
  });
};

export default useDeleteSocialByDb;

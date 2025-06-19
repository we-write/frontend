import { UseSocialActionsParams } from '@/app/social/detail/[storyId]/type';
import { APP_ROUTES } from '@/constants/appRoutes';
import useParticipateCollaborator from '@/hooks/api/supabase/story-collaborators/useParticipateCollaborator';
import useDeleteSocialByDb from '@/hooks/api/supabase/useDeleteSocialByDb';
import { TEAM_USER_ROLE, TeamUserRole } from '@/types/teamUserRole';
import toast from '@/utils/toast';
import { useRouter } from 'next/navigation';

const useSocialActions = ({
  storyId,
  userId,
  userName,
}: UseSocialActionsParams) => {
  const { mutate: insertNewCollaborator } = useParticipateCollaborator({
    storyId: storyId,
  });

  const { mutate: deleteSocialData } = useDeleteSocialByDb({
    storyId: storyId,
  });

  const router = useRouter();

  const navigateStoryOrJoinTeam = async (role: TeamUserRole) => {
    if (role === 'MEMBER' || role === 'LEADER') {
      router.push(`${APP_ROUTES.libraryDetail}/${storyId}/?page=0`);
      return;
    }

    if (!userId || !userName) {
      alert('로그인이 필요한 서비스입니다.');
      router.push(`${APP_ROUTES.signin}`);
      return;
    }

    const joinTeamConfirmed = window.confirm('모임에 참여하시겠습니까?');
    if (!joinTeamConfirmed) return;

    try {
      insertNewCollaborator({
        data: {
          story_id: storyId,
          user_id: userId!,
          user_name: userName!,
          joined_at: new Date().toISOString(),
        },
        role: TEAM_USER_ROLE.MEMBER,
      });

      toast.success('모임 참여에 성공하였습니다.');
    } catch (error) {
      console.error('모임 참여 실패 : ', error);
      toast({
        type: 'error',
        message: '오류가 발생하여 모임 참여에 실패하였습니다.',
        duration: 5,
      });
      router.refresh();
    }
  };

  const deleteSocial = (role: TeamUserRole) => {
    if (role !== 'LEADER') return;

    const deleteSocialConfirmed = window.confirm(
      '모든 데이터는 삭제되면 복구할 수 없습니다. 모임을 정말 삭제하시겠습니까? '
    );
    if (!deleteSocialConfirmed) return;

    deleteSocialData();
    router.push(`${APP_ROUTES.home}`);
  };

  return { navigateStoryOrJoinTeam, deleteSocial };
};

export default useSocialActions;

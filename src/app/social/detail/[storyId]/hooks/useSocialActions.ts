import { UseSocialActionsParams } from '@/app/social/detail/[storyId]/type';
import { APP_ROUTES } from '@/constants/appRoutes';
import useParticipateCollaborator from '@/hooks/api/supabase/story-collaborators/useParticipateCollaborator';
import useDeleteSocialByDb from '@/hooks/api/supabase/useDeleteSocialByDb';
import { TEAM_USER_ROLE, TeamUserRole } from '@/types/teamUserRole';
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

  const navigateStoryDetail = () => {
    router.push(`${APP_ROUTES.libraryDetail}/${storyId}/?page=0`);
  };

  const navigateLogin = () => {
    alert('로그인이 필요한 서비스입니다.');
    router.push(`${APP_ROUTES.signin}`);
  };

  const joinSocial = () => {
    const joinTeamConfirmed = window.confirm('모임에 참여하시겠습니까?');
    if (!joinTeamConfirmed) return;

    insertNewCollaborator({
      data: {
        story_id: storyId,
        user_id: userId!,
        user_name: userName!,
        joined_at: new Date().toISOString(),
      },
      role: TEAM_USER_ROLE.MEMBER,
    });
  };

  const navigateStoryOrJoinSocial = (role: TeamUserRole) => {
    if (!userId || !userName) return navigateLogin();

    if (role === 'GUEST') return joinSocial();

    return navigateStoryDetail();
  };

  const deleteSocial = (role: TeamUserRole) => {
    if (role !== 'LEADER') return;

    deleteSocialData();
    router.push(`${APP_ROUTES.home}`);
  };

  return {
    navigateStoryOrJoinSocial,
    deleteSocial,
  };
};

export default useSocialActions;

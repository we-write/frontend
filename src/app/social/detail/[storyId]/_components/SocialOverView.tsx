'use client';

import DetailCard from '@/components/common/Card/DetailCard';
import { TEAM_USER_ROLE, TeamUserRole } from '@/types/teamUserRole';
import Image from 'next/image';
import { SocialOverViewProps } from '../type';
import { useRouter } from 'next/navigation';
import useParticipateCollaborator from '@/hooks/api/supabase/story-collaborators/useParticipateCollaborator';
import { useGetStory } from '@/hooks/api/supabase/stories/useGetStory';
import useGetStoryCollaborators from '@/hooks/api/supabase/story-collaborators/useGetStoryCollaborators';
import getUserRole from '@/utils/getUserRole';
import toast from '@/utils/toast';
import useDeleteSocialByDb from '@/hooks/api/supabase/useDeleteSocialByDb';

const SocialOverView = ({
  currentUserId,
  currentUserName,
  currentStoryId,
}: SocialOverViewProps) => {
  const { data: storiesData, isLoading: isStoriesDataLoading } =
    useGetStory(currentStoryId);

  const {
    data: storyCollaboratorsData,
    isLoading: isStoryCollaboratorsDataLoading,
  } = useGetStoryCollaborators(currentStoryId);

  const currentUserRole =
    currentUserId && storyCollaboratorsData
      ? getUserRole({ storyCollaboratorsData, currentUserId })
      : 'GUEST';

  const isFetchDataLoading =
    isStoriesDataLoading || isStoryCollaboratorsDataLoading;

  const { mutate: insertNewCollaborator } = useParticipateCollaborator({
    storyId: currentStoryId,
  });

  const { mutate: deleteSocialData } = useDeleteSocialByDb({
    storyId: currentStoryId,
  });

  // TODO: storyCollaborators 테이블에 이미지 필드 추가되면 활성화
  // const imageUrls = extractUserImages(socialTeamsParticipantsData);
  const router = useRouter();

  const navigateStoryOrJoinTeam = async (role: TeamUserRole) => {
    if (!currentStoryId) {
      alert('스토리 정보를 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.');
      return;
    }

    if (role === 'MEMBER' || role === 'LEADER') {
      router.push(`/library/detail/${currentStoryId}/?page=0`);
      return;
    }

    if (!currentUserId || !currentUserName) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/auths/signin');
      return;
    }

    const joinTeamConfirmed = window.confirm('모임에 참여하시겠습니까?');
    if (!joinTeamConfirmed) return;

    try {
      insertNewCollaborator({
        data: {
          story_id: currentStoryId,
          user_id: currentUserId!,
          user_name: currentUserName!,
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
      '모든 데이터가 삭제되면 복구할 수 있습니다. 모임을 정말 삭제하시겠습니까? '
    );
    if (!deleteSocialConfirmed) return;

    deleteSocialData();
    // MEMO: 현재 라우트 전환 이전에 Toast를 띄우는건 부자연스러우므로 임시로 alert 적용
    // TODO: /social 페이지에서 모임 삭제를 감지하고 toast를 띄우는 로직 필요
    alert('모임이 정상적으로 삭제되었습니다.');
    router.push('/social');
  };

  // TODO: 현재 API 호출로 인한 JSX 렌더링 지연이 발생하므로 로딩 개선 및 스켈레톤UI 필요
  if (
    isFetchDataLoading ||
    isStoriesDataLoading ||
    !storiesData ||
    !storyCollaboratorsData
  ) {
    return <div className="h-83 w-full" />;
  }

  return (
    <div className="flex h-83 w-full flex-col justify-center gap-5 sm:flex-row">
      <Image
        src={storiesData.cover_image_url ?? ''}
        alt=""
        width={596}
        height={332}
        className="h-55 w-full rounded-3xl border-2 border-gray-200 object-cover sm:h-83 sm:w-1/2 xl:w-149"
      />
      <div className="h-full w-full sm:w-1/2 xl:w-[29.375rem]">
        <DetailCard
          teamUserRole={currentUserRole}
          textContent={{
            title: storiesData.title,
            genre: storiesData.genre,
            participantCount: storyCollaboratorsData.length,
            capacity: storiesData.capacity,
          }}
          duration={{
            startDate: storiesData.created_at,
            endDate: null, // MEMO: DB에서 받아올 수 있을 때 값 수정
          }}
          isCardDataLoading={isFetchDataLoading}
          imageUrls={[]} // MEMO: DB에서 받아올 수 있을 때 imageUrls로 수정
          handleButtonClick={() => navigateStoryOrJoinTeam(currentUserRole)}
          handleDeleteButtonClick={() => deleteSocial(currentUserRole)}
        />
      </div>
    </div>
  );
};

export default SocialOverView;

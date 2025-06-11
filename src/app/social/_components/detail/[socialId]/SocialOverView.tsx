'use client';

import DetailCard from '@/components/common/Card/DetailCard';
import useJoinTeam from '@/hooks/api/teams/useJoinTeam';
import { TEAM_USER_ROLE, TeamUserRole } from '@/types/teamUserRole';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import Image from 'next/image';
import { SocialOverViewProps } from '@/app/social/_components/detail/[socialId]/type';
import extractUserImages from '@/utils/extractUserImages';
import useGetSocialDetail from '@/hooks/api/teams/useGetSocialDetail';
import useGetSocialParticipants from '@/hooks/api/teams/useGetSocialParticipants';
import useGetUserRole from '@/hooks/api/teams/useGetUserRole';
import { useRouter } from 'next/navigation';
import useParticipateCollaborator from '@/hooks/api/teams/useParticipateCollaborator';

const SocialOverView = ({
  currentSocialId,
  currentUserId,
  currentUserName,
  currentStoryId,
}: SocialOverViewProps) => {
  const { data: socialDetailData, isLoading: socialDetailDataIsLoading } =
    useGetSocialDetail({
      socialId: currentSocialId,
    });

  const {
    data: socialTeamsParticipantsData,
    isLoading: socialTeamsParticipantsDataIsLoading,
  } = useGetSocialParticipants({
    socialId: currentSocialId,
  });
  const { data: userRoleData } = useGetUserRole({
    userId: currentUserId,
    storyId: currentStoryId,
  });
  const isFetchDataLoading =
    socialDetailDataIsLoading || socialTeamsParticipantsDataIsLoading;
  const { mutateAsync: joinTeam } = useJoinTeam({
    socialId: currentSocialId,
  });
  const { mutateAsync: insertNewCollaborator } = useParticipateCollaborator({
    socialId: currentSocialId,
    storyId: currentStoryId,
  });
  const imagesUrls = extractUserImages(socialTeamsParticipantsData);
  const currentUserRole: TeamUserRole = userRoleData
    ? userRoleData.role
    : 'GUEST';
  const router = useRouter();

  const navigateStoryOrJoinTeam = async (role: TeamUserRole) => {
    if (!currentStoryId) {
      alert('스토리 정보를 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.');
      return;
    }

    if (role === 'MEMBER' || role === 'LEADER') {
      router.push(`/library/detail/${currentStoryId}`);
      return;
    }

    if (!currentUserId || !currentUserName) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/auths/signin');
    }

    const joinTeamConfirmed = window.confirm('모임에 참여하시겠습니까?');
    if (!joinTeamConfirmed) return;

    try {
      await joinTeam();

      await insertNewCollaborator({
        data: {
          story_id: currentStoryId,
          user_id: currentUserId!,
          user_name: currentUserName!,
          joined_at: new Date().toISOString(),
        },
        role: TEAM_USER_ROLE.MEMBER,
      });
    } catch (error) {
      console.error('모임 참여 실패 : ', error);
      alert('오류가 발생하여 모임 참여에 실패하였습니다.');
      router.refresh();
    }
  };

  // TODO: 현재 API 호출로 인한 JSX 렌더링 지연이 발생하므로 로딩 개선 및 스켈레톤UI 필요
  if (isFetchDataLoading || !socialDetailData) {
    return <div className="h-83 w-full" />;
  }

  const storyGenre = convertLocationToGenre({
    location: socialDetailData.location,
  });

  return (
    <div className="flex h-83 w-full flex-col justify-center gap-5 sm:flex-row">
      <Image
        src={socialDetailData.image}
        alt=""
        width={596}
        height={332}
        className="h-55 w-full rounded-3xl border-2 border-gray-200 object-cover sm:h-83 sm:w-1/2 xl:w-149"
      />
      <div className="h-full w-full sm:w-1/2 xl:w-[29.375rem]">
        <DetailCard
          teamUserRole={currentUserRole}
          textContent={{
            title: socialDetailData.name,
            genre: storyGenre,
            participantCount: socialDetailData.participantCount,
            capacity: socialDetailData.capacity,
          }}
          duration={{
            startDate: socialDetailData.registrationEnd,
            endDate: socialDetailData.dateTime,
          }}
          isCardDataLoading={isFetchDataLoading}
          imageUrls={imagesUrls}
          handleButtonClick={() => navigateStoryOrJoinTeam(currentUserRole)}
        />
      </div>
    </div>
  );
};

export default SocialOverView;

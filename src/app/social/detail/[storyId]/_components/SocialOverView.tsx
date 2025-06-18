'use client';

import DetailCard from '@/components/common/Card/DetailCard';
import Image from 'next/image';
import { SocialOverViewProps } from '@/app/social/detail/[storyId]/type';
import useSocialActions from '@/app/social/detail/[storyId]/hooks/useSocialActions';
import useSocialDetailData from '@/app/social/detail/[storyId]/hooks/useSocialDetailData';

const SocialOverView = ({
  currentUserId,
  currentUserName,
  currentStoryId,
}: SocialOverViewProps) => {
  const { storiesData, storyCollaboratorsData, userRole, isLoading } =
    useSocialDetailData({
      storyId: currentStoryId,
      userId: currentUserId,
    });

  const { navigateStoryOrJoinTeam, deleteSocial } = useSocialActions({
    storyId: currentStoryId,
    userId: currentUserId,
    userName: currentUserName,
  });

  // TODO: storyCollaborators 테이블에 이미지 컬럼 추가되면 활성화
  // const imageUrls = extractUserImages(socialTeamsParticipantsData);

  // TODO: 현재 API 호출로 인한 JSX 렌더링 지연이 발생하므로 로딩 개선 및 스켈레톤UI 필요
  if (isLoading || !storiesData || !storyCollaboratorsData) {
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
          teamUserRole={userRole}
          textContent={{
            title: storiesData.title,
            genre: storiesData.genre,
            participantCount: storyCollaboratorsData.length,
            capacity: storiesData.capacity,
          }}
          duration={{
            startDate: storiesData.created_at,
            endDate: null, // TODO: DB에서 받아올 수 있을 때 값 수정
          }}
          isCardDataLoading={isLoading}
          imageUrls={[]} // TODO: DB에서 받아올 수 있을 때 imageUrls로 수정
          handleButtonClick={() => navigateStoryOrJoinTeam(userRole)}
          handleDeleteButtonClick={() => deleteSocial(userRole)}
        />
      </div>
    </div>
  );
};

export default SocialOverView;

'use client';

import DetailCard from '@/components/common/Card/DetailCard';
import useJoinTeam from '@/hooks/api/teams/useJoinTeam';
import { TeamUserRole } from '@/types/teamUserRole';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import Image from 'next/image';
import { SocialOverViewProps } from '@/app/social/detail/[socialId]/type';
import extractUserImages from '@/utils/extractUserImages';
import useGetSocialDetail from '@/hooks/api/teams/useGetSocialDetail';
import useGetSocialParticipants from '@/hooks/api/teams/useGetSocialParticipants';

const TEST_USER_ROLE = 'GUEST'; // DB로부터 받아올 예정

const SocialOverView = ({ currentSocialId }: SocialOverViewProps) => {
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
  const isFetchDataLoading =
    socialDetailDataIsLoading || socialTeamsParticipantsDataIsLoading;
  const { mutate: joinTeam } = useJoinTeam({
    socialId: currentSocialId,
  });
  const imagesUrls = extractUserImages(socialTeamsParticipantsData);

  const navigateStoryOrJoinTeam = (userRole: TeamUserRole) => {
    if (userRole === 'GUEST') {
      joinTeam();
    }
  };

  if (isFetchDataLoading || !socialDetailData) return null;

  const storyGenre = convertLocationToGenre({
    location: socialDetailData.location,
  });
  return (
    <div className="flex h-83 w-full flex-col justify-center gap-5 sm:flex-row">
      <Image
        src={socialDetailData?.image}
        alt=""
        width={596}
        height={332}
        className="h-55 w-full rounded-3xl border-2 border-gray-200 object-cover sm:h-83 sm:w-1/2 xl:w-149"
      />
      <div className="h-full w-full sm:w-1/2 xl:w-[29.375rem]">
        <DetailCard
          teamUserRole={TEST_USER_ROLE}
          textContent={{
            title: socialDetailData.name,
            genre: storyGenre ?? null,
            participantCount: socialDetailData.participantCount,
            capacity: socialDetailData.capacity,
          }}
          duration={{
            startDate: socialDetailData.registrationEnd,
            endDate: socialDetailData.dateTime,
          }}
          isCardDataLoading={isFetchDataLoading}
          imageUrls={imagesUrls}
          handleButtonClick={() => navigateStoryOrJoinTeam(TEST_USER_ROLE)}
        />
      </div>
    </div>
  );
};

export default SocialOverView;

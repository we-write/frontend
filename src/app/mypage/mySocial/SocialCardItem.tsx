import { cancelJoinSocial, leaveJoinSocial } from '@/api/mypage/api';
import { SocialListCardsProps } from '@/app/mypage/mySocial/type';
import ListCard from '@/components/common/Card/ListCard';
import { SOCIAL_ACTION_MESSAGES } from '@/constants/messages';
import useCollaboratorList from '@/hooks/mypage/useCollaboratorList';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import { useRouter } from 'next/navigation';

const SocialCardItem = ({
  item,
  activeTab,
  refetch,
}: {
  item: SocialListCardsProps['list'][0];
  activeTab: string;
  refetch: () => void;
}) => {
  const router = useRouter();
  const nowDate = new Date().toISOString();
  const isStoryCompleted = (registrationEndDate: string) =>
    registrationEndDate < nowDate;
  const { data: collaborator } = useCollaboratorList(item.id);
  const collaboratorCount = collaborator?.length || 0;

  const handleQuitSocial = async (id: string) => {
    const isJoined = activeTab === 'joined';

    const messages = {
      confirm: isJoined
        ? SOCIAL_ACTION_MESSAGES.confirm.exit
        : SOCIAL_ACTION_MESSAGES.confirm.delete,
      success: isJoined
        ? SOCIAL_ACTION_MESSAGES.success.exit
        : SOCIAL_ACTION_MESSAGES.success.delete,
    };
    const action = isJoined ? leaveJoinSocial : cancelJoinSocial;

    try {
      const confirmed = window.confirm(messages.confirm);
      if (!confirmed) return;

      await action({ id });
      alert(messages.success);
      refetch();
    } catch (error) {
      console.error(error);
      throw new Error('모임 취소 실패');
    }
  };

  const handleCardButtonClick = ({
    id,
    registrationEnd,
  }: {
    id: string;
    registrationEnd: string;
  }) => {
    if (isStoryCompleted(registrationEnd)) {
      router.push(`/social/detail/${id}`);
    }
    handleQuitSocial(id);
  };

  return (
    <div key={`${activeTab}-${item.id}`} className="truncate py-6">
      <ListCard
        teamUserRole={activeTab === 'created' ? 'LEADER' : 'MEMBER'}
        pageId={item.id}
        image={{
          src:
            item.image ||
            'https://inabooth.io/_next/image?url=https%3A%2F%2Fd19bi7owzxc0m2.cloudfront.net%2Fprod%2Fcharacter_files%2FRwH7fLwSHwA4_e2s354f2.webp&w=3840&q=75',
          alt: item.name || '섬네일 이미지',
        }}
        chip
        textContent={{
          title: item.name || '제목 없음',
          genre:
            convertLocationToGenre({ location: item.location }) || '장르 없음',
          participantCount: collaboratorCount ?? 0,
          capacity: item.capacity || 0,
        }}
        endDate={item.registrationEnd}
        isCardDataLoading={false}
        isCompletedStory={isStoryCompleted(item.registrationEnd)}
        isCanceled={false}
        handleButtonClick={() => {
          handleCardButtonClick({
            id: item.id,
            registrationEnd: item.registrationEnd,
          });
        }}
      />
    </div>
  );
};

export default SocialCardItem;

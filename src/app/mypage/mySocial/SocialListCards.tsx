'use client';

import { cancelJoinSocial, leaveJoinSocial } from '@/api/mypage/api';
import { convertLocationToGenre } from '@/utils/convertLocationToGenre';
import { SocialListCardsProps } from '@/app/mypage/mySocial/type';
import ListCard from '@/components/common/Card/ListCard';
import { useRouter } from 'next/navigation';

const SocialListCards = ({
  list,
  activeTab,
  refetch,
}: SocialListCardsProps) => {
  const router = useRouter();
  const nowDate = new Date().toISOString();
  const isStoryCompleted = (registrationEndDate: string) =>
    registrationEndDate < nowDate;

  const handleQuitSocial = async (id: string) => {
    const isJoined = activeTab === 'joined';

    const messages = {
      confirm: isJoined
        ? '정말 모임을 나가시겠습니까?'
        : '정말 모임을 삭제 하시겠습니까?',
      success: isJoined
        ? '모임 나가기가 완료되었습니다.'
        : '모임 삭제가 완료되었습니다.',
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

  return (
    <>
      {list.map((item) => {
        return (
          <div key={`${activeTab}-${item.id}`} className="truncate py-6">
            <ListCard
              teamUserRole={activeTab === 'created' ? 'LEADER' : 'MEMBER'}
              pageId={item.id || ''}
              image={{
                src: item.image || '',
                alt: item.name || '섬네일 이미지',
              }}
              chip
              textContent={{
                title: item.name || '',
                genre:
                  convertLocationToGenre({ location: item.location }) ||
                  '장르 없음',
                participantCount: item.participantCount || 0,
                capacity: item.capacity || 0,
              }}
              endDate={item.registrationEnd || ''}
              isCardDataLoading={false}
              isCompletedStory={isStoryCompleted(item.registrationEnd)}
              isCanceled={false}
              handleButtonClick={() => {
                if (isStoryCompleted(item.registrationEnd)) {
                  router.push(`/social/detail/${item.id}`);
                }
                handleQuitSocial(item.id);
              }}
            />
          </div>
        );
      })}
    </>
  );
};

export default SocialListCards;

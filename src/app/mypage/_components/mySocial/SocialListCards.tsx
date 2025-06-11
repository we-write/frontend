import { cancelJoinSocial, leaveJoinSocial } from '@/api/mypage/api';
import { convertLocationToGenre } from '@/utils/convertLocationToGenre';
import ListCard from '@/components/common/Card/ListCard';
import { SocialListCardsProps } from './type';

const SocialListCards = ({
  list,
  activeTab,
  refetch,
}: SocialListCardsProps) => {
  const handleQuitSocial = async (id: string) => {
    try {
      if (activeTab === 'joined') {
        await leaveJoinSocial({ id }).then(() => {
          alert('모임 취소 완료!');
        });
      } else {
        await cancelJoinSocial({ id }).then(() => {
          alert('모임 삭제 완료!');
        });
      }
      refetch();
    } catch {
      throw new Error('모임 취소 실패');
    }
  };
  return (
    <>
      {list.map((item) => (
        <div key={`${activeTab}-${item.id}`} className="truncate py-6">
          <ListCard
            teamUserRole={activeTab === 'created' ? 'LEADER' : 'MEMBER'}
            pageId={item.id || ''}
            image={{ src: item.image || '', alt: item.name || '섬네일 이미지' }}
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
            isCompletedStory={false}
            isCanceled={false}
            handleButtonClick={() => {
              handleQuitSocial(item.id);
            }}
          />
        </div>
      ))}
    </>
  );
};

export default SocialListCards;

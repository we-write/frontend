import {
  deleteCollaboratorFromSocial,
  leaveJoinSocial,
} from '@/api/mypage/api';
import { MySocialListItemProps } from './type';
import ListCard from '@/components/common/Card/ListCard';
import useCollaboratorList from '@/hooks/api/mypage/useCollaboratorList';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import { useRouter } from 'next/navigation';
import getSocialActionMessage from '@/utils/getSocialActionMessage';
import { useStoryIdBySocialId } from '@/hooks/api/supabase/useStoryIdBySocialId';
import { LocationType } from '@/api/social/type';
import { APP_ROUTES } from '@/constants/appRoutes';

const MySocialListCardItemGeneral = ({
  item,
  activeTab,
  refetch,
}: MySocialListItemProps) => {
  const router = useRouter();
  const nowDate = new Date().toISOString();
  const { data: collaborator } = useCollaboratorList(Number(item.id));
  const collaboratorCount = collaborator?.length || 0;
  const { myInfo } = useAuth();
  const userId = myInfo?.id;
  const isJoined = activeTab === 'joined';

  const { data: storyId, isLoading: isStoryLoading } = useStoryIdBySocialId(
    item.id
  );

  const handleMySocial = async (id: number) => {
    if (!storyId) return;

    try {
      const messages = {
        confirm: getSocialActionMessage('모임').confirm('exit'),
        success: getSocialActionMessage('모임').success('exit'),
      };

      if (isJoined) {
        const confirmed = window.confirm(messages.confirm);
        if (!confirmed) return;
        await leaveJoinSocial({ id });
        if (userId) {
          await deleteCollaboratorFromSocial(userId, storyId);
          alert(messages.success);
          refetch();
        }
      } else {
        router.push(`${APP_ROUTES.socialDetail}/${storyId}/?page=0`);
      }
    } catch (error) {
      console.error(error);
      alert('모임 취소에 실패했습니다.');
    }
  };

  return (
    <div className="truncate py-6">
      <ListCard
        teamUserRole={activeTab === 'created' ? 'LEADER' : 'MEMBER'}
        pageId={storyId?.toString() || undefined}
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
            convertLocationToGenre({
              location: item.location as LocationType,
            }) || '장르 없음',
          participantCount: collaboratorCount,
          capacity: item.capacity || 0,
        }}
        endDate={item.registrationEnd}
        isCardDataLoading={!storyId || isStoryLoading}
        isCompletedStory={isJoined ? item.registrationEnd < nowDate : true}
        isCanceled={false}
        handleButtonClick={() => handleMySocial(item.id)}
      />
    </div>
  );
};

export default MySocialListCardItemGeneral;

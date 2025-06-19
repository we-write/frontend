'use client';

import {
  deleteCollaboratorFromSocial,
  getStoryBySocialId,
  leaveJoinSocial,
} from '@/api/mypage/api';
import { MySocialListItemProps } from './type';
import ListCard from '@/components/common/Card/ListCard';
import useCollaboratorList from '@/hooks/api/mypage/useCollaboratorList';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import convertLocationToGenre from '@/utils/convertLocationToGenre';
import { useRouter } from 'next/navigation';
import getSocialActionMessage from '@/utils/getSocialActionMessage';
import { useEffect, useState } from 'react';

const MySocialListCardItem = ({
  item,
  activeTab,
  refetch,
}: MySocialListItemProps) => {
  const router = useRouter();
  const nowDate = new Date().toISOString();
  const [storyId, setStoryId] = useState();

  const { data: collaborator } = useCollaboratorList(item.id);
  const collaboratorCount = collaborator?.length || 0;

  const { myInfo } = useAuth();
  const userId = myInfo?.id;
  const isJoined = activeTab === 'joined';

  useEffect(() => {
    const fetchStoryId = async () => {
      try {
        const id = await getStoryBySocialId(item.id);
        setStoryId(id);
      } catch (error) {
        console.error('Failed to fetch storyId:', error);
      }
    };
    fetchStoryId();
  }, [item.id]);

  const handleButtonClick = async (id: string) => {
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
        router.push(`/library/detail/${storyId}/?page=0`);
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
        pageId={String(storyId)}
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
          participantCount: collaboratorCount,
          capacity: item.capacity || 0,
        }}
        endDate={item.registrationEnd}
        isCardDataLoading={!storyId}
        isCompletedStory={isJoined ? item.registrationEnd < nowDate : true}
        isCanceled={false}
        handleButtonClick={() => handleButtonClick(item.id)}
      />
    </div>
  );
};

export default MySocialListCardItem;

'use client';

import { deleteCollaboratorFromSocial } from '@/api/mypage/api';
import {
  LikedStoryResponse,
  MySocialListCardItemProps,
  MySocialResponse,
} from './type';
import ListCard from '@/components/common/Card/ListCard';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import { useRouter } from 'next/navigation';
import getSocialActionMessage from '@/utils/getSocialActionMessage';
import { APP_ROUTES } from '@/constants/appRoutes';
import { Heart } from 'lucide-react';
import useLikeStory from '@/hooks/api/library/useLikeStory';
import toast from '@/utils/toast';

const MySocialListCardItem = ({
  item,
  activeTab,
  refetch,
}: MySocialListCardItemProps) => {
  const router = useRouter();
  const { myInfo } = useAuth();

  const userId = myInfo?.id;
  const isJoinedTab = activeTab === 'joined';
  const isLikedTab = activeTab === 'liked';

  const { handleLikeStory, isLiked, isPending } = useLikeStory({
    story_id: item.story_id,
    user_id: myInfo?.id as number,
  });

  const handleClickLike = () => {
    if (isPending) return;
    handleLikeStory();
  };

  const handleMySocial = async (storyId: string) => {
    try {
      const messages = {
        confirm: getSocialActionMessage('모임').confirm('exit'),
        success: getSocialActionMessage('모임').success('exit'),
      };

      if (isJoinedTab) {
        const confirmed = window.confirm(messages.confirm);
        if (!confirmed) return;
        if (userId) {
          await deleteCollaboratorFromSocial(userId, storyId);
          toast.success(messages.success);
          refetch();
        }
      } else {
        router.push(`${APP_ROUTES.libraryDetail}/${storyId}/?page=0`);
      }
    } catch (error) {
      console.error(error);
      alert('모임 취소에 실패했습니다.');
    }
  };

  return (
    <div className="flex items-center justify-between truncate py-6">
      <ListCard
        teamUserRole={(item as MySocialResponse).role}
        pageId={item.story_id}
        image={{
          src: item.cover_image_url,
          alt: item.title || '섬네일 이미지',
        }}
        chip
        textContent={{
          title: item.title || '제목 없음',
          genre: item.genre,
          participantCount: item.collaborator_count,
          capacity: item.capacity,
        }}
        endDate={
          isLikedTab
            ? (item as LikedStoryResponse).liked_at
            : (item as MySocialResponse).joined_at
        }
        endDateTitle={isLikedTab ? '좋아요한 날짜' : '참여한 날짜'}
        isCardDataLoading={false}
        isCompletedStory={
          (item as MySocialResponse).role === 'LEADER' || isLikedTab
        }
        isCanceled={false}
        handleButtonClick={() => handleMySocial(item.story_id)}
      />
      {isLikedTab && (
        <button
          type="button"
          onClick={handleClickLike}
          aria-label={`${isLiked}`}
        >
          <Heart
            className="text-write-main h-6 w-6"
            fill={isLiked ? 'currentColor' : 'none'}
          />
        </button>
      )}
    </div>
  );
};

export default MySocialListCardItem;

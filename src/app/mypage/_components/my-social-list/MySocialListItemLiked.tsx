import { useRouter } from 'next/navigation';
import ListCard from '@/components/common/Card/ListCard';
import { MySocialListCardItemLikedProps } from '@/app/mypage/_components/my-social-list/type';
import useCollaboratorList from '@/hooks/api/mypage/useCollaboratorList';
import { Heart } from 'lucide-react';
import useLikeStory from '@/hooks/api/library/useLikeStory';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';
import toast from '@/utils/toast';
import { APP_ROUTES } from '@/constants/appRoutes';

const MySocialListCardItemLiked = ({
  item,
}: MySocialListCardItemLikedProps) => {
  const { isSignIn, myInfo } = useAuth();
  const router = useRouter();
  const { data: collaborator } = useCollaboratorList(Number(item.social_id));
  const collaboratorCount = collaborator?.length || 0;
  const { handleLikeStory, isLiked, isPending } = useLikeStory({
    story_id: item.story_id as string,
    user_id: myInfo?.id as number,
  });
  const handleClickLike = () => {
    if (isPending) return;
    handleLikeStory();
    if (!isSignIn) {
      toast({
        message:
          '로그인이 필요합니다. 로그인 페이지로 이동합니다.',
        type: 'error',
        duration: 5,
      });
      router.push('/signin');
    }
  };
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <ListCard
          teamUserRole="MEMBER"
          pageId={item.story_id}
          image={{
            src: item.cover_image_url,
            alt: item.title,
          }}
          chip
          textContent={{
            title: item.title || '제목 없음',
            genre: item.genre || '장르 없음',
            participantCount: collaboratorCount,
            capacity: item.capacity || null,
          }}
          endDate={''}
          isCardDataLoading={false}
          isCompletedStory={true}
          isCanceled={false}
          handleButtonClick={() =>
            router.push(`${APP_ROUTES.libraryDetail}/${item.story_id}/?page=0`)
          }
        />
        <button
          type="button"
          onClick={handleClickLike}
          aria-label={`${isLiked}`}
        >
          <Heart
            className="text-write-main h-6 w-6"
            fill={!!isLiked ? 'currentColor' : 'none'}
          />
        </button>
      </div>
    </div>
  );
};

export default MySocialListCardItemLiked;

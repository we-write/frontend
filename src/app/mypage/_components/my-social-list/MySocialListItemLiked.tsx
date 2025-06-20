'use client';

import { useRouter } from 'next/navigation';
import ListCard from '@/components/common/Card/ListCard';
import { MySocialListCardItemLikedProps } from '@/app/mypage/_components/my-social-list/type';
import useCollaboratorList from '@/hooks/api/mypage/useCollaboratorList';

const MySocialListCardItemLiked = ({
  item,
}: MySocialListCardItemLikedProps) => {
  const router = useRouter();
  const { data: collaborator } = useCollaboratorList(Number(item.social_id));
  const collaboratorCount = collaborator?.length || 0;
  return (
    <div className="truncate py-6">
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
          capacity: item.capacity || 0,
        }}
        endDate={''}
        isCardDataLoading={false}
        isCompletedStory={true}
        isCanceled={false}
        handleButtonClick={() =>
          router.push(`/library/detail/${item.story_id}/?page=0`)
        }
      />
    </div>
  );
};

export default MySocialListCardItemLiked;

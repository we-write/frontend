'use client';
import { ChevronLeft, Heart } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';

import useLikeStory from '@/hooks/api/library/useLikeStory';

const SideButtonGroup = () => {
  const router = useRouter();
  const { myInfo } = useAuth();
  const { id } = useParams();
  const { handleLikeStory, isLiked, likeCount } = useLikeStory(
    id as string,
    myInfo?.id as number
  );

  return (
    <div className="flex flex-row md:top-20 md:left-40 md:flex-col md:gap-4">
      <button
        aria-label="뒤로가기"
        className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-write-main h-6 w-6" aria-hidden />
      </button>

      <button
        className="flex-center md:border-write-main h-10 w-10 flex-col rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={() => handleLikeStory()}
      >
        <Heart
          className="text-write-main h-6 w-6"
          aria-hidden
          fill={!!isLiked ? 'currentColor' : 'none'}
        />
        <span className="text-write-main h-3 text-xs">{likeCount}</span>
      </button>
    </div>
  );
};
export default SideButtonGroup;

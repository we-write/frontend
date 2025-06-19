'use client';
import { ChevronLeft, Heart } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider/AuthProvider.client';

import useLikeStory from '@/hooks/api/library/useLikeStory';

import useBoolean from '@/hooks/useBoolean';

import ModalToSigin from './ModalToSigin';
const SideButtonGroup = () => {
  const router = useRouter();
  const { isSignIn, myInfo } = useAuth();
  const { id } = useParams();
  const { value: isModalOpen, setTrue, setFalse } = useBoolean();
  const { handleLikeStory, isLiked, likeCount } = useLikeStory({
    story_id: id as string,
    user_id: myInfo?.id as number,
  });
  const handleClickLike = () => {
    if (isSignIn) {
      handleLikeStory();
    } else {
      setTrue();
    }
  };
  return (
    <div className="flex flex-row md:flex-col md:gap-4">
      {isModalOpen && (
        <ModalToSigin isModalOpen={isModalOpen} setFalse={setFalse} />
      )}
      <button
        aria-label="뒤로가기"
        className="flex-center md:border-write-main h-10 w-10 rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={() => router.back()}
      >
        <ChevronLeft className="text-write-main h-8 w-8" aria-hidden />
      </button>

      <button
        aria-label="좋아요"
        aria-pressed={isLiked}
        className="flex-center md:border-write-main h-10 w-10 flex-col rounded-full border-0 bg-white md:h-12 md:w-12 md:border"
        onClick={handleClickLike}
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

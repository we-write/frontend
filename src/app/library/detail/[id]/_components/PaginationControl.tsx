'use client';

import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { PaginationControlProps } from '../type';
import { useRouter } from 'next/navigation';

const TITLE_MAX_LENGTH = 30;

export const PaginationControl = ({
  storyId,
  title,
  page,
  totalPage,
}: PaginationControlProps) => {
  const router = useRouter();
  const changeNextPage = () => {
    router.push(`/library/detail/${storyId}?page=${page + 1}`);
  };

  const changePrevPage = () => {
    router.push(`/library/detail/${storyId}?page=${page - 1}`);
  };

  return (
    <nav
      className="fixed bottom-5 flex flex-col items-center justify-center gap-1.5 md:gap-4"
      aria-label="페이지 이동 네비게이션"
    >
      <span
        className={`font-semibold text-gray-600 ${title.length > TITLE_MAX_LENGTH && 'max-w-xs truncate'}`}
      >
        {title}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => changePrevPage()}
          disabled={page < 1}
          className="p-3"
          aria-label="이전 페이지로 이동"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <span className="text-sm text-gray-400">
          {page} / {totalPage}
        </span>
        <button
          onClick={() => changeNextPage()}
          disabled={page === totalPage}
          className="p-3"
          aria-label="다음 페이지로 이동"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
};

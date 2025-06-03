import { ChevronLeft } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
interface PaginationControlProps {
  title: string;
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
}
export const PaginationControl = ({
  title,
  page,
  totalPage,
  setPage,
}: PaginationControlProps) => {
  return (
    <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4">
      <div>{title}</div>
      <div className="flex items-center gap-4">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm text-gray-400">
          {page} / {totalPage}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

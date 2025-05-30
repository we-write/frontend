'use client';
import Link from 'next/link';
import { GridCardProps } from '@/components/common/Card/type';
import Image from 'next/image';
import useImageLoadStatus from '@/hooks/useImageLoadStatus';

const GridCard = ({
  pageId,
  tag,
  image,
  textContent,
  isCardDataLoading,
}: GridCardProps) => {
  const { isImageLoaded, isImageLoadError, onLoad, onError } =
    useImageLoadStatus();

  return (
    <article className="h-80 w-90 rounded-2xl p-2 hover:bg-gray-100">
      <Link
        href={`/details/${pageId}`}
        className="flex h-full flex-col"
        aria-label={`${textContent.title ? `${textContent.title}상세 페이지로 이동` : '데이터를 불러오는 중입니다'}`}
      >
        <figure className="relative h-48">
          {tag && <div className="absolute top-1 right-2 z-10">{tag}</div>}
          {!isImageLoaded || isImageLoadError || isCardDataLoading ? (
            <div className="absolute h-full w-full animate-pulse rounded-xl bg-gray-300" />
          ) : null}
          {image.src && image.alt && !isCardDataLoading && (
            <Image
              src={image.src}
              alt={image.alt ? image.alt : '이미지를 불러올 수 없습니다'}
              onLoad={onLoad}
              onError={onError}
              fill
              className={`rounded-xl object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </figure>
        <div className="mt-2 px-2 py-1">
          <div className="mb-1 flex w-78 items-center gap-2.5">
            {!isCardDataLoading ? (
              <h2 className="truncate text-xl font-semibold">
                {textContent.title}
              </h2>
            ) : (
              <div className="h-6 w-40 animate-pulse rounded bg-gray-300" />
            )}
            <div className="h-5 border border-r-1" />
            {!isCardDataLoading ? (
              <p className="whitespace-nowrap">{textContent.genre}</p>
            ) : (
              <div className="h-5 w-15 animate-pulse rounded bg-gray-300" />
            )}
          </div>
          {!isCardDataLoading ? (
            <p className="line-clamp-3 text-sm text-gray-600">
              {textContent.description}
            </p>
          ) : (
            <div className="animate-pulse space-y-1">
              <div className="h-3.5 w-full rounded bg-gray-300" />
              <div className="h-3.5 w-5/6 rounded bg-gray-300" />
              <div className="h-3.5 w-2/3 rounded bg-gray-300" />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default GridCard;

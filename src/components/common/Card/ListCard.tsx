import {
  ListCardProps,
  GetListCardButtonLabelParams,
} from '@/components/common/Card/type';
import useImageLoadStatus from '@/hooks/useImageLoadStatus';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import { format } from 'date-fns';
import { Person } from '@public/assets/icons';

const ListCard = ({
  pageId,
  image,
  chip,
  textContent,
  endDate,
  isCardDataLoading,
  isCompletedStory,
  isCanceled,
  handleButtonClick,
}: ListCardProps) => {
  const listCardButtonStyle = `h-auto w-auto self-start px-4 py-2.5 text-sm font-semibold ${!isCompletedStory ? 'border-write-error text-write-error border bg-white' : 'comp-primary'}`; // button 컴포넌트 h-11 삭제 후에 h-auto 삭제
  const { isImageLoaded, isImageLoadError, onLoad, onError } =
    useImageLoadStatus();

  const getListCardButtonLabel = ({
    isCompletedStory,
  }: GetListCardButtonLabelParams): string => {
    if (isCompletedStory === true) {
      return '스토리 보러가기';
    }
    return '모임 탈퇴하기';
  };

  return (
    <article className="relative flex w-full flex-col gap-4 rounded-3xl p-2 sm:flex-row">
      {isCanceled && (
        <div className="flex-center absolute inset-0 z-10 rounded-3xl bg-black opacity-80">
          <p className="text-sm font-medium text-white">삭제된 스토리입니다.</p>
        </div>
      )}
      <figure className="relative h-48 w-full sm:h-39 sm:w-70">
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
            className={`rounded-3xl object-cover ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            unoptimized // next/image의 이미지 도메인 등록 문제 해결 후 삭제
          />
        )}
      </figure>
      <div className="flex w-full flex-col gap-3 px-1.5 sm:p-0">
        {!isCardDataLoading && chip ? (
          <div>{chip}</div>
        ) : (
          <div className="h-6 w-32 animate-pulse rounded bg-gray-300" />
        )}
        <div className="flex flex-row items-center gap-2">
          {!isCardDataLoading ? (
            <Link
              href={`/details/${pageId}`}
              className="flex h-full max-w-66 flex-col sm:max-w-180"
              aria-label={`${textContent.title ? `${textContent.title}상세 페이지로 이동` : '데이터를 불러오는 중입니다'}`}
            >
              <h2 className="truncate text-xl font-semibold text-gray-900 hover:underline">
                {textContent.title}
              </h2>
            </Link>
          ) : (
            <div className="h-7 w-44 animate-pulse rounded bg-gray-300" />
          )}
          <div className="h-4.5 border border-r-1 border-gray-900" />
          {!isCardDataLoading ? (
            <p className="text-sm font-semibold whitespace-nowrap text-gray-700">
              {textContent.genre}
            </p>
          ) : (
            <div className="h-5 w-15 animate-pulse rounded bg-gray-300" />
          )}
        </div>
        <div className="mb-1.5 flex flex-row items-center gap-3 text-sm text-gray-700">
          {!isCardDataLoading ? (
            <>
              {endDate && <p>종료 : {format(endDate, 'yyyy-MM-dd')}</p>}
              <div className="flex items-center gap-0.5">
                <Person className="h-4 w-4 text-gray-300" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-700">
                  {textContent.participantCount}/{textContent.capacity}
                </p>
              </div>
            </>
          ) : (
            <div className="flex animate-pulse space-x-3">
              <div className="h-5 w-36 rounded bg-gray-300" />
              <div className="h-5 w-12 rounded bg-gray-300" />
            </div>
          )}
        </div>
        <Button
          type="button"
          onClick={handleButtonClick}
          isDisabled={isCardDataLoading}
          color="custom"
          size="custom"
          className={listCardButtonStyle}
        >
          {isCardDataLoading
            ? '정보를 불러오는 중입니다'
            : getListCardButtonLabel({
                isCompletedStory: isCompletedStory,
              })}
        </Button>
      </div>
    </article>
  );
};

export default ListCard;

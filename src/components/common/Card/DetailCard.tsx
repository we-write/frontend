import {
  DetailCardProps,
  GetDetailCardButtonLabelParams,
} from '@/components/common/Card/type';
import { format } from 'date-fns';
import Button from '@/components/common/Button/Button';
import AvatarGroup from '@/components/common/AvatarGroup/AvatarGroup';
import { TrashCan } from '@public/assets/icons';

const DetailCard = ({
  teamUserRole,
  textContent,
  duration,
  isCardDataLoading,
  imageUrls,
  handleButtonClick,
  handleDeleteButtonClick,
}: DetailCardProps) => {
  const startDate = duration.startDate ? new Date(duration.startDate) : null;
  const endDate = duration.endDate ? new Date(duration.endDate) : null;
  const isButtonActivate =
    teamUserRole === 'GUEST'
      ? textContent.capacity !== null &&
        textContent.participantCount !== null &&
        textContent.capacity > textContent.participantCount
      : teamUserRole === 'MEMBER' || teamUserRole === 'LEADER';

  const getParticipationButtonLabel = ({
    paramTeamUserRole,
    paramIsButtonActivate,
    participantCount,
    capacity,
  }: GetDetailCardButtonLabelParams): string => {
    if (paramTeamUserRole === 'LEADER' || paramTeamUserRole === 'MEMBER') {
      return '스토리 이어쓰기';
    }

    if (paramTeamUserRole === 'GUEST' && paramIsButtonActivate) {
      return '참여하기';
    }

    if (!participantCount || !capacity) {
      return '지금은 참여할 수 없습니다';
    }

    if (participantCount >= capacity) {
      return '인원이 모두 찼습니다';
    }

    return '지금은 참여할 수 없습니다';
  };

  return (
    <div className="flex h-full w-full flex-col rounded-3xl border-2 border-gray-200 px-6 py-5 sm:px-8 sm:py-6">
      {!isCardDataLoading ? (
        <div className="flex flex-col gap-1.5 sm:gap-3">
          <h1 className="line-clamp-2 w-full text-2xl font-semibold sm:line-clamp-none sm:max-w-[500px] sm:truncate">
            {textContent.title}
          </h1>
          <p className="text-sm text-gray-700">{textContent.genre}</p>
          {startDate && endDate ? (
            <p className="text-sm">
              {format(startDate, 'yyyy.MM.dd')}~{format(endDate, 'yyyy.MM.dd')}
            </p>
          ) : (
            <div className="h-5" />
          )}
        </div>
      ) : (
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-5/6 rounded bg-gray-300 sm:w-1/3" />
          <div className="h-3.5 w-1/4 rounded bg-gray-300 sm:w-1/12" />
          <div className="h-3.5 w-7/8 rounded bg-gray-300 sm:w-1/2" />
        </div>
      )}
      <div className="mt-8 mb-3 flex items-center gap-3 sm:mt-21 sm:mb-7">
        {!isCardDataLoading ? (
          <>
            <p className="text-sm font-semibold whitespace-nowrap">
              {textContent.capacity ? (
                <>
                  모집 정원
                  <span className="ml-1.5">{textContent.capacity}</span>명
                </>
              ) : (
                <span className="text-gray-500">
                  모집 인원 정보를 불러오지 못했습니다
                </span>
              )}
            </p>
            {textContent.capacity && <AvatarGroup imageUrls={imageUrls} />}
          </>
        ) : (
          <div className="flex w-full animate-pulse items-center gap-3">
            <div className="h-5 w-1/3 rounded bg-gray-300 sm:w-1/6" />
            <div className="h-7 w-1/2 rounded bg-gray-300 sm:w-1/4" />
          </div>
        )}
      </div>
      <div className="flex w-full gap-3">
        <Button
          type="button"
          isDisabled={!isButtonActivate}
          onClick={() => handleButtonClick(teamUserRole)}
          className={`flex-1 font-semibold ${!isButtonActivate && 'cursor-not-allowed'}`}
        >
          {isCardDataLoading
            ? '정보를 불러오는 중입니다.'
            : getParticipationButtonLabel({
                paramTeamUserRole: teamUserRole,
                paramIsButtonActivate: isButtonActivate,
                participantCount: textContent.participantCount,
                capacity: textContent.capacity,
              })}
        </Button>
        {teamUserRole === 'LEADER' && (
          <Button
            type="button"
            color="custom"
            aria-label="모임 삭제"
            isDisabled={!isButtonActivate}
            onClick={handleDeleteButtonClick}
            className="basis-16 bg-gray-200 font-semibold sm:basis-25"
          >
            {!isCardDataLoading && (
              <TrashCan
                aria-hidden="true"
                className="text-write-error h-5 w-5 sm:h-6 sm:w-6"
                fill="currentColor"
              />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DetailCard;

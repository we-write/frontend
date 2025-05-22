import {
  DetailCardProps,
  getParticipationButtonLabelParams,
} from '@/components/common/Card/type';
import { format } from 'date-fns';
import Button from '@/components/common/Button/Button';

const DetailCard = ({
  teamUserRole,
  textContent,
  duration,
  isCardDataLoading,
  buttonClickEvent,
}: DetailCardProps) => {
  const startDate = duration.startDate ? new Date(duration.startDate) : null;
  const endDate = duration.endDate ? new Date(duration.endDate) : null;
  const isButtonActivate =
    textContent.capacity !== null && textContent.participantCount !== null
      ? textContent.capacity > textContent.participantCount
      : false;

  const getParticipationButtonLabel = ({
    paramTeamUserRole,
    paramIsButtonActivate,
    participantCount,
    capacity,
  }: getParticipationButtonLabelParams): string => {
    if (paramTeamUserRole === 'LEADER' || paramTeamUserRole === 'MEMBER') {
      return '스토리 이어쓰기';
    }

    if (paramTeamUserRole === 'GUEST' && paramIsButtonActivate) {
      return '참여하기';
    }

    if (participantCount && capacity) {
      if (participantCount >= capacity) {
        return '인원이 모두 찼습니다';
      } else {
        return '지금은 참여할 수 없습니다';
      }
    } else {
      return '지금은 참여할 수 없습니다';
    }
  };

  return (
    <div className="flex w-full flex-col gap-1.5 rounded-3xl border-2 border-gray-200 px-6 py-5 sm:gap-3 sm:px-8 sm:py-6">
      {!isCardDataLoading ? (
        <>
          <h1 className="line-clamp-2 w-full text-2xl font-semibold sm:line-clamp-none sm:max-w-[500px] sm:truncate">
            {textContent.title}
          </h1>
          <p className="text-sm text-gray-700">{textContent.genre}</p>
          {startDate && endDate && (
            <p className="text-sm">
              {format(startDate, 'yyyy.MM.dd')}~{format(endDate, 'yyyy.MM.dd')}
            </p>
          )}
        </>
      ) : (
        <div className="animate-pulse space-y-3">
          <div className="h-6 w-5/6 rounded bg-gray-300 sm:w-1/3" />
          <div className="h-3.5 w-1/4 rounded bg-gray-300 sm:w-1/12" />
          <div className="h-3.5 w-7/8 rounded bg-gray-300 sm:w-1/2" />
        </div>
      )}
      <div className="mt-8 mb-3 sm:mt-24 sm:mb-7">
        {!isCardDataLoading ? (
          <p className="text-sm font-semibold">
            {textContent.capacity ? (
              <>
                모집 정원
                <span className="ml-1.5">{textContent.capacity}</span>명
              </>
            ) : (
              '모집 인원 정보를 불러오지 못했습니다'
            )}
          </p>
        ) : (
          <div className="flex animate-pulse items-center gap-3">
            <div className="h-5 w-1/3 rounded bg-gray-300 sm:w-1/6" />
            <div className="h-7 w-1/2 rounded bg-gray-300 sm:w-1/4" />
          </div>
        )}
      </div>
      <Button
        type="button"
        isDisabled={!isButtonActivate}
        onClick={buttonClickEvent}
        className="font-semibold"
      >
        {getParticipationButtonLabel({
          paramTeamUserRole: teamUserRole,
          paramIsButtonActivate: isButtonActivate,
          participantCount: textContent.participantCount,
          capacity: textContent.capacity,
        })}
      </Button>
    </div>
  );
};

export default DetailCard;

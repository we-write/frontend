import { DetailCardProps } from '@/components/common/Card/type';
import { format } from 'date-fns';
import Button from '@/components/common/Button/Button';
import useParticipationButton from '@/components/common/Card/hooks/useParticipationButton';

const DetailCard = ({
  teamUserRole,
  textContent,
  duration,
  isCardDataLoading,
  buttonClickEvent,
}: DetailCardProps) => {
  const startDate = duration.startDate ? new Date(duration.startDate) : null;
  const endDate = duration.endDate ? new Date(duration.endDate) : null;
  const { isButtonActivate, participationButtonLabel } = useParticipationButton(
    { teamUserRole, textContent }
  );

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
            모집 정원<span className="ml-1.5">{textContent.capacity}</span>명
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
        {participationButtonLabel}
      </Button>
    </div>
  );
};

export default DetailCard;

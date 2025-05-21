import { TeamUserRole } from '@/types/teamUserRole';
import { DetailCardtextContentProps } from '@/components/common/Card/type';

interface UseParticipationButtonParams {
  teamUserRole: TeamUserRole;
  textContent: DetailCardtextContentProps;
}

const useParticipationButton = ({
  teamUserRole,
  textContent,
}: UseParticipationButtonParams) => {
  const capacity = textContent.capacity;
  const participantCount = textContent.participantCount;
  const isButtonActivate =
    capacity !== null && participantCount !== null
      ? capacity > participantCount
      : false;

  const getParticipationButtonLabel = (): string => {
    if (teamUserRole === 'LEADER' || teamUserRole === 'MEMBER') {
      return '스토리 이어쓰기';
    }

    if (teamUserRole === 'GUEST' && isButtonActivate) {
      return '참여하기';
    }

    if (textContent.participantCount && textContent.capacity) {
      if (textContent.participantCount >= textContent.capacity) {
        return '인원이 모두 찼습니다';
      } else {
        return '지금은 참여할 수 없습니다';
      }
    } else {
      return '지금은 참여할 수 없습니다';
    }
  };

  return {
    isButtonActivate,
    participationButtonLabel: getParticipationButtonLabel(),
  };
};

export default useParticipationButton;

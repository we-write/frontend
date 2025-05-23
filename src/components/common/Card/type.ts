import { ReactNode } from 'react';
import { TeamUserRole } from '@/types/teamUserRole';
import { AvatarGroupProps } from '@/components/common/AvatarGroup/type';

interface BaseTextContentProps {
  title: string | null;
  genre: string | null;
}

interface GridCardtextContentProps extends BaseTextContentProps {
  description: string | null;
}

export interface DetailCardtextContentProps extends BaseTextContentProps {
  participantCount: number | null;
  capacity: number | null;
}

interface ImageProps {
  src: string | null;
  alt: string | null;
}

interface durationProps {
  startDate: string | null;
  endDate: string | null;
}

export interface GridCardProps {
  pageId: string | null;
  tag?: ReactNode;
  image: ImageProps;
  textContent: GridCardtextContentProps;
  isCardDataLoading: boolean;
}

export interface DetailCardProps {
  teamUserRole: TeamUserRole;
  textContent: DetailCardtextContentProps;
  duration: durationProps;
  isCardDataLoading: boolean;
  imageUrls: AvatarGroupProps['imageUrls'];
  handleButtonClick: () => void;
}

export interface getParticipationButtonLabelParams {
  paramTeamUserRole: TeamUserRole;
  paramIsButtonActivate: boolean;
  participantCount: number | null;
  capacity: number | null;
}

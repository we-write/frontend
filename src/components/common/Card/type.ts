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

export interface TextContentWithParticipantsProps extends BaseTextContentProps {
  participantCount: number | null;
  capacity: number | null;
}

type DetailCardTextContentProps = TextContentWithParticipantsProps;

type ListCardTextContentProps = TextContentWithParticipantsProps;

interface ImageProps {
  src: string | null;
  alt: string | null;
}

interface DurationProps {
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
  textContent: DetailCardTextContentProps;
  duration: DurationProps;
  isCardDataLoading: boolean;
  imageUrls: AvatarGroupProps['imageUrls'];
  handleButtonClick: (userRole: TeamUserRole) => void;
  handleDeleteButtonClick?: () => void;
}

export interface ListCardProps {
  pageId: string | null;
  teamUserRole: TeamUserRole;
  image: ImageProps;
  chip: ReactNode;
  textContent: ListCardTextContentProps;
  endDate: string | null;
  isCardDataLoading: boolean;
  isCompletedStory: boolean;
  isCanceled: boolean;
  handleButtonClick: () => void;
}

export interface GetDetailCardButtonLabelParams {
  paramTeamUserRole: TeamUserRole;
  paramIsButtonActivate: boolean;
  participantCount: number | null;
  capacity: number | null;
}

export interface GetListCardButtonLabelParams {
  isCompletedStory: boolean;
}
